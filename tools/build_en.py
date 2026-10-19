"""Génère la version anglaise (public/en/) à partir des pages françaises.

Usage :  python3 tools/build_en.py
- Traduit les textes visibles et les attributs (placeholder, aria-label, title, alt, meta)
  à l'aide des dictionnaires tools/en.json et tools/en-verifier.json.
- Adapte les chemins, la langue, les liens canoniques et le sélecteur FR/EN.
- Signale toute chaîne française non traduite (le build échoue si --strict).
"""
import json, re, sys
from pathlib import Path
from bs4 import BeautifulSoup, Comment

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
SITE = "https://ecogeneration.netlify.app"
ATTRS = ["placeholder", "aria-label", "title", "alt"]
META = {"description", "og:title", "og:description", "twitter:title", "twitter:description", "og:image:alt"}
FRENCH = re.compile(r"[éèêàùçôîœ]|\b(le|la|les|des|du|une|et|pour|vous|votre|nous|ton|ta|tes)\b", re.I)


def translate(html, d, missing):
    soup = BeautifulSoup(html, "html.parser")

    def tr(text):
        core = " ".join(text.split())
        if not core:
            return text
        if core in d:
            lead = text[: len(text) - len(text.lstrip())]
            trail = text[len(text.rstrip()):]
            return lead + d[core] + trail
        if any(c.isalpha() for c in core) and FRENCH.search(core):
            missing.add(core)
        return text

    for node in soup.find_all(string=True):
        if isinstance(node, Comment) or node.parent.name in ("script", "style"):
            continue
        new = tr(str(node))
        if new != str(node):
            node.replace_with(new)
    for tag in soup.find_all(True):
        for a in ATTRS:
            if tag.get(a):
                tag[a] = tr(tag[a])
        if tag.name == "meta" and (tag.get("name") in META or tag.get("property") in META):
            tag["content"] = tr(tag["content"])
    return str(soup)


def fix(html, pairs):
    for a, b in pairs:
        if a not in html:
            raise SystemExit(f"Remplacement introuvable : {a[:70]!r}")
        html = html.replace(a, b)
    return html


COMMON = [
    ('<html lang="fr">', '<html lang="en">'),
]


def build_index(missing):
    d = json.loads((ROOT / "tools/en.json").read_text(encoding="utf-8"))
    html = (PUB / "index.html").read_text(encoding="utf-8")
    html = fix(html, COMMON + [
        ('<link rel="canonical" href="https://ecogeneration.netlify.app/">', f'<link rel="canonical" href="{SITE}/en/">'),
        (f'<meta property="og:url" content="{SITE}/">', f'<meta property="og:url" content="{SITE}/en/">'),
        ('<meta property="og:locale" content="fr_FR">', '<meta property="og:locale" content="en_GB">'),
        ('src="assets/', 'src="/assets/'),
        ('href="assets/', 'href="/assets/'),
        ('href="site.webmanifest"', 'href="/site.webmanifest"'),
        ('/assets/content.fr.js', '/assets/content.en.js'),
        ('<a href="/en/" class="lang-switch" hreflang="en" lang="en" aria-label="English version">EN</a>',
         '<a href="/" class="lang-switch" hreflang="fr" lang="fr" aria-label="Version française">FR</a>'),
        ('<a href="/en/" hreflang="en" style="color:inherit">English</a>',
         '<a href="/" hreflang="fr" lang="fr" style="color:inherit">Français</a>'),
        ('href="verifier.html"', 'href="/en/verifier.html"'),
        ('href="parcours.html', 'href="/en/parcours.html'),
        ('href="mentions-legales.html', 'href="/mentions-legales.html'),
        ('100&nbsp;%', '100%'),
        ("?text=Bonjour%20Root%20Solution%2C%20je%20souhaite%20convenir%20d%27un%20rendez-vous.",
         "?text=Hello%20Root%20Solution%2C%20I%20would%20like%20to%20arrange%20a%20meeting."),
        ("?subject=Rendez-vous%20Root%20Solution", "?subject=Meeting%20%E2%80%94%20Root%20Solution"),
        ('/assets/modules.fr.js', '/assets/modules.en.js'),
    ])
    out = translate(html, d, missing)
    (PUB / "en").mkdir(exist_ok=True)
    (PUB / "en/index.html").write_text(out, encoding="utf-8")


def build_verifier(missing):
    d = json.loads((ROOT / "tools/en-verifier.json").read_text(encoding="utf-8"))
    html = (PUB / "verifier.html").read_text(encoding="utf-8")
    html = fix(html, COMMON + [
        (f'<link rel="canonical" href="{SITE}/verifier.html">', f'<link rel="canonical" href="{SITE}/en/verifier.html">'),
        ('<a class="top" href="/">', '<a class="top" href="/en/">'),
        ('href="/parcours.html"', 'href="/en/parcours.html"'),
        ('<a href="/en/verifier.html" hreflang="en" lang="en">English</a>', '<a href="/verifier.html" hreflang="fr" lang="fr">Français</a>'),
    ])
    out = translate(html, d, missing)
    (PUB / "en/verifier.html").write_text(out, encoding="utf-8")


def build_parcours():
    html = (PUB / "parcours.html").read_text(encoding="utf-8")
    html = fix(html, COMMON + [
        ("<title>Parcours 17 ODD — Root Solution</title>", "<title>17 SDGs Pathway — Root Solution</title>"),
        ('content="Parcours certifiant gratuit sur les 17 Objectifs de développement durable : 17 modules par ODD, 3 cours par module, des mentors illustrés et des attestations vérifiables en français et en anglais."',
         'content="Free certified pathway on the 17 Sustainable Development Goals: 17 modules per SDG, 3 courses per module, illustrated mentors and verifiable certificates in French and English."'),
        (f'<link rel="canonical" href="{SITE}/parcours.html">', f'<link rel="canonical" href="{SITE}/en/parcours.html">'),
        ('<meta property="og:title" content="Parcours 17 ODD — Root Solution">', '<meta property="og:title" content="17 SDGs Pathway — Root Solution">'),
        ('content="17 modules par ODD, 3 cours par module, des attestations vérifiables en français et en anglais."',
         'content="17 modules per SDG, 3 courses per module, verifiable certificates in French and English."'),
        ('<a class="brand" href="/">', '<a class="brand" href="/en/">'),
        ('<a href="/#formations" class="hide-s">Formations</a><a href="/verifier.html">Vérifier</a><a href="/en/parcours.html" hreflang="en" lang="en">EN</a>',
         '<a href="/en/#formations" class="hide-s">Courses</a><a href="/en/verifier.html">Verify</a><a href="/parcours.html" hreflang="fr" lang="fr">FR</a>'),
        ('<p class="eyebrow" id="t-eyebrow">Parcours certifiant</p>', '<p class="eyebrow" id="t-eyebrow">Certified pathway</p>'),
        ('<h1 id="t-h1">17 ODD · 17 modules par ODD · 3 cours par module</h1>', '<h1 id="t-h1">17 SDGs · 17 modules per SDG · 3 courses per module</h1>'),
        ("JavaScript est nécessaire pour suivre les cours.", "JavaScript is required to take the courses."),
    ])
    (PUB / "en/parcours.html").write_text(html, encoding="utf-8")


if __name__ == "__main__":
    missing = set()
    build_index(missing)
    build_verifier(missing)
    build_parcours()
    if missing:
        print("Chaînes non traduites :")
        for m in sorted(missing):
            print("  -", m)
        if "--strict" in sys.argv:
            sys.exit(1)
    print("OK : public/en/index.html, verifier.html et parcours.html générés.")

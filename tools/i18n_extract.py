"""Liste les textes visibles (et attributs traduisibles) d'une page HTML, hors <script>/<style>."""
import sys, json
from bs4 import BeautifulSoup, NavigableString, Comment
ATTRS = ["placeholder", "aria-label", "title", "alt"]
META = {"description", "og:title", "og:description", "twitter:title", "twitter:description", "og:image:alt"}

def strings(html):
    soup = BeautifulSoup(html, "html.parser")
    out = []
    for node in soup.find_all(string=True):
        if isinstance(node, Comment) or node.parent.name in ("script", "style"):
            continue
        t = " ".join(node.split())
        if t and any(c.isalpha() for c in t):
            out.append(t)
    for tag in soup.find_all(True):
        for a in ATTRS:
            if tag.get(a) and any(c.isalpha() for c in tag[a]):
                out.append(" ".join(tag[a].split()))
        if tag.name == "meta" and (tag.get("name") in META or tag.get("property") in META):
            out.append(" ".join(tag["content"].split()))
        if tag.name == "title":
            pass
    seen, uniq = set(), []
    for t in out:
        if t not in seen:
            seen.add(t); uniq.append(t)
    return uniq

if __name__ == "__main__":
    print(json.dumps(strings(open(sys.argv[1], encoding="utf-8").read()), ensure_ascii=False, indent=0))

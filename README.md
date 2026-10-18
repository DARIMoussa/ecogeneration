# ÉcoGénération

Plateforme d'éducation au développement durable — **17 ODD, leadership et climat** — pour l'Afrique subsaharienne, de la maternelle à la recherche. Site bilingue français / anglais.
**Site :** https://ecogeneration.netlify.app

## Fonctionnalités

- **Explorateur niveau + ODD** : chaque visiteur choisit son niveau d'études (7 niveaux) et l'un des 17 ODD, et reçoit une explication, un défi adapté à son âge et une piste de leadership
- Jeu interactif pour les tout-petits, études de cas pour les niveaux supérieurs
- Modules en ligne (17 ODD, Leadership pour le développement durable) avec **attestations vérifiables** (QR code + page `/verifier.html`)
- Bibliothèque de ressources et appels à candidatures (ODD, leadership, climat)
- Formulaires (rendez-vous, missions, enseignants, newsletter) via Netlify Forms

## Architecture

```
public/                 Site statique (HTML/CSS/JS sans framework)
  index.html            Page française (source)
  en/                   Version anglaise GÉNÉRÉE — ne pas modifier à la main
  assets/content.fr.js  Contenus pédagogiques et textes d'interface (FR)
  assets/content.en.js  Idem en anglais (mêmes clés, même ordre des réponses)
tools/build_en.py       Génère public/en/ à partir des pages françaises + tools/en*.json
netlify/functions/      API serverless (Netlify Functions)
  attestation.mjs       POST /api/attestation — corrige le test côté serveur, délivre l'attestation
  verify.mjs            GET  /api/verify?id=  — vérifie une attestation
  stats.mjs             GET  /api/stats       — nombre d'attestations (sans données personnelles)
netlify/lib/core.mjs    Logique métier pure (validation, correction, identifiants)
tests/                  Tests unitaires et d'intégration (stockage simulé)
```

Stockage : **Netlify Blobs** (stores `attestations` et `ratelimit`).

## Sécurité

- **Correction côté serveur** : les bonnes réponses ne sont jamais envoyées au navigateur ni versionnées dans le dépôt ; elles sont dans la variable d'environnement secrète `QUIZ_ANSWERS`.
- **Validation stricte** des entrées (liste blanche des modules, `Object.hasOwn` contre la pollution de prototype, regex Unicode pour les noms, taille de requête limitée).
- **Contrôle d'origine** sur l'API d'écriture.
- **Limitation anti-abus** : 20 tentatives/heure par client, indexées par une empreinte SHA-256 horaire (l'IP n'est pas stockée), purge automatique.
- **Échappement** de toutes les données affichées (anti-XSS).
- **En-têtes HTTP** (`public/_headers`) : CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy.
- **Minimisation des données** : seuls nom, module, score et date sont conservés ; voir `public/mentions-legales.html`.

## Configuration

Dans Netlify → *Project configuration* → *Environment variables*, créer `QUIZ_ANSWERS` (portée : Functions) :

```json
{"odd":[...], "leadership":[...]}
```

(index 0-based de la bonne option pour chaque question, dans l'ordre du quiz)

## Traduction (FR → EN)

1. Modifier la page française `public/index.html` (ou `verifier.html`).
2. Ajouter les nouvelles phrases et leur traduction dans `tools/en.json` (ou `tools/en-verifier.json`).
3. Lancer `pip install beautifulsoup4 && npm run build:en` — le script échoue s'il reste du français non traduit.
4. Les textes dynamiques (explorateur ODD, modules, quiz, attestation) se modifient dans `public/assets/content.fr.js` **et** `content.en.js`.

## Tests

```bash
npm install
npm test
```

## Auteur

Moussa DARI — fondateur d'ÉcoGénération · Abomey-Calavi, Bénin

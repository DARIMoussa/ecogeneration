# ÉcoGénération

Plateforme d'éducation climatique pour l'Afrique subsaharienne, du primaire à l'université.
**Site :** https://ecogeneration.netlify.app

## Fonctionnalités

- Parcours d'apprentissage de la maternelle à la recherche (jeu interactif, études de cas)
- Modules en ligne (17 ODD, Leadership climatique) avec **attestations vérifiables** (QR code + page `/verifier.html`)
- Bibliothèque de ressources et appels à candidatures climat
- Formulaires (rendez-vous, missions, enseignants, newsletter) via Netlify Forms

## Architecture

```
public/                 Site statique (HTML/CSS/JS sans framework)
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

## Tests

```bash
npm install
npm test
```

## Auteur

Moussa DARI — fondateur d'ÉcoGénération · Abomey-Calavi, Bénin

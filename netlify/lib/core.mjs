// Logique métier pure (sans dépendance Netlify) : testable en local avec `npm test`.
import { randomBytes } from "node:crypto";

// Les barèmes (bonnes réponses) ne sont PAS dans le code : ils viennent de la variable
// d'environnement secrète QUIZ_ANSWERS, définie dans Netlify (Project configuration →
// Environment variables). Format JSON : {"odd":[...],"leadership":[...],"odd1":[...],…,"odd17":[...]} (index 0-based de la bonne option)
// Le dépôt peut ainsi être public sans révéler les réponses.
export const TITLES = {
  odd: { fr: "Introduction aux 17 ODD", en: "Introduction to the 17 SDGs" },
  leadership: { fr: "Leadership pour le développement durable", en: "Leadership for Sustainable Development" },
  odd1: { fr: "ODD 1 — Pas de pauvreté", en: "SDG 1 — No Poverty" },
  odd2: { fr: "ODD 2 — Faim « zéro »", en: "SDG 2 — Zero Hunger" },
  odd3: { fr: "ODD 3 — Bonne santé et bien-être", en: "SDG 3 — Good Health and Well-being" },
  odd4: { fr: "ODD 4 — Éducation de qualité", en: "SDG 4 — Quality Education" },
  odd5: { fr: "ODD 5 — Égalité entre les sexes", en: "SDG 5 — Gender Equality" },
  odd6: { fr: "ODD 6 — Eau propre et assainissement", en: "SDG 6 — Clean Water and Sanitation" },
  odd7: { fr: "ODD 7 — Énergie propre et d'un coût abordable", en: "SDG 7 — Affordable and Clean Energy" },
  odd8: { fr: "ODD 8 — Travail décent et croissance économique", en: "SDG 8 — Decent Work and Economic Growth" },
  odd9: { fr: "ODD 9 — Industrie, innovation et infrastructure", en: "SDG 9 — Industry, Innovation and Infrastructure" },
  odd10: { fr: "ODD 10 — Inégalités réduites", en: "SDG 10 — Reduced Inequalities" },
  odd11: { fr: "ODD 11 — Villes et communautés durables", en: "SDG 11 — Sustainable Cities and Communities" },
  odd12: { fr: "ODD 12 — Consommation et production responsables", en: "SDG 12 — Responsible Consumption and Production" },
  odd13: { fr: "ODD 13 — Mesures relatives à la lutte contre les changements climatiques", en: "SDG 13 — Climate Action" },
  odd14: { fr: "ODD 14 — Vie aquatique", en: "SDG 14 — Life Below Water" },
  odd15: { fr: "ODD 15 — Vie terrestre", en: "SDG 15 — Life on Land" },
  odd16: { fr: "ODD 16 — Paix, justice et institutions efficaces", en: "SDG 16 — Peace, Justice and Strong Institutions" },
  odd17: { fr: "ODD 17 — Partenariats pour la réalisation des objectifs", en: "SDG 17 — Partnerships for the Goals" },
};

export function loadModules(raw = globalThis.Netlify?.env?.get?.("QUIZ_ANSWERS") ?? process.env.QUIZ_ANSWERS) {
  let keys = {};
  try { keys = JSON.parse(raw || "{}"); } catch { keys = {}; }
  const out = {};
  for (const [id, title] of Object.entries(TITLES)) {
    const a = keys[id];
    if (Array.isArray(a) && a.length && a.every(Number.isInteger)) out[id] = { title: title.fr, titleEn: title.en, answers: a };
  }
  return out;
}
export const MODULES = loadModules();

export const PASS_RATIO = 0.8;
export const passMark = (total) => Math.ceil(total * PASS_RATIO);

// Lettres (toutes langues), espaces, apostrophes, traits d'union et points. 2 à 60 caractères.
const NAME_RE = /^[\p{L}][\p{L}\p{M} '’.\-]{1,59}$/u;

export function cleanName(raw) {
  if (typeof raw !== "string") return null;
  const name = raw.normalize("NFC").replace(/\s+/g, " ").trim();
  return NAME_RE.test(name) ? name : null;
}

export function validateSubmission(body) {
  if (!body || typeof body !== "object") return { error: "Requête invalide." };
  const mod = typeof body.module === "string" && Object.hasOwn(MODULES, body.module) ? MODULES[body.module] : null;
  if (!mod) return { error: "Module inconnu." };
  const name = cleanName(body.name);
  if (!name) return { error: "Nom invalide : utilisez uniquement des lettres, espaces, apostrophes ou traits d'union (2 à 60 caractères)." };
  const a = body.answers;
  if (!Array.isArray(a) || a.length !== mod.answers.length || !a.every((x) => Number.isInteger(x) && x >= -1 && x <= 9)) {
    return { error: "Réponses invalides." };
  }
  return { module: body.module, mod, name, answers: a };
}

export function grade(mod, answers) {
  const score = answers.reduce((n, x, i) => n + (x === mod.answers[i] ? 1 : 0), 0);
  const total = mod.answers.length;
  return { score, total, need: passMark(total), passed: score >= passMark(total) };
}

// Identifiant lisible, sans caractères ambigus (0/O, 1/I) : RS-XXXX-XXXX (Root Solution) (~40 bits d'aléa).
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
export function newId() {
  const b = randomBytes(8);
  let s = "";
  for (let i = 0; i < 8; i++) s += ALPHABET[b[i] % 32];
  return `RS-${s.slice(0, 4)}-${s.slice(4)}`;
}
export const ID_RE = /^RS-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/;

export const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra },
  });

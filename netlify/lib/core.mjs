// Logique métier pure (sans dépendance Netlify) : testable en local avec `npm test`.
import { randomBytes } from "node:crypto";

// Les barèmes (bonnes réponses) ne sont PAS dans le code : ils viennent de la variable
// d'environnement secrète QUIZ_ANSWERS, définie dans Netlify (Project configuration →
// Environment variables). Format JSON : {"odd":[i,i,...],"leadership":[i,...]} (index 0-based de la bonne option)
// Le dépôt peut ainsi être public sans révéler les réponses.
export const TITLES = {
  odd: { fr: "Les 17 Objectifs de développement durable", en: "The 17 Sustainable Development Goals" },
  leadership: { fr: "Leadership pour le développement durable", en: "Leadership for Sustainable Development" },
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

// Identifiant lisible, sans caractères ambigus (0/O, 1/I) : EG-XXXX-XXXX (~40 bits d'aléa).
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
export function newId() {
  const b = randomBytes(8);
  let s = "";
  for (let i = 0; i < 8; i++) s += ALPHABET[b[i] % 32];
  return `EG-${s.slice(0, 4)}-${s.slice(4)}`;
}
export const ID_RE = /^EG-[2-9A-HJ-NP-Z]{4}-[2-9A-HJ-NP-Z]{4}$/;

export const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra },
  });

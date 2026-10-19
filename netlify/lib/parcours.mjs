// Parcours 17 ODD × 17 modules × 3 cours de 5 questions (logique pure, testable).
//
// Barème : variable d'environnement secrète COURSE_KEYS = base64 de 867 octets
// (17 ODD × 17 modules × 3 cours). Octet du cours (n, m, c) à l'index ((n-1)*17 + (m-1))*3 + (c-1).
// Valeur v < 243 : les 5 bonnes réponses en base 3 (question i = chiffre de poids 3^i).
// Valeur 255 : cours pas encore publié.
import { createHash } from "node:crypto";
import { SDG_TITLES, MODULE_TITLES, COURSE_TITLES } from "./programme.mjs";
import { cleanName } from "./core.mjs";

export const N_SDG = 17, N_MOD = 17, N_COURSE = 3, N_Q = 5, COURSE_PASS = 4; // 4/5 = 80 %

export function loadKeys(raw = globalThis.Netlify?.env?.get?.("COURSE_KEYS") ?? process.env.COURSE_KEYS) {
  try {
    const b = Buffer.from(String(raw || "").trim(), "base64");
    return b.length === N_SDG * N_MOD * N_COURSE ? b : null;
  } catch { return null; }
}

const COURSE_RE = /^o([1-9]|1[0-7])m([1-9]|1[0-7])c([1-3])$/;
export function parseCourse(key) {
  const m = typeof key === "string" && COURSE_RE.exec(key);
  return m ? { n: +m[1], m: +m[2], c: +m[3] } : null;
}
const idx = (n, m, c) => ((n - 1) * N_MOD + (m - 1)) * N_COURSE + (c - 1);

export function answersFor(keys, n, m, c) {
  if (!keys) return null;
  let v = keys[idx(n, m, c)];
  if (v >= 243) return null;
  const a = [];
  for (let i = 0; i < N_Q; i++) { a.push(v % 3); v = Math.floor(v / 3); }
  return a;
}
export const moduleReady = (keys, n, m) => [1, 2, 3].every((c) => answersFor(keys, n, m, c));
export const sdgReady = (keys, n) => Array.from({ length: N_MOD }, (_, i) => i + 1).every((m) => moduleReady(keys, n, m));

// Jeton d'apprenant : 16 à 32 octets aléatoires en base64url, généré par le navigateur.
const TOKEN_RE = /^[A-Za-z0-9_-]{22,43}$/;
export const validToken = (k) => typeof k === "string" && TOKEN_RE.test(k);
export const progressKey = (k) => "p/" + createHash("sha256").update("rssfhe|" + k).digest("hex").slice(0, 40);

export function validateCourse(body, keys) {
  if (!body || typeof body !== "object") return { error: "Requête invalide." };
  const p = parseCourse(body.course);
  if (!p) return { error: "Cours inconnu." };
  const answers = answersFor(keys, p.n, p.m, p.c);
  if (!answers) return { error: "Ce cours n'est pas encore disponible." };
  if (!validToken(body.k)) return { error: "Code d'apprenant invalide." };
  const name = cleanName(body.name);
  if (!name) return { error: "Nom invalide : utilisez uniquement des lettres, espaces, apostrophes ou traits d'union (2 à 60 caractères)." };
  const a = body.answers;
  if (!Array.isArray(a) || a.length !== N_Q || !a.every((x) => Number.isInteger(x) && x >= -1 && x <= 2)) return { error: "Réponses invalides." };
  return { key: body.course, ...p, name, answers: a, key5: answers, k: body.k };
}

export function gradeCourse(key5, answers) {
  const score = answers.reduce((s, x, i) => s + (x === key5[i] ? 1 : 0), 0);
  return { score, total: N_Q, need: COURSE_PASS, passed: score >= COURSE_PASS };
}

// Titres complets (affichés sur la page de vérification).
export function titlesFor(kind, n, m, c) {
  const s = SDG_TITLES[n], mt = MODULE_TITLES[`o${n}m${m}`], ct = COURSE_TITLES[`o${n}m${m}c${c}`];
  if (kind === "course") return {
    title: `ODD ${n} · Module ${m} · Cours ${c} — ${ct?.fr ?? ""}`,
    titleEn: `SDG ${n} · Module ${m} · Course ${c} — ${ct?.en ?? ""}`,
  };
  if (kind === "module") return { title: `ODD ${n} · Module ${m} — ${mt.fr}`, titleEn: `SDG ${n} · Module ${m} — ${mt.en}` };
  return { title: `ODD ${n} — ${s.fr} (parcours complet : 17 modules)`, titleEn: `SDG ${n} — ${s.en} (full pathway: 17 modules)` };
}

export const emptyProgress = () => ({ v: 1, courses: {}, modules: {}, sdgs: {} });

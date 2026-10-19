// POST /api/cours — corrige un cours (5 questions) côté serveur.
// Réussite → attestation de cours ; les 3 cours d'un module → attestation de module (automatique) ;
// les 17 modules d'un ODD → attestation d'ODD (automatique). La progression est liée à un jeton
// aléatoire gardé par le navigateur (seule son empreinte SHA-256 est stockée).
import { getStore } from "@netlify/blobs";
import { newId, json } from "../lib/core.mjs";
import { tooMany, sameOrigin } from "../lib/ratelimit.mjs";
import { loadKeys, validateCourse, gradeCourse, progressKey, emptyProgress, titlesFor, moduleReady, sdgReady, N_MOD } from "../lib/parcours.mjs";

const MAX_PER_HOUR = 60;

async function issue(store, fields) {
  let id = newId();
  while (await store.get(id)) id = newId();
  const rec = { id, ...fields, issuedAt: new Date().toISOString() };
  await store.setJSON(id, rec);
  return rec;
}

export default async (req, context) => {
  if (req.method !== "POST") return json({ error: "Méthode non autorisée." }, 405, { allow: "POST" });
  if (!sameOrigin(req)) return json({ error: "Origine refusée." }, 403);
  const raw = await req.text();
  if (raw.length > 1500) return json({ error: "Requête trop volumineuse." }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: "JSON invalide." }, 400); }

  const keys = loadKeys();
  const v = validateCourse(body, keys);
  if (v.error) return json({ error: v.error }, 400);

  if (await tooMany(getStore({ name: "ratelimit", consistency: "strong" }), context.ip, MAX_PER_HOUR, "rc")) {
    return json({ error: "Trop de tentatives. Réessayez dans une heure." }, 429);
  }

  const g = gradeCourse(v.key5, v.answers);
  if (!g.passed) return json({ passed: false, score: g.score, total: g.total, need: g.need });

  const certs = getStore({ name: "attestations", consistency: "strong" });
  const progress = getStore({ name: "progress", consistency: "strong" });
  const pk = progressKey(v.k);
  const p = (await progress.get(pk, { type: "json" })) || emptyProgress();
  const issued = [];

  // Cours déjà réussi : on renvoie l'attestation existante (pas de doublon).
  let course = p.courses[v.key];
  if (!course) {
    course = await issue(certs, { kind: "course", module: v.key, n: v.n, m: v.m, c: v.c, name: v.name, score: g.score, total: g.total, ...titlesFor("course", v.n, v.m, v.c) });
    p.courses[v.key] = course;
    issued.push(course);
  }

  const mk = `o${v.n}m${v.m}`;
  if (!p.modules[mk] && moduleReady(keys, v.n, v.m) && [1, 2, 3].every((c) => p.courses[`${mk}c${c}`])) {
    const score = [1, 2, 3].reduce((s, c) => s + p.courses[`${mk}c${c}`].score, 0);
    p.modules[mk] = await issue(certs, { kind: "module", module: mk, n: v.n, m: v.m, name: v.name, score, total: 15, ...titlesFor("module", v.n, v.m) });
    issued.push(p.modules[mk]);
  }

  const sk = `o${v.n}`;
  const allMods = Array.from({ length: N_MOD }, (_, i) => `o${v.n}m${i + 1}`);
  if (!p.sdgs[sk] && sdgReady(keys, v.n) && allMods.every((k) => p.modules[k])) {
    const score = allMods.reduce((s, k) => s + p.modules[k].score, 0);
    p.sdgs[sk] = await issue(certs, { kind: "sdg", module: sk, n: v.n, name: v.name, score, total: N_MOD * 15, ...titlesFor("sdg", v.n) });
    issued.push(p.sdgs[sk]);
  }

  if (issued.length) await progress.setJSON(pk, p);
  return json({ passed: true, score: g.score, total: g.total, course, issued, progress: p }, issued.length ? 201 : 200);
};

export const config = { path: "/api/cours" };

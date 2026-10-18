// POST /api/attestation — corrige le test côté serveur et, en cas de réussite,
// enregistre une attestation vérifiable.
import { createHash } from "node:crypto";
import { getStore } from "@netlify/blobs";
import { validateSubmission, grade, newId, json } from "../lib/core.mjs";

const MAX_PER_HOUR = 20; // tentatives par adresse IP et par heure

// Limitation anti-abus : compteur par heure, indexé par une empreinte salée de l'IP
// (l'adresse IP elle-même n'est jamais stockée). Les compteurs des heures passées sont purgés.
async function tooMany(store, ip) {
  const hour = new Date().toISOString().slice(0, 13);
  const fp = createHash("sha256").update(`${hour}|${ip || "unknown"}`).digest("hex").slice(0, 24);
  const key = `rl/${hour}/${fp}`;
  const n = ((await store.get(key, { type: "json" })) || 0) + 1;
  await store.setJSON(key, n);
  if (Math.random() < 0.05) {
    const { blobs } = await store.list({ prefix: "rl/" });
    await Promise.all(blobs.filter((b) => !b.key.startsWith(`rl/${hour}/`)).map((b) => store.delete(b.key)));
  }
  return n > MAX_PER_HOUR;
}

export default async (req, context) => {
  if (req.method !== "POST") return json({ error: "Méthode non autorisée." }, 405, { allow: "POST" });

  const origin = req.headers.get("origin");
  if (origin) {
    let same = false;
    try { same = new URL(origin).host === new URL(req.url).host; } catch {}
    if (!same) return json({ error: "Origine refusée." }, 403);
  }

  const raw = await req.text();
  if (raw.length > 2000) return json({ error: "Requête trop volumineuse." }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: "JSON invalide." }, 400); }

  const v = validateSubmission(body);
  if (v.error) return json({ error: v.error }, 400);

  const limits = getStore({ name: "ratelimit", consistency: "strong" });
  if (await tooMany(limits, context.ip)) return json({ error: "Trop de tentatives. Réessayez dans une heure." }, 429);

  const result = grade(v.mod, v.answers);
  if (!result.passed) return json({ passed: false, score: result.score, total: result.total, need: result.need });

  const store = getStore({ name: "attestations", consistency: "strong" });
  let id = newId();
  while (await store.get(id)) id = newId();

  const record = {
    id,
    name: v.name,
    module: v.module,
    title: v.mod.title,
    score: result.score,
    total: result.total,
    issuedAt: new Date().toISOString(),
  };
  await store.setJSON(id, record);
  return json({ passed: true, ...record }, 201);
};

export const config = { path: "/api/attestation" };

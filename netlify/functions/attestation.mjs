// POST /api/attestation — corrige le test côté serveur et, en cas de réussite,
// enregistre une attestation vérifiable.
import { getStore } from "@netlify/blobs";
import { validateSubmission, grade, newId, json } from "../lib/core.mjs";
import { tooMany, sameOrigin } from "../lib/ratelimit.mjs";

const MAX_PER_HOUR = 20; // tentatives par adresse IP et par heure

export default async (req, context) => {
  if (req.method !== "POST") return json({ error: "Méthode non autorisée." }, 405, { allow: "POST" });

  if (!sameOrigin(req)) return json({ error: "Origine refusée." }, 403);

  const raw = await req.text();
  if (raw.length > 2000) return json({ error: "Requête trop volumineuse." }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: "JSON invalide." }, 400); }

  const v = validateSubmission(body);
  if (v.error) return json({ error: v.error }, 400);

  const limits = getStore({ name: "ratelimit", consistency: "strong" });
  if (await tooMany(limits, context.ip, MAX_PER_HOUR)) return json({ error: "Trop de tentatives. Réessayez dans une heure." }, 429);

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
    titleEn: v.mod.titleEn,
    score: result.score,
    total: result.total,
    issuedAt: new Date().toISOString(),
  };
  await store.setJSON(id, record);
  return json({ passed: true, ...record }, 201);
};

export const config = { path: "/api/attestation" };

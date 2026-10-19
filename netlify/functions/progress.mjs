// POST /api/progress {k} — renvoie la progression et les attestations liées à un code d'apprenant.
// (POST plutôt que GET : le code ne doit jamais apparaître dans une URL ni dans les journaux.)
import { getStore } from "@netlify/blobs";
import { json } from "../lib/core.mjs";
import { tooMany, sameOrigin } from "../lib/ratelimit.mjs";
import { validToken, progressKey, emptyProgress, loadKeys } from "../lib/parcours.mjs";

export default async (req, context) => {
  if (req.method !== "POST") return json({ error: "Méthode non autorisée." }, 405, { allow: "POST" });
  if (!sameOrigin(req)) return json({ error: "Origine refusée." }, 403);
  const raw = await req.text();
  if (raw.length > 300) return json({ error: "Requête trop volumineuse." }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: "JSON invalide." }, 400); }
  if (!validToken(body?.k)) return json({ error: "Code d'apprenant invalide." }, 400);
  if (await tooMany(getStore({ name: "ratelimit", consistency: "strong" }), context.ip, 120, "rp")) {
    return json({ error: "Trop de requêtes. Réessayez plus tard." }, 429);
  }
  const p = (await getStore({ name: "progress", consistency: "strong" }).get(progressKey(body.k), { type: "json" })) || emptyProgress();
  return json({ ...p, available: !!loadKeys() });
};

export const config = { path: "/api/progress" };

// GET /api/verify?id=EG-XXXX-XXXX — vérifie l'authenticité d'une attestation.
import { getStore } from "@netlify/blobs";
import { ID_RE, TITLES, json } from "../lib/core.mjs";

export default async (req) => {
  if (req.method !== "GET") return json({ error: "Méthode non autorisée." }, 405, { allow: "GET" });
  const id = (new URL(req.url).searchParams.get("id") || "").trim().toUpperCase();
  if (!ID_RE.test(id)) return json({ valid: false, error: "Format d'identifiant invalide." }, 400);

  const rec = await getStore({ name: "attestations", consistency: "strong" }).get(id, { type: "json" });
  if (!rec) return json({ valid: false }, 404);
  const { name, module, score, total, issuedAt } = rec;
  const t = TITLES[module] || { fr: rec.title, en: rec.title };
  return json({ valid: true, id, name, title: t.fr, titleEn: t.en, score, total, issuedAt });
};

export const config = { path: "/api/verify" };

// GET /api/stats — nombre d'attestations délivrées par module (aucune donnée personnelle).
import { getStore } from "@netlify/blobs";
import { MODULES, ID_RE, json } from "../lib/core.mjs";

export default async () => {
  const store = getStore({ name: "attestations", consistency: "strong" });
  const byModule = Object.fromEntries(Object.keys(MODULES).map((k) => [k, 0]));
  let total = 0;
  for await (const page of store.list({ paginate: true })) {
    for (const { key } of page.blobs) {
      if (!ID_RE.test(key)) continue;
      const rec = await store.get(key, { type: "json" });
      if (rec && rec.module in byModule) byModule[rec.module]++;
      total++;
    }
  }
  return json({ total, byModule }, 200, { "cache-control": "public, max-age=300" });
};

export const config = { path: "/api/stats" };

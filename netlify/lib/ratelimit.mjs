// Limitation anti-abus partagée : compteur par heure, indexé par une empreinte salée de l'IP
// (l'adresse IP elle-même n'est jamais stockée). Les compteurs des heures passées sont purgés.
import { createHash } from "node:crypto";

export async function tooMany(store, ip, max, scope = "rl") {
  const hour = new Date().toISOString().slice(0, 13);
  const fp = createHash("sha256").update(`${scope}|${hour}|${ip || "unknown"}`).digest("hex").slice(0, 24);
  const key = `${scope}/${hour}/${fp}`;
  const n = ((await store.get(key, { type: "json" })) || 0) + 1;
  await store.setJSON(key, n);
  if (Math.random() < 0.05) {
    const { blobs } = await store.list({ prefix: `${scope}/` });
    await Promise.all(blobs.filter((b) => !b.key.startsWith(`${scope}/${hour}/`)).map((b) => store.delete(b.key)));
  }
  return n > max;
}

// Même origine uniquement (les navigateurs envoient toujours Origin sur un POST fetch).
export function sameOrigin(req) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try { return new URL(origin).host === new URL(req.url).host; } catch { return false; }
}

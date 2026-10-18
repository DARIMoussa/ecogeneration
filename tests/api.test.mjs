// Barèmes FICTIFS pour les tests (les vrais sont uniquement dans Netlify).
process.env.QUIZ_ANSWERS = JSON.stringify({ odd: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], leadership: [2, 2, 2, 2, 2] });
// Tests d'intégration des fonctions avec un stockage Netlify Blobs simulé en mémoire.
import { test, mock } from "node:test";
import assert from "node:assert/strict";

const stores = new Map();
function memStore(name) {
  if (!stores.has(name)) stores.set(name, new Map());
  const m = stores.get(name);
  return {
    get: async (k, o) => (m.has(k) ? (o?.type === "json" ? JSON.parse(m.get(k)) : m.get(k)) : null),
    setJSON: async (k, v) => void m.set(k, JSON.stringify(v)),
    delete: async (k) => void m.delete(k),
    list: (o = {}) => {
      const blobs = [...m.keys()].filter((k) => !o.prefix || k.startsWith(o.prefix)).map((key) => ({ key }));
      if (o.paginate) return (async function* () { yield { blobs }; })();
      return Promise.resolve({ blobs });
    },
  };
}
mock.module("@netlify/blobs", { namedExports: { getStore: ({ name }) => memStore(name) } });

const { default: attest } = await import("../netlify/functions/attestation.mjs");
const { default: verify } = await import("../netlify/functions/verify.mjs");
const { default: stats } = await import("../netlify/functions/stats.mjs");
const URL0 = "https://ecogeneration.netlify.app";
const post = (body, headers = {}, ip = "1.2.3.4") =>
  attest(new Request(URL0 + "/api/attestation", { method: "POST", headers: { "content-type": "application/json", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) }), { ip });
const ODD = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

test("réussite → attestation enregistrée puis vérifiable", async () => {
  const r = await post({ module: "odd", name: "Awa KOFFI", answers: ODD });
  assert.equal(r.status, 201);
  const d = await r.json();
  assert.equal(d.passed, true);
  const v = await (await verify(new Request(URL0 + "/api/verify?id=" + d.id.toLowerCase()))).json();
  assert.deepEqual([v.valid, v.name, v.score], [true, "Awa KOFFI", 10]);
  assert.equal("answers" in v, false);
});

test("échec → rien n'est enregistré", async () => {
  const before = stores.get("attestations")?.size || 0;
  const d = await (await post({ module: "odd", name: "Awa", answers: [0, 0, 0, 2, 2, 2, 2, 2, 2, 2] })).json();
  assert.deepEqual([d.passed, d.score, d.need], [false, 7, 8]);
  assert.equal(stores.get("attestations").size, before);
});

test("requêtes malveillantes refusées", async () => {
  assert.equal((await post({}, { origin: "https://evil.example" })).status, 403);
  assert.equal((await post({}, { origin: "null" })).status, 403);
  assert.equal((await post("{not json")).status, 400);
  assert.equal((await post("x".repeat(3000))).status, 413);
  assert.equal((await post({ module: "__proto__", name: "Awa", answers: [] })).status, 400);
  assert.equal((await post({ module: "odd", name: "<script>", answers: ODD })).status, 400);
  assert.equal((await attest(new Request(URL0 + "/api/attestation"), {})).status, 405);
  assert.equal((await verify(new Request(URL0 + "/api/verify?id=../../etc"))).status, 400);
  assert.equal((await verify(new Request(URL0 + "/api/verify?id=EG-2222-2222"))).status, 404);
});

test("limitation : 20 tentatives par heure et par IP", async () => {
  let last;
  for (let i = 0; i < 21; i++) last = await post({ module: "leadership", name: "Test Limite", answers: [0, 0, 0, 0, 0] }, {}, "9.9.9.9");
  assert.equal(last.status, 429);
  assert.equal((await post({ module: "leadership", name: "Autre", answers: [0, 0, 0, 0, 0] }, {}, "8.8.8.8")).status, 200);
  const keys = [...stores.get("ratelimit").keys()].join(" ");
  assert.equal(keys.includes("9.9.9.9"), false, "l'IP ne doit pas être stockée en clair");
});

test("statistiques sans données personnelles", async () => {
  const d = await (await stats(new Request(URL0 + "/api/stats"))).json();
  assert.equal(d.total, 1);
  assert.equal(d.byModule.odd, 1);
  assert.equal(JSON.stringify(d).includes("Awa"), false);
});

// Tests du parcours (cours → module → ODD) avec un barème FICTIF et un stockage simulé.
const bytes = new Uint8Array(867).fill(255);
for (let c = 0; c < 3; c++) bytes[c] = 121;                 // ODD 1, module 1 : réponses [1,1,1,1,1]
for (let i = 51; i < 102; i++) bytes[i] = 242;              // ODD 2 entier : réponses [2,2,2,2,2]
process.env.COURSE_KEYS = Buffer.from(bytes).toString("base64");

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
    list: (o = {}) => Promise.resolve({ blobs: [...m.keys()].filter((k) => !o.prefix || k.startsWith(o.prefix)).map((key) => ({ key })) }),
  };
}
mock.module("@netlify/blobs", { namedExports: { getStore: ({ name }) => memStore(name) } });

const { default: cours } = await import("../netlify/functions/cours.mjs");
const { default: progress } = await import("../netlify/functions/progress.mjs");
const { default: verify } = await import("../netlify/functions/verify.mjs");
const { answersFor, loadKeys, parseCourse } = await import("../netlify/lib/parcours.mjs");
const U = "https://ecogeneration.netlify.app";
const K1 = "a".repeat(22), K2 = "B_-9".repeat(8);
let ipn = 0;
const post = (body, ip) => cours(new Request(U + "/api/cours", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }), { ip: ip || "9.9.9." + (ipn++ % 250) });
const prog = (k) => progress(new Request(U + "/api/progress", { method: "POST", body: JSON.stringify({ k }) }), { ip: "8.8.8.8" });

test("décodage du barème compacté", () => {
  const k = loadKeys();
  assert.deepEqual(answersFor(k, 1, 1, 2), [1, 1, 1, 1, 1]);
  assert.equal(answersFor(k, 1, 2, 1), null);
  assert.deepEqual(parseCourse("o17m17c3"), { n: 17, m: 17, c: 3 });
  for (const bad of ["o0m1c1", "o18m1c1", "o1m1c4", "o1m1c1 ", "__proto__"]) assert.equal(parseCourse(bad), null);
});

test("cours réussi → attestation ; 3 cours → attestation de module", async () => {
  const r1 = await (await post({ course: "o1m1c1", k: K1, name: "Awa KOFFI", answers: [1, 1, 1, 1, 0] })).json();
  assert.equal(r1.passed, true);
  assert.equal(r1.issued.length, 1);
  assert.equal(r1.course.kind, "course");
  const again = await (await post({ course: "o1m1c1", k: K1, name: "Awa KOFFI", answers: [1, 1, 1, 1, 1] })).json();
  assert.equal(again.course.id, r1.course.id, "pas de doublon");
  await post({ course: "o1m1c2", k: K1, name: "Awa KOFFI", answers: [1, 1, 1, 1, 1] });
  const r3 = await (await post({ course: "o1m1c3", k: K1, name: "Awa KOFFI", answers: [1, 1, 1, 1, 1] })).json();
  assert.deepEqual(r3.issued.map((x) => x.kind), ["course", "module"]);
  assert.equal(r3.issued[1].score, 14);
  const v = await (await verify(new Request(U + "/api/verify?id=" + r3.issued[1].id))).json();
  assert.equal(v.kind, "module");
  assert.match(v.titleEn, /^SDG 1 · Module 1 — /);
  const p = await (await prog(K1)).json();
  assert.equal(Object.keys(p.courses).length, 3);
  assert.equal(p.modules.o1m1.id, r3.issued[1].id);
  const other = await (await prog(K2)).json();
  assert.deepEqual(other.courses, {}, "un autre code ne voit rien");
});

test("échec et entrées invalides", async () => {
  const f = await (await post({ course: "o1m1c1", k: K2, name: "Awa", answers: [0, 0, 1, 1, 1] })).json();
  assert.deepEqual([f.passed, f.score, f.need], [false, 3, 4]);
  for (const b of [
    { course: "o1m2c1", k: K2, name: "Awa", answers: [1, 1, 1, 1, 1] },   // pas publié
    { course: "o1m1c1", k: "court", name: "Awa", answers: [1, 1, 1, 1, 1] },
    { course: "o1m1c1", k: K2, name: "<b>", answers: [1, 1, 1, 1, 1] },
    { course: "o1m1c1", k: K2, name: "Awa", answers: [1, 1, 1, 1] },
    { course: "o1m1c1", k: K2, name: "Awa", answers: [1, 1, 1, 1, 7] },
  ]) assert.equal((await post(b)).status, 400);
  const bad = await cours(new Request(U + "/api/cours", { method: "POST", headers: { origin: "https://evil.example" }, body: "{}" }), { ip: "1.1.1.1" });
  assert.equal(bad.status, 403);
});

test("17 modules réussis → attestation d'ODD", async () => {
  let last;
  for (let m = 1; m <= 17; m++) for (let c = 1; c <= 3; c++) {
    last = await (await post({ course: `o2m${m}c${c}`, k: K2, name: "Kossi DOSSOU", answers: [2, 2, 2, 2, 2] })).json();
  }
  assert.deepEqual(last.issued.map((x) => x.kind), ["course", "module", "sdg"]);
  assert.equal(last.issued[2].total, 255);
  assert.match(last.issued[2].title, /^ODD 2 — /);
});

test("limite anti-abus", async () => {
  let s = 0;
  for (let i = 0; i < 61; i++) s = (await post({ course: "o1m1c1", k: K2, name: "Awa", answers: [0, 0, 0, 0, 0] }, "7.7.7.7")).status;
  assert.equal(s, 429);
});

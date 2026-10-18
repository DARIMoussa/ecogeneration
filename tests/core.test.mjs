// Barèmes FICTIFS pour les tests (les vrais sont uniquement dans Netlify).
process.env.QUIZ_ANSWERS = JSON.stringify({ odd: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], leadership: [2, 2, 2, 2, 2] });
import { test } from "node:test";
import assert from "node:assert/strict";
const { MODULES, cleanName, validateSubmission, grade, newId, ID_RE, passMark, loadModules } = await import("../netlify/lib/core.mjs");

test("noms acceptés et refusés", () => {
  assert.equal(cleanName("  Awa   KOFFI "), "Awa KOFFI");
  assert.equal(cleanName("Jean-Éric N'Dri"), "Jean-Éric N'Dri");
  assert.equal(cleanName("<img src=x onerror=alert(1)>"), null);
  assert.equal(cleanName("A"), null);
  assert.equal(cleanName("x".repeat(61)), null);
  assert.equal(cleanName(42), null);
});

test("validation des soumissions", () => {
  assert.ok(validateSubmission({ module: "nope", name: "Awa", answers: [] }).error);
  assert.ok(validateSubmission({ module: "odd", name: "Awa", answers: [1] }).error);
  assert.ok(validateSubmission({ module: "odd", name: "Awa", answers: Array(10).fill("1") }).error);
  assert.ok(validateSubmission({ module: "__proto__", name: "Awa", answers: [] }).error);
  assert.equal(validateSubmission({ module: "odd", name: "Awa", answers: MODULES.odd.answers }).name, "Awa");
});

test("correction et seuil de 80 %", () => {
  assert.equal(passMark(10), 8);
  assert.equal(passMark(5), 4);
  const ok = grade(MODULES.odd, MODULES.odd.answers);
  assert.deepEqual([ok.score, ok.passed], [10, true]);
  const seven = MODULES.odd.answers.map((a, i) => (i < 3 ? (a + 1) % 3 : a));
  assert.equal(grade(MODULES.odd, seven).passed, false);
  assert.equal(grade(MODULES.leadership, [2, 2, 2, 2, 0]).passed, true);
});

test("format des identifiants", () => {
  for (let i = 0; i < 500; i++) assert.match(newId(), ID_RE);
});

test("barèmes absents ou invalides → aucun module disponible", () => {
  assert.deepEqual(loadModules(""), {});
  assert.deepEqual(loadModules("pas du json"), {});
  assert.deepEqual(Object.keys(loadModules('{"odd":[1,"x"]}')), []);
});

import assert from "node:assert";
import { sideOf } from "../side.js";
import { countCrossings } from "../cross.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("sideOf returns a boolean", () => {
  assert.strictEqual(typeof sideOf(5, 3), "boolean");
});

check("countCrossings returns states", () => {
  assert.ok(Array.isArray(countCrossings([1, 2], 3).states));
});

check("countCrossings returns numbers", () => {
  assert.strictEqual(typeof countCrossings([1, 2], 3).ups, "number");
});

check("render counts values", () => {
  assert.strictEqual(typeof render({ values: [1], threshold: 1 }).count, "number");
});

check("render exposes flat flag", () => {
  assert.strictEqual(typeof render({ values: [1], threshold: 1 }).flat, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);

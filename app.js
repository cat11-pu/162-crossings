// app.js：渲染结果
import { sideOf } from "./side.js";
import { countCrossings } from "./cross.js";

export function render(spec) {
  const values = spec.values || [];
  const threshold = spec.threshold || 0;
  const view = countCrossings(values, threshold);
  const states = view.states || [];
  return { states: states, ups: view.ups || 0, downs: view.downs || 0,
           threshold: threshold, count: values.length,
           flat: view.ups === 0 && view.downs === 0,
           biggest: values.length ? Math.max.apply(null, values) : 0 };
}

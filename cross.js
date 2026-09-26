// cross.js：一次扫描数穿越（每个值只判一次侧）
import { sideOf } from "./side.js";

export function countCrossings(values, threshold) {
  if (!Array.isArray(values) || values.length === 0) {
    const error = new Error("数值列表为空");
    error.code = "E_EMPTY_VALUES";
    throw error;
  }
  const states = new Array(values.length);
  let ups = 0;
  let downs = 0;
  states[0] = sideOf(values[0], threshold);
  for (let i = 1; i < values.length; i += 1) {
    states[i] = sideOf(values[i], threshold);
    if (states[i] && !states[i - 1]) {
      ups += 1;
    } else if (!states[i] && states[i - 1]) {
      downs += 1;
    }
  }
  return { states: states, ups: ups, downs: downs };
}

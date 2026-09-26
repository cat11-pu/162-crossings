// cross.js：数穿越（一次扫描，每个值只判一次侧）
import { sideOf } from "./side.js";

export function countCrossings(values, threshold) {
  if (!Array.isArray(values) || values.length === 0) {
    const error = new Error("values must be a non-empty array");
    error.code = "E_EMPTY_VALUES";
    throw error;
  }
  const states = new Array(values.length);
  let ups = 0;
  let downs = 0;
  states[0] = sideOf(values[0], threshold);
  for (let index = 1; index < values.length; index += 1) {
    const above = sideOf(values[index], threshold);
    states[index] = above;
    if (above && !states[index - 1]) ups += 1;
    else if (!above && states[index - 1]) downs += 1;
  }
  return { ups: ups, downs: downs, states: states };
}

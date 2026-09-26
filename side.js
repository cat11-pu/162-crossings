// side.js：判定侧（大等于阈值算上侧，小于算下侧）
export function sideOf(value, threshold) {
  return value >= threshold;
}

// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  let threshold = spec.threshold || 0;
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，阈值 " + threshold + "。";

  function draw() {
    let view = null;
    try {
      view = render(Object.assign({}, spec, { threshold: threshold }));
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.states.forEach(function (up, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 个 " + (spec.values || [])[spot];
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (up ? " ok" : "");
      mark.textContent = up ? "在阈值之上" : "在阈值之下";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "向上穿越 " + view.ups + " 次，向下穿越 " + view.downs + " 次";
    parts.log.textContent = "是否一直同一侧 " + view.flat;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "数穿越";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const moreButton = document.createElement("button");
  moreButton.textContent = "阈值加五";
  moreButton.addEventListener("click", function () {
    threshold = threshold + 5;
    draw();
  });
  parts.controls.appendChild(moreButton);

  const lessButton = document.createElement("button");
  lessButton.textContent = "阈值减五";
  lessButton.addEventListener("click", function () {
    threshold = threshold - 5;
    draw();
  });
  parts.controls.appendChild(lessButton);

  const label = document.createElement("label");
  label.textContent = "阈值";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = String(threshold);
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (!Number.isNaN(parsed)) { threshold = parsed; draw(); }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看穿越次数";
  readButton.addEventListener("click", function () {
    const view = render(Object.assign({}, spec, { threshold: threshold }));
    parts.out.textContent = "向上 " + view.ups + " 次，向下 " + view.downs + " 次";
  });
  parts.controls.appendChild(readButton);

  draw();
}

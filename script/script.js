const presets = {
  fadeIn: {
    desc: "Fade In",
    keyframes: `0%{opacity:0;}100%{opacity:1;}`,
  },
  fadeOut: {
    desc: "Fade Out",
    keyframes: `0%{opacity:1;}100%{opacity:0;}`,
  },
  zoomIn: {
    desc: "Zoom In",
    keyframes: `0%{transform:scale(0.3);opacity:0;}100%{transform:scale(1);opacity:1;}`,
  },
  zoomOut: {
    desc: "Zoom Out",
    keyframes: `0%{transform:scale(1);opacity:1;}100%{transform:scale(0.3);opacity:0;}`,
  },
  zoomInLeft: {
    desc: "Zoom In Left",
    keyframes: `0%{transform:scale(0.3) translateX(-1000px);opacity:0;}100%{transform:scale(1) translateX(0);opacity:1;}`,
  },
  zoomOutLeft: {
    desc: "Zoom Out Left",
    keyframes: `0%{transform:scale(1) translateX(0);opacity:1;}100%{transform:scale(0.3) translateX(-1000px);opacity:0;}`,
  },
  zoomInRight: {
    desc: "Zoom In Right",
    keyframes: `0%{transform:scale(0.3) translateX(1000px);opacity:0;}100%{transform:scale(1) translateX(0);opacity:1;}`,
  },
  zoomOutRight: {
    desc: "Zoom Out Right",
    keyframes: `0%{transform:scale(1) translateX(0);opacity:1;}100%{transform:scale(0.3) translateX(1000px);opacity:0;}`,
  },
  zoomInUp: {
    desc: "Zoom In Up",
    keyframes: `0%{transform:scale(0.3) translateY(1000px);opacity:0;}100%{transform:scale(1) translateY(0);opacity:1;}`,
  },
  zoomOutUp: {
    desc: "Zoom Out Up",
    keyframes: `0%{transform:scale(1) translateY(0);opacity:1;}100%{transform:scale(0.3) translateY(-1000px);opacity:0;}`,
  },
  zoomInDown: {
    desc: "Zoom In Down",
    keyframes: `0%{transform:scale(0.3) translateY(-1000px);opacity:0;}100%{transform:scale(1) translateY(0);opacity:1;}`,
  },
  zoomOutDown: {
    desc: "Zoom Out Down",
    keyframes: `0%{transform:scale(1) translateY(0);opacity:1;}100%{transform:scale(0.3) translateY(1000px);opacity:0;}`,
  },
  lightSpeedInLeft: {
    desc: "Light Speed In Left",
    keyframes: `0%{transform:translateX(-100%) skewX(30deg);opacity:0;}60%{transform:translateX(20%) skewX(-10deg);opacity:1;}80%{transform:translateX(0%) skewX(5deg);opacity:1;}100%{transform:none;opacity:1;}`,
  },
  lightSpeedInRight: {
    desc: "Light Speed In Right",
    keyframes: `0%{transform:translateX(100%) skewX(-30deg);opacity:0;}60%{transform:translateX(-20%) skewX(10deg);opacity:1;}80%{transform:translateX(0%) skewX(-5deg);opacity:1;}100%{transform:none;opacity:1;}`,
  },
  lightSpeedOutLeft: {
    desc: "Light Speed Out Left",
    keyframes: `0%{opacity:1;}100%{transform:translateX(-100%) skewX(-30deg);opacity:0;}`,
  },
  lightSpeedOutRight: {
    desc: "Light Speed Out Right",
    keyframes: `0%{opacity:1;}100%{transform:translateX(100%) skewX(30deg);opacity:0;}`,
  },
  flipInX: {
    desc: "Flip In X",
    keyframes: `0%{transform:perspective(400px) rotateX(90deg);opacity:0;}40%{transform:perspective(400px) rotateX(-10deg);opacity:1;}70%{transform:perspective(400px) rotateX(10deg);}100%{transform:perspective(400px) rotateX(0deg);}`,
  },
  flipOutX: {
    desc: "Flip Out X",
    keyframes: `0%{transform:perspective(400px) rotateX(0deg);opacity:1;}100%{transform:perspective(400px) rotateX(90deg);opacity:0;}`,
  },
  rotateInDownLeft: {
    desc: "Rotate In Down Left",
    keyframes: `0%{transform-origin:left bottom;transform:rotate(-90deg);opacity:0;}100%{transform-origin:left bottom;transform:rotate(0);opacity:1;}`,
  },
  rotateOutUpRight: {
    desc: "Rotate Out Up Right",
    keyframes: `0%{transform-origin:right bottom;transform:rotate(0);opacity:1;}100%{transform-origin:right bottom;transform:rotate(90deg);opacity:0;}`,
  },
};

const presetsEl = document.getElementById("presets");
Object.keys(presets).forEach((k, i) => {
  const b = document.createElement("button");
  b.className = "preset-btn";
  b.textContent = presets[k].desc;
  b.dataset.key = k;
  if (i === 0) b.classList.add("active");
  presetsEl.appendChild(b);
});

presetsEl.addEventListener("click", (e) => {
  if (e.target.matches(".preset-btn")) {
    document
      .querySelectorAll(".preset-btn")
      .forEach((x) => x.classList.remove("active"));
    e.target.classList.add("active");
  }
});

const getPreset = () =>
  document.querySelector(".preset-btn.active")?.dataset?.key || "zoomIn";

const genCSS = () => {
  const n = document.getElementById("animName").value || "customAnim";
  const dur = document.getElementById("duration").value || 1;
  const del = document.getElementById("delay").value || 0;
  const it = document.getElementById("iteration").value;
  const dir = document.getElementById("direction").value;
  const tim = document.getElementById("timing").value;
  const fill = document.getElementById("fill").value;
  const custom = document.getElementById("customTransform").value.trim();
  const preset = getPreset();
  const keyframes = presets[preset].keyframes;
  const full = `@keyframes ${n}{${keyframes}}\n.animate{animation:${n} ${dur}s ${tim} ${del}s ${it} ${dir} ${fill};${
    custom ? `transform:${custom};` : ""
  }}`;
  document.getElementById("cssOut").value = full;
  return full;
};

document.getElementById("generate").onclick = genCSS;

document.getElementById("apply").onclick = () => {
  const css = genCSS();
  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);
  const el = document.getElementById("preview");
  el.className = "box animate";
};

document.getElementById("copy").onclick = () => {
  navigator.clipboard.writeText(document.getElementById("cssOut").value);
};

document.getElementById("download").onclick = () => {
  const blob = new Blob([document.getElementById("cssOut").value], {
    type: "text/css",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "animation.css";
  a.click();
};

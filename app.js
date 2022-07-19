const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // paint brush
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;
// ctx.moveTo(0, 0);

const colors = [
  "#c678f0",
  "#fec4c3",
  "#ff4344",
  "#ffa535",
  "#fef95d",
  "#bd60ed",
  "#fdafaf",
  "#fe941a",
];

function mousemove(event) {
  ctx.beginPath();
  ctx.moveTo(Math.floor(Math.random() * 800), Math.floor(Math.random() * 800));
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}
canvas.addEventListener("mousemove", mousemove);

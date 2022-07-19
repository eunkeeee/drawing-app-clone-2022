const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // paint brush
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;
let isPainting = false;

function onMove(event) {
  if (isPainting) {
    // 마우스를 누르고 있으면 => 선을 그리도록 함
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  // 마우스를 누르고 있지 않으면 => 시작점을 옮기기만 함
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
}
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
document.addEventListener("mouseup", cancelPainting);

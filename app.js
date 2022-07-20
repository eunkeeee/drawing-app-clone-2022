const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
const modeBtn = document.querySelector("#mode-btn");
const destroyBtn = document.querySelector("#destroy-btn");
const eraserBtn = document.querySelector("#eraser-btn");
const fileInput = document.querySelector("#file");
const textInput = document.querySelector("#text");
const saveBtn = document.querySelector("#save");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); // paint brush

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFill = false;

function onMove(event) {
  if (isPainting) {
    // 마우스를 누르고 있으면 => 선을 그리도록 함
    ctx.lineTo(event.offsetX, event.offsetY); // 마우스가 존재하는 지점 (캔버스 내 좌표)
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  // 마우스를 누르고 있지 않으면 => 시작점을 옮기기만 함
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
}
function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}
// 매번 두개 다 바꾸기 귀찮으니 한줄로 줄이자!!!
function ChangeAllColors(color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function onColorChange(event) {
  ChangeAllColors(event.target.value);
}
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ChangeAllColors(colorValue);
  color.value = colorValue; // feedback for user in input
}
function changeMode() {
  if (isFill) {
    isFill = false;
    modeBtn.innerText = "Fill";
  } else {
    isFill = true;
    modeBtn.innerText = "Draw";
  }
}
function onCanvasClick() {
  if (isFill) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}
function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
function onEraserClick() {
  ctx.strokeStyle = "white";
  isFill = false;
  modeBtn.innerText = "Draw";
}
function onFileChange(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null;
  };
}
function onDouleClick(event) {
  const text = textInput.value;
  if (text !== "") {
    ctx.save(); // 이전의 두께 등 저장
    ctx.lineWidth = 1;
    ctx.font = "68px serif";
    ctx.fillText(text, event.offsetX, event.offsetY); // coordeinates of where we should add the text
    ctx.restore(); // 저장된 정보를 불러옴
  }
}
function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDouleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
document.addEventListener("mouseup", cancelPainting);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", changeMode);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);

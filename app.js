const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    if(filling === false)
        painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){  //'그리기' 아닌 경우
        ctx.beginPath();    //path를 항상 초기화?
        ctx.moveTo(x, y);   //그리고나서 x,y로 옮긴다?
    } else{         // '그리기'인 경우
        ctx.lineTo(x, y);   //path와 line은 다른가?
        ctx.stroke();   //line이 없으면 stroke을 할 수 없는건가?
     }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth  = size;
}

function handleModeClick(event){
    if(filling === false){  //그리기->채우기
        painting = false;
        filling = true;     //채우기o
        mode.innerText = '그리기';        
    }else{  //채우기->그리기
        filling = false;    //채우기 x
        mode.innerText = '채우기';
    }
}

function handleCanvasClick(event){
    if(filling){
        const x = event.offsetX;
        const y = event.offsetY;
        ctx.fillRect(x, y, 100, 60);
    }
}

function handleRightClick(event){
    console.log(event);
    event.preventDefault();
}

function handleSaveClick(event){
    const link = document.createElement("a");
    const image = canvas.toDataURL();
    link.href = image;
    link.download = "PaintByJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleRightClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}


// Sleepy Starfish | Roshani Shrestha, Yuqing Wu, Angela Zhang, Hebe Huang
// SoftDev Pd2
// P04 -- Project Iris | Home Page
// 2022-05-24

var c = document.getElementById("can");
var bg = document.getElementById("bkgd");
var txt = document.getElementById("text");
var personInput = document.getElementById("person");
var msgInput = document.getElementById("message");
// console.log(c);
var ctx = c.getContext('2d');
var ctx1 = bg.getContext('2d');
var ctx2 = txt.getContext('2d');
var x = 0;
var y = 0;
var drawing = false;
var penSize = 2;
ctx.lineWidth = 2;
erasing = false;

ctx.fillStyle = "black"
ctx.strokeStyle = "black"
var penPicker = document.getElementById("penpicker");
penPicker.addEventListener("input", function(){
  ctx.fillStyle = penPicker.value
  ctx.strokeStyle = penPicker.value
})


// Change Background Color
var bkgdPicker = document.getElementById("bkgdpicker");
ctx1.rect(0, 0, bg.width, bg.height);
ctx1.fillStyle = bkgdPicker.value;
ctx1.fill();
bkgdPicker.addEventListener("input", function(){
  ctx1.rect(0, 0, bg.width, bg.height);
  ctx1.fillStyle = bkgdPicker.value;
  ctx1.fill();
})


// Change Pen Size
var sizePicker = document.getElementById("sizepicker");
sizePicker.addEventListener("click", function(){
  penSize = sizePicker.value;
  ctx.lineWidth = sizePicker.value;
})


// Toggle Drawing/Erasing
var penEle = document.getElementById("pen");
var eraserEle = document.getElementById("eraser");
penEle.addEventListener("click", function(){
  if(penEle.checked){
    erasing = false;
  }
  console.log(erasing);
})
eraserEle.addEventListener("click", function(){
  if(eraserEle.checked){
    erasing = true;
  }
  console.log(erasing);
})


// Drawing/Erasing
c.addEventListener("mousedown", function(e){
  console.log("drawing...")
  x = e.offsetX;
  y = e.offsetY;
  console.log(x)
  console.log(y)
  // ctx.fillRect(x, y, penSize, penSize);
  drawing = true;
});

c.addEventListener("mousemove", function(e){
  if (drawing === true) {
    if(erasing != true){
      console.log("drawing...")
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.closePath();
      x = e.offsetX;
      y = e.offsetY;
      console.log(x)
      console.log(y)
    }
    else{
      console.log("erasing...")
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.clearRect(x, y, penSize, penSize)
      ctx.closePath();
      x = e.offsetX;
      y = e.offsetY;
      console.log(x)
      console.log(y)
    }
  }
});

c.addEventListener("mouseup", function(e){
  drawing = false;
});


// Clear Screen
var clearBtn = document.getElementById("clearCanvas");
clearBtn.addEventListener("click", function(){
  ctx.clearRect(0, 0, c.width, c.height);
})



// Change Text Color
var txtColorPicker = document.getElementById("txtcolorpicker");
txtColorPicker.addEventListener("input", function(){
  ctx2.fillStyle = txtColorPicker.value
  update = msgInput.value;
  ctx2.clearRect(0, 0, txt.width, txt.height);
  ctx2.fillText(update, txt.width/2, 25);
})

// Update Text on Canvas
ctx2.textAlign = 'center';
ctx2.font = '16px serif';
msgInput.oninput = function(){
  update = msgInput.value;
  ctx2.clearRect(0, 0, txt.width, txt.height);
  ctx2.fillText(update, txt.width/2, 25);
}


// Submit Finished Note
var submit = document.getElementById("finishedNote");
submit.addEventListener("click", function(){
  if(!personInput.value){
    alert("Please specify a recipient!");
    return;
  }

  let info = document.createElement("form");
  info.setAttribute("method", "POST");
  info.setAttribute("action", "/send");
  document.body.appendChild(info);

  var dataURL = c.toDataURL();
  // console.log(dataURL);
  //document.getElementById("testing").innerHTML = dataURL;
  let imgLink = document.createElement("input");
  imgLink.setAttribute("type", "hidden");
  imgLink.setAttribute("name", "imgLink");
  imgLink.setAttribute("value", dataURL);
  console.log(imgLink)
  info.appendChild(imgLink);

  // console.log(personInput.value);
  let name = document.createElement("input");
  name.setAttribute("type", "hidden");
  name.setAttribute("name", "name");
  name.setAttribute("value", personInput.value);
  info.appendChild(name);

  // console.log(msgInput.value);
  let message = document.createElement("input");
  message.setAttribute("type", "hidden");
  message.setAttribute("name", "message");
  message.setAttribute("value", msgInput.value.replaceAll("\n", " "));
  info.appendChild(message);

  // console.log(bkgdPicker.value);
  let bkgd = document.createElement("input");
  bkgd.setAttribute("type", "hidden");
  bkgd.setAttribute("name", "bkgd");
  bkgd.setAttribute("value", bkgdPicker.value);
  info.appendChild(bkgd);

  let txtColor = document.createElement("input");
  txtColor.setAttribute("type", "hidden");
  txtColor.setAttribute("name", "textcolor");
  txtColor.setAttribute("value", txtColorPicker.value);
  info.appendChild(txtColor);

  const d = new Date();
  // alert(String(d.getMonth()+1) + "-" + String(d.getDate()) + "-" + String(d.getFullYear()));
  let when = document.createElement("input");
  when.setAttribute("type", "hidden");
  when.setAttribute("name", "when");
  when.setAttribute("value", String(d.getMonth()+1) + "-" + String(d.getDate()) + "-" + String(d.getFullYear()));
  info.appendChild(when);

  let enter = document.createElement("input");
  enter.setAttribute("type", "hidden");
  enter.setAttribute("type", "submit");
  info.appendChild(enter);
  enter.click();
})

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

var stickers=document.getElementsByClassName("sticker");
var sticker_drag=new Image();
sticker_drag.crossOrigin = "anonymous";
console.log(stickers);
for(i=0;i<stickers.length;i++){
  stickers[i].addEventListener("dragstart", function(){sticker_drag.src=this.src});
  stickers[i].addEventListener("dragend", (e)=>{
    var m = getMousePos(c, e);
    ctx.drawImage(sticker_drag,m.x-50,m.y-50,100,100); // can't really figure out the offset because the browser size also mess things up
  } );
}

console.log(sticker_drag)

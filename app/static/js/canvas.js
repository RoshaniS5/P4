// /** @jsx React.DOM */
//
// Sleepy Starfish | Roshani Shrestha, Yuqing Wu, Angela Zhang, Hebe Huang
// SoftDev Pd2
// P04 -- Project Iris | Home Page
// 2022-05-24
// //var a = React.createClass({
//   render: function(){
// console.log("hello");
var c = document.getElementById("can");
var personInput = document.getElementById("person");
var msgInput = document.getElementById("message");
console.log(c);
var ctx = c.getContext('2d');
var x = 0;
var y = 0;
var drawing = false;
// ctx.fillRect();
// return "fhjksdhfka";
// }
// })
// module.exports = a;
// function blah(){
//   console.log("hdskjfshkfh")
//   // var c = document.getElementById("can");
//   // console.log(c);
//   // ctx=c.getContext("2d");
//   ctx.fillStyle ="blue"
//   ctx.fillRect(100,100,100,100);

// }

// allows user to draw on canvas
c.addEventListener("mousedown", function(e){
  console.log("drawing...")
  x = e.offsetX;
  y = e.offsetY;
  console.log(x)
  console.log(y)
  ctx.fillStyle = "blue"
  ctx.fillRect(x, y, 1, 1);
  drawing = true;
});

c.addEventListener("mousemove", function(e){
  if (drawing === true) {
    console.log("drawing...")
    ctx.beginPath();
    ctx.strokeStyle = "blue"
    ctx.lineWidth = 1;
    ctx.moveTo(x, y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.closePath();
    x = e.offsetX;
    y = e.offsetY;
    console.log(x)
    console.log(y)
  }
});

c.addEventListener("mouseup", function(e){
  drawing = false;
});

var submit = document.getElementById("finishedNote");
submit.addEventListener("click", function(){

  let info = document.createElement("form");
  info.setAttribute("method", "POST");
  info.setAttribute("action", "/send");
  document.body.appendChild(info);

  var dataURL = c.toDataURL();
  console.log(dataURL);
  document.getElementById("testing").innerHTML = dataURL;
  let imgLink = document.createElement("input");
  imgLink.setAttribute("name", "imgLink");
  imgLink.setAttribute("value", dataURL);
  info.appendChild(imgLink);

  console.log(personInput.value);
  let name = document.createElement("input");
  name.setAttribute("name", "name");
  name.setAttribute("value", personInput.value);
  info.appendChild(name);

  console.log(msgInput.value);
  let message = document.createElement("input");
  message.setAttribute("name", "message");
  message.setAttribute("value", msgInput.value);
  info.appendChild(message);


  const d = new Date();
  alert(String(d.getMonth()) + "-" + String(d.getDate()) + "-" + String(d.getFullYear()));
  let when = document.createElement("input");
  when.setAttribute("name", "when");
  when.setAttribute("value", String(d.getMonth()) + "-" + String(d.getDate()) + "-" + String(d.getFullYear()));
  info.appendChild(when);

  let enter = document.createElement("input");
  enter.setAttribute("type", "submit");
  info.appendChild(enter);
  enter.click();
})

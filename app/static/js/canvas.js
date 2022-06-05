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
  var dataURL = c.toDataURL();
  console.log(dataURL)

  // let results = document.createElement("form");
  // results.setAttribute("method", "POST");
  // results.setAttribute("action", "/send");

  // imgSave = document.createElement("div");
  // imgSave.innerHTML = dataURL;
  image = document.createElement("input");
  image.setAttribute("name", "image");
  image.setAttribute("value", dataURL);
})

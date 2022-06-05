// /** @jsx React.DOM */
//
// // Sleepy Starfish | Roshani Shrestha, Yuqing Wu, Angela Zhang, Hebe Huang
// // SoftDev Pd2
// // P04 -- Project Iris | Home Page
// // 2022-05-24
// //var a = React.createClass({
//   render: function(){
// console.log("hello");
// var c = document.getElementById("can");
// console.log(c);
// var ctx = c.getContext('2d');
// ctx.fillRect();
// return "fhjksdhfka";
// }
// })
// module.exports = a;
function blah(){
  console.log("hdskjfshkfh")
  var c = document.getElementById("can");
  console.log(c);
  ctx=c.getContext("2d");
  ctx.fillStyle ="blue"
  ctx.fillRect(100,100,100,100);

}

var submit = document.getElementById("finishedNote");
submit.addEventListener("click", function(){
  var dataURL = canvas.toDataUrl();

  let results = document.createElement("form");
  results.setAttribute("method", "POST");
  results.setAttribute("action", "/send");

  imgSave = document.createElement("div");
  imgSave.innerHTML = dataURL;
})

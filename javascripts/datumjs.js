
var today = new Date();
    
var month = today.getMonth() + 1;
var year = today.getFullYear();
var day = today.getDate();

var current = day+"."+month+"."+year+".";

document.getElementById("datum").innerHTML = current;
document.getElementById("datum").style.fontSize = "16px";


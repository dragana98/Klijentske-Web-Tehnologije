function danasnjiDatum()
{
    
var today=new Date();

document.getElementById("datum").innerHTML = today.toLocaleDateString();
}
var xmlDoc;

var films;

function loadFilmsXML(){
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          xmlDoc = this.responseXML;
          films = xmlDoc.getElementsByTagName("FILM");
          
      }  
    };
    xmlhttp.open("GET","filmovi.xml",true);
    xmlhttp.send();
}
function pretrazi()
{
    var unos = document.getElementById("input1").value;
    var ispis = document.getElementById("pretraga1");

    ispis.style.display ="block"; // prikazi blok ul

    var reg = new RegExp(unos,"i");
    var string = "";

    for(var i =0; i<films.length; i++)
    {
        var naziv = films[i].getElementsByTagName("NAZIV")[0].childNodes[0].nodeValue;

        if(reg.test(naziv) || unos == "all")
        {
            string += "<li><a href='"+ films[i].getElementsByTagName("ADRESA")[0].childNodes[0].nodeValue +"'>" + naziv + "</a></li>"
        }
    }
    ispis.innerHTML = string;

    if(unos == "") // sakrij blok ul 
    {
        ispis.style.display ="none";
    }
}


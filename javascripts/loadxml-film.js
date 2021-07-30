
var films;
var zanrovi=new Set();
var opisi =[];
var nalozi;

function loadFilmsXML(){
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          xmlDoc = this.responseXML;
          films = xmlDoc.getElementsByTagName("FILM");
          unesiZanrove();
          unesiTabelu();
          
      }  
    };
    xmlhttp.open("GET","filmovi.xml",true);
    xmlhttp.send();
}

function loadOpisXML(){
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          xmlDoc = this.responseXML;
          opisi = xmlDoc.getElementsByTagName("OPIS");     
          
      }  
    };
    xmlhttp.open("GET","opisfilma.xml",true);
    xmlhttp.send();
}

// glavna pretraga
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

function unesiZanrove()
{
    zanrovi = new Set();
    var string = "<option value='svi'>svi</option>";
    var select1 = document.getElementById("select1");

    for(var i =0; i< films.length; i++)
    {
        zanrovi.add(films[i].getElementsByTagName("ZANR")[0].childNodes[0].nodeValue);
    }

    zanrovi.forEach(item => {
        string += "<option value='"+item+"'>"+item+"</option>";
        
    });

    select1.innerHTML = string;
}
a = {"А":"A","а":"a","Б":"B","б":"b","в":"v","В":"V","Г":"G","г":"g","д":"d","Д":"D","Ђ":"Dj","ђ":"dj","е":"e","Е":"E","ж":"z","Ж":"Z","з":"z","З":"Z","и":"i","И":"I","ј":"j","Ј":"J","к":"k","К":"K","л":"l","Л":"L","Љ":"Lj","љ":"lj","м":"m","М":"M","н":"n","Н":"N","Њ":"Nj","њ":"nj","о":"o","О":"O","п":"p","П":"P","р":"r","Р":"R","с":"s","С":"S","т":"t","Т":"T","ћ":"c","Ћ":"C","у":"u","У":"U","ф":"f","Ф":"F","х":"h","Х":"H","ц":"c","Ц":"C","ч":"c","Ч":"C","џ":"dz","Џ":"Dz","ш":"s","Ш":"S"}; 

function unosCirilica(word)
{
    return word.split('').map(function (char) { 
        return a[char] || char; 
      }).join("");
}

function unesiTabelu()
{
    var ispis = document.getElementById("tabela");

    var unos1 = document.getElementById("unos1").value;
    var unoszanr = document.getElementById("select1").value;
    var unosjezik = document.getElementById("select2").value;
    var checkbox = document.getElementById("unos2"); 

    unos1 = unosCirilica(unos1);  // iskljuci/ukljuci prevod

    var reg = RegExp(unos1,"i");

    var string="";

    var indikator = true; // (ne)pronadjen rezultat

    for(var i =0; i< films.length; i++)
    {   
        if(unos1 == films[i].getElementsByTagName("NAZIV")[0].childNodes[0].nodeValue || unos1 == "" || reg.test(films[i].getElementsByTagName("NAZIV")[0].childNodes[0].nodeValue))
        {
            if(unoszanr == films[i].getElementsByTagName("ZANR")[0].childNodes[0].nodeValue || unoszanr == "svi")
            {
                if(unosjezik == films[i].getElementsByTagName("JEZIK")[0].childNodes[0].nodeValue || unosjezik == "svi")
                {
                    if(checkbox.checked)
                    {
                        if(films[i].getElementsByTagName("DOSTUPNO")[0].childNodes[0].nodeValue == "ne")
                        {
                            string += "<tr><td class='klasa1'><img style='width:140px;' src='"+films[i].getElementsByTagName("IMAGE")[0].childNodes[0].nodeValue +"'></td>";
                            string += "<td style='text-align:center;font-weight:bold;font-size:20px;font-family:cursive;width:12.7%;'>"+films[i].getElementsByTagName("NAZIV")[0].childNodes[0].nodeValue + "</td>";

                            string += "<td>"+opisi[i].getElementsByTagName("TEKST")[0].firstChild.nodeValue + "</td>";
                            string += "<td style='width:120px;text-align:center;border-left:2px solid rgba(201, 39, 133, 0);'><button id='rezervisi' name='rezervisi' value='"+ films[i].getElementsByTagName("NAZIV")[0].childNodes[0].nodeValue +"' onclick='prikaziFilm(this)'>Pregled</button></td></tr>"; 

                            indikator = false;
                        }
                    }
                    else
                    {
                        if(films[i].getElementsByTagName("DOSTUPNO")[0].childNodes[0].nodeValue == "da")
                        {
                            string += "<tr><td class='klasa1'><img style='width:140px;' src='"+films[i].getElementsByTagName("IMAGE")[0].childNodes[0].nodeValue +"'></td>";
                            string += "<td style='text-align:center;font-weight:bold;font-size:20px;font-family:cursive; width:12.7%'>"+films[i].getElementsByTagName("NAZIV")[0].childNodes[0].nodeValue + "</td>";

                            string += "<td>"+opisi[0].getElementsByTagName("TEKST")[0].firstChild.nodeValue + "</td>";
                            string += "<td style='width:120px;text-align:center;border-left:2px solid rgba(201, 39, 133, 0);'><button id='rezervisi' name='rezervisi' value='"+ films[i].getElementsByTagName("NAZIV")[0].childNodes[0].nodeValue +"' onclick='prikaziFilm(this)'>Pregled</button></td></tr>"; 

                            indikator = false;
                        }
                       
                    }
                }
            }
        }
    }
    if(indikator)
       string += "<td><i>Rezultat nije pronadjen.</i></td></tr>";

    ispis.innerHTML = string;
}


function prikaziFilm(film)
{
    document.getElementById("tabela").style.display ="none";
    document.getElementById("prikazfilma").style.display ="block";
    document.getElementById("navigacija").style.display ="none";

    document.getElementById("novosti").style.display ="none";
    document.getElementById("uskoro").style.display ="none";
    document.getElementById("dogadjaji").style.display ="none";
    document.getElementById("footer").style.display ="none";

    var slika = document.getElementById("slika1");
    var imefilma = document.getElementById("imefilma");
    var naslov = document.getElementById("naslov");
    var paragraf = document.getElementById("paragraf1");
    var dugme = document.getElementById("dugmerezervacija");
    var titl =  document.getElementById("titl");
    var jezik = document.getElementById("jezik");
    var trajanje = document.getElementById("trajanje");

    var filmzaprikaz;
    var deskripcija;

    for(var i=0;i<films.length;i++)
    {
        if(films[i].getElementsByTagName("NAZIV")[0].childNodes[0].nodeValue == film.value)
        {
            filmzaprikaz = films[i];

            deskripcija = opisi[i];
        }
    }

    slika.src = filmzaprikaz.getElementsByTagName("IMAGE")[0].firstChild.nodeValue;
    imefilma.innerHTML = filmzaprikaz.getElementsByTagName("NAZIV")[0].childNodes[0].nodeValue;
    naslov.innerHTML = filmzaprikaz.getElementsByTagName("NAZIV")[0].childNodes[0].nodeValue;
    paragraf.innerHTML = deskripcija.getElementsByTagName("TEKST")[0].childNodes[0].nodeValue;
    titl.innerHTML = "<b>Titl: </b>" + filmzaprikaz.getElementsByTagName("TITL")[0].childNodes[0].nodeValue;
    jezik.innerHTML = "<b>Jezik: </b>" + filmzaprikaz.getElementsByTagName("JEZIK")[0].childNodes[0].nodeValue;
    trajanje.innerHTML = "<b>Trajanje filma: </b>" + filmzaprikaz.getElementsByTagName("TRAJANJE")[0].childNodes[0].nodeValue;
    dugme.onclick = function(){
        alert("Dodato u korpu!");
    };
    
}

function nazad()
{
    document.getElementById("prikazfilma").style.display ="none";
    document.getElementById("tabela").style.display ="block";
    document.getElementById("navigacija").style.display ="flex";

    document.getElementById("novosti").style.display ="block";
    document.getElementById("uskoro").style.display ="block";
    document.getElementById("dogadjaji").style.display ="block";
    document.getElementById("footer").style.display ="block";
}
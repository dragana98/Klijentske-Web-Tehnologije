var users;
var korisnik;

function loadLoginXML(){
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
          xmlDoc = this.responseXML;
          users = xmlDoc.getElementsByTagName("NALOG");     
          
      }  
    };
    xmlhttp.open("GET","login.xml",true);
    xmlhttp.send();
}

function validacija()
{
    var username = document.getElementById("inp1").value;
    var password = document.getElementById("inp2").value;

    for (var i = 0; i < users.length; i++) {
        var ime = users[i].getElementsByTagName("USERNAME")[0].childNodes[0].nodeValue;
        var sifra = users[i].getElementsByTagName("PASSWORD")[0].childNodes[0].nodeValue;
        if(username == ime && password == sifra){
            document.getElementById("sekcija22").style.display = "";
            document.getElementById("sekcija-duzina").style.display = "none";

            korisnik = users[i];

            unosPodataka();

            return;
        }
    }
    alert("Korisnicko ime ili sifra nije u redu!"); 
}

function unosPodataka()
{
    document.getElementById("ime-acc").innerHTML = "<span id='span-ime'>Ime:  </span>" + korisnik.getElementsByTagName("IME")[0].childNodes[0].nodeValue;
    document.getElementById("prezime-acc").innerHTML = "<span id='span-prezime'>Prezime:  </span>" + korisnik.getElementsByTagName("PREZIME")[0].childNodes[0].nodeValue;
    document.getElementById("rezervacije-acc").innerHTML = "REZERVACIJE: " + korisnik.getElementsByTagName("REZERVACIJE")[0].childNodes[0].nodeValue;
    document.getElementById("broj").innerHTML = "Broj kartice: " + korisnik.getElementsByTagName("KARTICA")[0].childNodes[0].nodeValue;
    document.getElementById("exp").innerHTML = "Exp: " + korisnik.getElementsByTagName("EXP")[0].childNodes[0].nodeValue;
}
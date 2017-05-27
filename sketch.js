var namediv;
var gender;

function setup() {
  namediv = select("#navndiv")

  genbutton = select("#knappen");
  genbutton.mousePressed(makename);

  gender = createRadio();
  gender.parent(select("#radioplass"));
  gender.option("maskuline");
  gender.option("feminine");
  gender.option("begge");
  gender.value("begge");

  antall_fornavn = select("#antall_fornavn");
  antall_etternavn = select("#antall_etternavn");

  min_antall = select("#min_antall");
  max_antall = select("#max_antall");

  makename();
}


function makename() {
  var min_etternavn_stavelser = 0;
  var fornavn = fornavn_kvinner.concat(fornavn_menn);

  var midlertidig_etternavn = []
  for (na of etternavn) {
    if (na.stavelser > min_etternavn_stavelser) {
      if (na.antall < max_antall.value() && na.antall > min_antall.value()) {
      midlertidig_etternavn.push(na);
        }
      }
  }
  var midlertidig_fornavn_menn = []
  for (na of fornavn_menn) {
    if (na.stavelser > min_etternavn_stavelser) {
      if (na.antall < max_antall.value() && na.antall > min_antall.value()) {
      midlertidig_fornavn_menn.push(na);
        }
      }
  }
  var midlertidig_fornavn_kvinner = []
  for (na of fornavn_kvinner) {
    if (na.stavelser > min_etternavn_stavelser) {
      if (na.antall < max_antall.value() && na.antall > min_antall.value()) {
      midlertidig_fornavn_kvinner.push(na);
        }
      }
  }

  if (gender.value() == "maskuline") {
    var i = 0;
    var nyttfornavn = ""
    while (i < antall_fornavn.value()) {
      nyttfornavn = nyttfornavn + " " + midlertidig_fornavn_menn[Math.floor(Math.random() * midlertidig_fornavn_menn.length)].navn;
      i++;
    }
  }
  else if (gender.value() == "feminine") {
    var i = 0;
    var nyttfornavn = ""
    while (i < antall_fornavn.value()) {
      nyttfornavn = nyttfornavn + " " + midlertidig_fornavn_kvinner[Math.floor(Math.random() * midlertidig_fornavn_kvinner.length)].navn;
      i++;
    }
  }
  else {
    var i = 0;
    var nyttfornavn = ""
    while (i < antall_fornavn.value()) {
      nyttfornavn = nyttfornavn + " " + fornavn[Math.floor(Math.random() * fornavn.length)].navn;
      i++;
    }
  }

  var i = 0;
  var nyttetternavn = ""
  var etternavnliste = []
  while (i < antall_etternavn.value()) {
    namekey = Math.floor(Math.random() * midlertidig_etternavn.length)
    if (etternavnliste.indexOf(midlertidig_etternavn[namekey].navn) == -1 ){
      etternavnliste.push(midlertidig_etternavn[namekey].navn);
      nyttetternavn = nyttetternavn + " " + midlertidig_etternavn[namekey].navn;
      i++;
    }
  }

  namediv.html(nyttfornavn + nyttetternavn);
  return nyttfornavn + nyttetternavn;
}

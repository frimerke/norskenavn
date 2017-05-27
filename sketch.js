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

  min_antall_fornavn = select("#min_antall_fornavn");
  max_antall_fornavn = select("#max_antall_fornavn");
  min_antall_etternavn = select("#min_antall_etternavn");
  max_antall_etternavn = select("#max_antall_etternavn");

  $( function() {
  $( "#gardin" ).accordion({
    collapsible: true,
    active: false
  });
} );

  makename();
  console.log(fornavn_menn.length + " mannsnavn, " + fornavn_kvinner.length + " kvinnenavn, " + etternavn.length + " etternavn.");
}


function makename() {
  var min_etternavn_stavelser = 0;
  var genderlist = [fornavn_menn, fornavn_kvinner]

  if (gender.value() == "maskuline") {
    fornavn = genderlist[0];
  }
  else if (gender.value() == "feminine") {
    fornavn = genderlist[1];
  }
  else {
    var fornavn = genderlist[Math.floor(Math.random() * genderlist.length)]
  }

  var midlertidig_etternavn = []
  for (na of etternavn) {
    if (na.stavelser > min_etternavn_stavelser) {
      if (na.antall < max_antall_etternavn.value() && na.antall > min_antall_etternavn.value()) {
      midlertidig_etternavn.push(na);
        }
      }
  }

  var midlertidig_fornavn = []
  for (na of fornavn) {
    if (na.stavelser > min_etternavn_stavelser) {
      if (na.antall < max_antall_fornavn.value() && na.antall > min_antall_fornavn.value()) {
      midlertidig_fornavn.push(na);
        }
      }
  }

  var i = 0;
  var nyttfornavn = ""
  while (i < antall_fornavn.value()) {
    nyttfornavn = nyttfornavn + " " + midlertidig_fornavn[Math.floor(Math.random() * midlertidig_fornavn.length)].navn;
    i++;
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

var namediv;
var gender;
var lagreboks;
var tagselect;

function setup() {
  namediv = select("#navndiv")
  lagreboks = select("#lagreboks")

  genbutton = select("#knappen");
  genbutton.mousePressed(makename);
  lagrebutton = select("#lagre");
  lagrebutton.mousePressed(lagre);
  tagselect = select("#tagselect");

  gender = createRadio();
  gender.parent(select("#radioplass"));
  gender.option("maskuline");
  gender.option("feminine");
  gender.option("begge");
  gender.option("kjønnsnøytrale");
  gender.value("begge");

  antall_fornavn = select("#antall_fornavn");
  antall_fornavn.changed(oppdater_label)
  antall_etternavn = select("#antall_etternavn");
  antall_etternavn.changed(oppdater_label)
  initialer = select("#initialer");
  egetetternavn = select("#egetetternavn")

  min_antall_fornavn = select("#min_antall_fornavn");
  max_antall_fornavn = select("#max_antall_fornavn");
  min_antall_etternavn = select("#min_antall_etternavn");
  max_antall_etternavn = select("#max_antall_etternavn");

  antall_fornavn_label = select("#antall_fornavn_label");
  antall_etternavn_label = select("#antall_etternavn_label");

  $( function() {
  $( "#gardin" ).accordion({
    collapsible: true,
    active: false,
    heightStyle: "content"
  });
  } );

  $('#navndiv').textfill({
  });

  makename();
  oppdater_label();
  listestatus = select("#listestatus");
  listestatus.html(fornavn_menn.length + " maskuline navn, " + fornavn_kvinner.length +
  " feminine navn, " + fornavn_felles.length + " nøytrale navn, " + etternavn.length + " etternavn.")
}

function lagre() {
  lagreboks.html(lagreboks.html() + "<p>" + namediv.html() + "</p>");
}

function oppdater_label() {
  antall_fornavn_label.html(antall_fornavn.value());
  antall_etternavn_label.html(antall_etternavn.value());
}

function makename() {
  var min_etternavn_stavelser = 0;

  var genderlist = [fornavn_menn, fornavn_kvinner, fornavn_felles]

  if (gender.value() == "maskuline") {
    fornavn = genderlist[0];
  }
  else if (gender.value() == "feminine") {
    fornavn = genderlist[1];
  }
  else if (gender.value() == "kjønnsnøytrale") {
    fornavn = genderlist[2];
  }
  else {
    var fornavn = genderlist[Math.floor(Math.random() * 2)]
  }

  fornavn = fornavn.concat(genderlist[2]);

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
    if ((na.stavelser > min_etternavn_stavelser) && (na.antall < max_antall_fornavn.value() && na.antall > min_antall_fornavn.value())) {
      if (tagselect.value() != "ingen") {
        var foundTags = $.inArray(tagselect.value(), na.tag);
        console.log(foundTags);
        if (foundTags > -1) {
          midlertidig_fornavn.push(na);
        }
      }
      else if (na.antall < max_antall_fornavn.value() && na.antall > min_antall_fornavn.value()) {
      midlertidig_fornavn.push(na);
        }
      }
  }

  var i = 0;
  var nyttfornavn = ""
  var fornavnliste = []
  while (i < antall_fornavn.value()) {
    namekey = Math.floor(Math.random() * midlertidig_fornavn.length)
    if (fornavnliste.indexOf(midlertidig_fornavn[namekey].navn) == -1 ){
      fornavnliste.push(midlertidig_fornavn[namekey].navn);
      if (((antall_fornavn.value() - i) == 1) && (initialer.checked() == true))
      {
        var initial = midlertidig_fornavn[namekey].navn[Math.floor(Math.random() * midlertidig_fornavn[namekey].navn.length)].substring(0, 1) + ".";
        nyttfornavn = nyttfornavn + " " + initial;
        i++;
      }
      else {
      nyttfornavn = nyttfornavn + " " + midlertidig_fornavn[namekey].navn[Math.floor(Math.random() * midlertidig_fornavn[namekey].navn.length)];
      i++;
      }
    }
  }
  if (egetetternavn.value() != "") {
    var i = 1;
    var nyttetternavn = " " + egetetternavn.value()
  }
  else {
    var i = 0;
    var nyttetternavn = ""
  }

  var etternavnliste = []
  while (i < antall_etternavn.value()) {
    namekey = Math.floor(Math.random() * midlertidig_etternavn.length)
    if (etternavnliste.indexOf(midlertidig_etternavn[namekey].navn) == -1 ){
      etternavnliste.push(midlertidig_etternavn[namekey].navn);
      nyttetternavn = nyttetternavn + " " + midlertidig_etternavn[namekey].navn;
      i++;
    }
  }

  namediv.html("<span>" + nyttfornavn + nyttetternavn + "</span>");
  return nyttfornavn + nyttetternavn;
}

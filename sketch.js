var namediv;
var gender;
var lagreboks;
var tagselect;
var navnobjekt = [];
var allenavn = [];
var min_etternavn_stavelser = 0;

function setup() {
  namediv = select("#navndiv");
  lagrecontainer = select("#lagrecontainer");
  slettaltknapp = select(".deleteall")
  slettaltknapp.parent(lagrecontainer);

  lagreboks = select("#lagreboks");
  lagreboks.html("")
  if (localStorage.getItem("lagredenavn") != null){
    lagreboks.html(lagreboks.html() + localStorage.getItem("lagredenavn"));
  }


  slettaltknapp.mousePressed(deleteAll);

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

  makename();
  oppdater_label();
  listestatus = select("#listestatus");
  listestatus.html(fornavn_menn.length + " maskuline navn, " + fornavn_kvinner.length +
  " feminine navn, " + fornavn_felles.length + " nøytrale navn, " + etternavn.length + " etternavn.")
}

function lagre() {
  lagreboks.html(lagreboks.html() + "<p>" + namediv.elt.innerText + " <i class='fa fa-times deletethis' aria-hidden='true'></i></p>");
  localStorage.setItem("lagredenavn", lagreboks.html());


}

function oppdater_label() {
  antall_fornavn_label.html(antall_fornavn.value());
  antall_etternavn_label.html(antall_etternavn.value());
}

function veksleNavn() {
  this.object = navnobjekt[this.id()];
  this.parent = select("#" + this.id(), ".ordobjekt");
  this.index = this.object.navn.indexOf(this.parent.elt.innerText);
  if ((this.index + 1) == this.object.navn.length) {
    this.index = 0;
  }
  else {
    this.index = this.index + 1;
  }
  tex = this.parent.elt.childNodes[0];
  tex.nodeValue = this.object.navn[this.index];
}



function deleteParent() {
  this.parent().remove()
  localStorage.setItem("lagredenavn", lagreboks.html());

}

function deleteAll() {
  lagreboks.html("");
  localStorage.setItem("lagredenavn", lagreboks.html());

}




function makename() {

  navnobjekt = [];
  sletteknapper = selectAll(".deletethis");
  for (i = 0; i < sletteknapper.length; i++) {
    sletteknapper[i].mousePressed(deleteParent);
  }

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

  var midlertidig_fornavn = []
  for (na of fornavn) {
    if ((na.stavelser > min_etternavn_stavelser) && (na.antall < max_antall_fornavn.value() && na.antall > min_antall_fornavn.value())) {
      if (tagselect.value() != "ingen") {
        var foundTags = $.inArray(tagselect.value(), na.tag);
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
      navnobjekt.push(midlertidig_fornavn[namekey]);
      if (((antall_fornavn.value() - i) == 1) && (initialer.checked() == true))
      {
        var initial = midlertidig_fornavn[namekey].navn[Math.floor(Math.random() * midlertidig_fornavn[namekey].navn.length)].substring(0, 1) + ".";
        nyttfornavn = nyttfornavn + " " + initial;
        i++;
      }
      else {
      nyttfornavn = nyttfornavn + "<span class='ordobjekt fornavn' id='" + i + "'>" +
      midlertidig_fornavn[namekey].navn[Math.floor(Math.random() * midlertidig_fornavn[namekey].navn.length)] +
      "</span> ";
      i++;
      }
    }
  }

  etternavnet = lagetternavn(i, antall_etternavn.value());
  namediv.html("<span>" + nyttfornavn + etternavnet[0] + "</span>");

  var ord = selectAll(".ordobjekt");
  for (var i = 0; i < ord.length; i++){
    if (navnobjekt[i].navn.length > 1) {
      cyclebutton = createDiv("<i class='fa fa-refresh' aria-hidden='true'></i>");
      cyclebutton.class("cyclebutton subbutton");
      cyclebutton.id(i)
      cyclebutton.parent(ord[i]);
      cyclebutton.mousePressed(veksleNavn);
    }
    nyttnavnbutton = createDiv("<i class='fa fa-plus-circle' aria-hidden='true'></i>");
    nyttnavnbutton.class("nyttnavnbutton subbutton");
    nyttnavnbutton.id(i);
    nyttnavnbutton.parent(ord[i]);
    nyttnavnbutton.mousePressed(nyttnavn);
    if (navnobjekt[i].betydning != null) {
      infobutton = createDiv("<i class='fa fa-info-circle' aria-hidden='true'></i>");
      infobutton.class("infobutton subbutton");
      infobutton.id(i);
      infobutton.parent(ord[i]);
    }
  }

  return nyttfornavn + etternavnet[0];
}

function lagetternavn(teller, antall) {
  i = teller;
  var midlertidig_etternavn = []
  var plaintext = "";
  for (na of etternavn) {
    if (na.stavelser > min_etternavn_stavelser) {
      if (na.antall < max_antall_etternavn.value() && na.antall > min_antall_etternavn.value()) {
      midlertidig_etternavn.push(na);
        }
      }
  }

  if (egetetternavn.value() != "") {
    var e = 1;
    var nyttetternavn = " <span class='ordobjekt etternavn' id='1'>" + egetetternavn.value() + "</span> ";
  }
  else {
    var e = 0;
    var nyttetternavn = ""
  }

  var etternavnliste = []
  while (e < antall) {
    namekey = Math.floor(Math.random() * midlertidig_etternavn.length)
    if (etternavnliste.indexOf(midlertidig_etternavn[namekey].navn) == -1 ){
      etternavnliste.push(midlertidig_etternavn[namekey].navn);
      navnobjekt.push(midlertidig_etternavn[namekey]);
      nyttetternavn = nyttetternavn + "<span class='ordobjekt etternavn' id='" + i + "'>" + midlertidig_etternavn[namekey].navn[0] + "</span> ";
      plaintext += midlertidig_etternavn[namekey].navn[0];
      i++;
      e++;
    }
  }
  return [nyttetternavn, plaintext];
}

function nyttnavn() {
  this.parent = select("#" + this.id(), ".ordobjekt");
  if (this.parent.elt.classList[1] == "etternavn") {
    tex = this.parent.elt.childNodes[0];
    tex.nodeValue = lagetternavn(this.id(), 1)[1];
  }
}

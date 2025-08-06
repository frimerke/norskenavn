var namediv;
var lagreboks;
var tagselect;
var allenavn = [];
var min_etternavn_stavelser = -1;

function setup() {
  navnobjekt = [];
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
  egetetternavn = select("#egetetternavn")

  etternavn_geografisk_check = select("#etternavn_geografisk_check");
  etternavn_paternalt_check = select("#etternavn_paternalt_check");

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

  $( function() {
    $( "#infodiv" ).dialog({
      modal: true,
      draggable: false,
      width: 500,
      autoOpen: false,
      closeText: "x",
      title: ""
    });
  } );

  $( "#infoknapp" ).on( "click", function() {
      $( "#infodiv" ).dialog( "open" );
    });

  genderlist = [fornavn_menn, fornavn_kvinner, fornavn_felles]
  fornavn = settgender();

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
  console.log(this.object);
  if (this.object.navn == undefined) {
    this.object = this.object[0];
  }
  console.log(this.object);
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

function settgender() {
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
    fornavn = genderlist[Math.floor(Math.random() * 2)]
  }

  fornavn = fornavn.concat(genderlist[2]);
  return fornavn;
}


function makename() {

  navnobjekt = [];
  sletteknapper = selectAll(".deletethis");
  for (i = 0; i < sletteknapper.length; i++) {
    sletteknapper[i].mousePressed(deleteParent);
  }

  fornavn = settgender();



  var i = 0;
  fornavnet = lagfornavn(i, antall_fornavn.value(), fornavn);
  etternavnet = lagetternavn(fornavnet[3], antall_etternavn.value());

  namediv.html("<span>" + fornavnet[0] + etternavnet[0] + "</span>");
  rendersubbuttons(navnobjekt_fra_skjerm());

  return fornavnet[0] + etternavnet[0];
}

function navnobjekt_fra_skjerm() {
  ord = selectAll(".ordobjekt");
  skjermnavn = [];

  for (z = 0; z < ord.length; z++) {
    skatt = ord[z].elt.childNodes[0].nodeValue
    skatt = skatt.replace(" ", "");
    for (var i = 0; i < fornavn.length; i++) {
      if ((fornavn[i].navn.indexOf(skatt)) != -1) {
        skjermnavn.push(fornavn[i]);
      }
    }
    for (var e = 0; e < etternavn.length; e++) {
      if ((etternavn[e].navn.indexOf(skatt)) != -1) {
        skjermnavn.push(etternavn[e]);
      }
    }
    }
  navnobjekt = skjermnavn;
  return skjermnavn;
}

function rendersubbuttons(ordobjekter) {
  ord = selectAll(".ordobjekt");
  dest = selectAll(".subbutton")
  for (var i = 0; i < dest.length; i++) {
    dest[i].remove();
  }
  for (var i = 0; i < ord.length; i++){
    if (ordobjekter[i].navn.length > 1) {
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
    if (ordobjekter[i].betydning != null) {
      infobutton = createDiv("<i class='fa fa-info-circle' aria-hidden='true'></i>");
      infobutton.class("infobutton subbutton");
      infobutton.id(i);
      infobutton.parent(ord[i]);
    }
  }
}

function lagfornavn(teller, antall, mf) {
  i = teller;
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
  console.log(midlertidig_fornavn.length);

  var nyttfornavn = ""
  var plaintext = "";
  var lokalenavn = []
  while (i < antall) {
    namekey = Math.floor(Math.random() * midlertidig_fornavn.length)
    if (lokalenavn.indexOf(midlertidig_fornavn[namekey]) == -1 ){
      navnobjekt.push(midlertidig_fornavn[namekey]);
      lokalenavn.push(midlertidig_fornavn[namekey]);
      i++;
    }
  }
  lokalenavn.sort(function(a,b) {
    return a.stavelser - b.stavelser;
  });
  for (var e = 0; e < lokalenavn.length; e++) {
    nyttfornavn = nyttfornavn + "<span class='ordobjekt fornavn' id='" + e + "'>" +
    lokalenavn[e].navn[Math.floor(Math.random() * lokalenavn[e].navn.length)] +
    "</span> ";
    plaintext += " " + lokalenavn[e].navn[Math.floor(Math.random() * lokalenavn[e].navn.length)]
    }
  return [nyttfornavn, plaintext, lokalenavn, i]
}

function lagetternavn(teller, antall) {
  i = teller;
  var midlertidig_etternavn = []
  var plaintext = "";
  for (na of etternavn) {
    if (na.stavelser > min_etternavn_stavelser) {
      if (na.antall < max_antall_etternavn.value() && na.antall > min_antall_etternavn.value()) {
        if (na.klasse == "paternalt" && (etternavn_paternalt_check.checked())) {
          midlertidig_etternavn.push(na);
        }
        if (na.klasse == "geografisk" && etternavn_geografisk_check.checked()) {
          midlertidig_etternavn.push(na);
        }
        if (na.klasse != "geografisk" && na.klasse != "paternalt") {
          midlertidig_etternavn.push(na);
        }
      }
    }
  }

  if (egetetternavn.value() != "") {
    var e = 1;
    var nyttetternavn = " <span class='ordobjekt etternavn' id='" + i + "'>" + egetetternavn.value() + "</span> ";
    plaintext += egetetternavn.value();
    i++;
  }
  else {
    var e = 0;
    var nyttetternavn = ""
  }

  var etternavnliste = []
  while (e < antall) {
    namekey = Math.floor(Math.random() * midlertidig_etternavn.length)
    if (etternavnliste.indexOf(midlertidig_etternavn[namekey]) == -1 ){
      etternavnliste.push(midlertidig_etternavn[namekey]);
      navnobjekt.push(midlertidig_etternavn[namekey]);
      nyttetternavn = nyttetternavn + "<span class='ordobjekt etternavn' id='" + i + "'>" + midlertidig_etternavn[namekey].navn[0] + "</span> ";
      plaintext += midlertidig_etternavn[namekey].navn[0];
      i++;
      e++;
    }
  }
  return [nyttetternavn, plaintext, etternavnliste];
}

function nyttnavn() {
  this.parent = select("#" + this.id(), ".ordobjekt");
  if (this.parent.elt.classList[1] == "etternavn") {
    navnet = lagetternavn(this.id(), 1);
    tex = this.parent.elt.childNodes[0];
    tex.nodeValue = navnet[1];
    navnobjekt[this.id()] = navnet[2];
  }
  else {
    navnet = lagfornavn(0, 1);
    tex = this.parent.elt.childNodes[0];
    tex.nodeValue = navnet[1];
    navnobjekt[this.id()] = navnet[2];
  }

  rendersubbuttons(navnobjekt_fra_skjerm());
}

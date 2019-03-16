function main() {
  $.getJSON("./database.json", function(data) {
    index = data.info;
    start();
  });
}

function start() {
  progress = 0; total = 0; imgLenght = 0;
  dbCap = index.length - 1;

  getRange();
  getImage();
}

function addInfo() {
  $("#info-button").hide();
  $("#info-box").show();
}

function vote(get) {
  progress += get;
  total += 1;
  getImage();
}

function getRange() {
  to = $("#to").val() - 1;
  from = $("#from").val() - 1;
  // the first check is for the first acces
  to = (to >= 0 && to <= (index.length - 1)) ? to : 0
  from = (from >= 0 && from <= (index.length - 1)) ? from : index.length - 1

  if (to > from) {
    to = to + from;
    from = to - from;
    to = to - from;
  } // swap

  db = index.slice(to,from+1);
}

function getImage() {
  var elem;
  if (db.length > 0) {
    elem = db.splice(Math.floor(Math.random() * db.length),1)[0];
    $("body").html(`
      <div class="container with-title container-fluid mt-3">
        <h2 class="title">${progress}/${total} foto indovinate</h2>
        <div class="container text-center">
          <img class="img-fluid" style="max-height: 450px" src="./foto/${elem.url}" alt="Card image cap">
        </div>
        <div class="container">
          <div id="info-box">
            <h5>${elem.author},</h5>
            <p>${elem.name}</p>
            <button type="button" class="btn is-primary" id="voteup" onclick="vote(1)">Indovinata</button>
            <button type="button" class="btn is-error" id="votedown" onclick="vote(0)">Non Indovinata</button>
          </div>
          <button type="button" class="btn" id="info-button" onclick="addInfo()">Mostra info</button>
        </div>
        <button type="button" class="btn is-success" onclick="start()">Cambia Range</button>
        <div class="field is-inline mt-1">
          <label for="to" class="m-1">Da</label>
          <input class="input" style="max-width: 94px" id="to" type="number" min="1" max="${dbCap}" value="${to+1}">
          <label for="from" style="max-width: 18px" class="m-1">a</label>
          <input class="input" style="max-width: 94px" id="from" type="number" min="1" max="${dbCap}" value="${from+1}">
        </div>
        <br/>
        <p class="text-right text-secondary">
          Created by <a href="https://github.com/forno96">@forno96</a>
        </p>
      </div>`);
    $("#info-box").hide();
  }
  else {
    $("body").html(`
      <div class="container container-fluid mt-3 text-center">
        <h2> Hai visto tutte le immagini! </h2>
        <h3> Con ${progress} su ${total} immagini azzeccate! </h3>

        <button type="button" class="btn" onclick="start()">Reinizia da capo</button>
        <button type="button" class="btn is-success" onclick="start()">Cambia Range</button>
        <div class="field is-inline">
          <label for="to" class="m-1">Da</label>
          <input class="input" style="max-width: 94px" id="to" type="number" min="1" max="${dbCap}" value="${to+1}">
          <label for="from" style="max-width: 18px" class="m-1">a</label>
          <input class="input" style="max-width: 94px" id="from" type="number" min="1" max="${dbCap}" value="${from+1}">
        </div>
        <br/>
        <p class="text-right text-secondary">
          Created by <a href="https://github.com/forno96">@forno96</a>
        </p>
      </div>`);
  }
}

var imgSel = [];

function start(){
    andamento=0; totale=0; imgLenght=0;
    while (imgSel.length != 0) imgSel.pop();
    getRange();
    getImage();
}

function addInfo(){
    $("#info-button").hide();
    $("#info-box").show();
}

function vote(get){
    andamento += get;
    totale +=1;
    getImage();
}

function getRange(){
    to = $("#to").val()-1;
    from = $("#from").val()-1;
    to = (to && to>0 && to<196) ? to: 0 //controllo correttezza imput
    from = (from && from>0 && from<196) ? from : 196 //controllo correttezza imput
    if(to>from) {to=to+from; from=to-from; to=to-from;} //swap
}

function getImage(){
    $.getJSON("./database.json", function(data){
        var rnd;
        if (from-to+1 != imgLenght){
            do{
                rnd = Math.floor(Math.random() * (from-to+1))+to;
            } while (imgSel[rnd]!=null);//controllo per non pescare la setessa immagine 2 volte
            imgSel[rnd]=1;
            imgLenght+=1;
            img=rnd;
            $("body").html(`
                <div class="container with-title container-fluid mt-3">
                    <h2 class="title">${andamento}/${totale} foto indovinate</h2>
                    <div class="container text-center">
                        <img class="img-fluid" style="max-height: 450px" src="./foto/${data.info[img].url}" alt="Card image cap">
                    </div>
                    <div class="container">
                        <div id="info-box">
                            <h5>${data.info[img].author},</h5>
                            <p>${data.info[img].name}</p>
                            <button type="button" class="btn is-primary" id="voteup" onclick="vote(1)">Indovinata</button>
                            <button type="button" class="btn is-error" id="votedown" onclick="vote(0)">Non Indovinata</button>
                        </div>
                        <button type="button" class="btn" id="info-button" onclick="addInfo()">Mostra info</button>
                    </div>
                    <button type="button" class="btn is-success" onclick="start()">Cambia Range</button>
                    <div class="field is-inline mt-1">
                        <label for="to" class="m-1">Da</label>
                        <input class="input" style="max-width: 94px" id="to" type="number" min="1" max="${data.info.length}" value="${to+1}">
                        <label for="from" style="max-width: 18px" class="m-1">a</label>
                        <input class="input" style="max-width: 94px" id="from" type="number" min="1" max="${data.info.length}" value="${from+1}">
                    </div>
                </div>
                `
            );
            $("#info-box").hide();
        }
        else {
            $("body").html(`
                <div class="container container-fluid mt-3 text-center">
                    <h2> Hai visto tutte le immagini! </h2>
                    <h3> Con ${andamento} su ${totale} immagini azzeccate! </h3>

                    <button type="button" class="btn" onclick="start()">Reinizia da capo</button>
                    <button type="button" class="btn is-success" onclick="start()">Cambia Range</button>
                    <div class="field is-inline">
                        <label for="to" class="m-1">Da</label>
                        <input class="input" style="max-width: 94px" id="to" type="number" min="1" max="${data.info.length}" value="${to+1}">
                        <label for="from" style="max-width: 18px" class="m-1">a</label>
                        <input class="input" style="max-width: 94px" id="from" type="number" min="1" max="${data.info.length}" value="${from+1}">
                    </div>

                </div>`);
        }
    });
}

var img, andamento, totale, imgLenght;
var imgSel = [];

function start(){
    andamento=0; totale=0; imgLenght=0;
    while (imgSel.length != 0) imgSel.pop();
    getImage();
}

function addInfo(){
    $("#info, #change").hide();
    $.getJSON("./database.json", function(data){
        $("#box").prepend(`
            <h5>${data.info[img].author},</h5>
            <p>${data.info[img].name}</p>
        `);
    });
    $("#voteup, #votedown").show();
}

function vote(get){
    andamento += get;
    totale +=1;
    getImage();
}

function getImage(){
    $.getJSON("./database.json", function(data){
        var rnd;
        if (data.info.length != imgLenght){
            do{ rnd = Math.floor(Math.random() * data.info.length);
            } while (imgSel[rnd]!=null)
            imgSel[rnd]=1;
            imgLenght+=1;
            img=rnd;
            $("body").html(`
                <div class="container with-title container-fluid mt-3">
                    <h2 class="title">${andamento}/${totale} foto indovinate</h2>
                    <div class="container text-center">
                        <img class="img-fluid" style="max-height: 450px" src="./foto/${data.info[img].url}" alt="Card image cap">
                    </div>
                    <div class="container" id="box">
                        <button type="button" class="btn" id="info" onclick="addInfo()">Mostra info</button>

                        <button type="button" class="btn is-primary" id="voteup" onclick="vote(1)">Indovinata</button>
                        <button type="button" class="btn is-error" id="votedown" onclick="vote(0)">Non Indovinata</button>
                    </div>
                    <button type="button" class="btn is-success" id="change" onclick="vote(0)">Cambia Immagine</button>
                </div>
                `
            );
            $("#voteup, #votedown").hide();
        }
        else {
            $("body").html(`
                <div class="container container-fluid mt-3">
                    <h2> Hai visto tutte le immagini! </h2>
                    <h3> Con ${andamento} su ${totale} immagini azzeccate! </h3>
                    <button type="button" class="btn is-success" onclick="start()">Reinizia da capo</button>
                </div>`);
        }
    });
}

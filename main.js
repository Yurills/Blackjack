var dealer_sum = 0;
var dealer_hidden;
var player_sum = 0;
var deck = [];

var dealer_ace = 0;
var player_ace = 0;

var player_canHit = true;

function deck_create() {
    let suits = ["clubs","diamonds","hearts","spades"];
    let rank = ["2","3","4","5","6","7","8","9","10","ace","jack","king","queen"];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            deck.push(suits[i]+"_"+rank[j]);
        }
    }
}
function deck_shuffle() {
    let i = deck.length 
    let temp;
    let j;
    while(i) {
        j = Math.floor(Math.random() * i--);
        
        temp = deck[i];
        deck[i]=deck[j];
        deck[j]=temp;
    }
}
function convert_card(i) { 
    let data = i.split("_");   //[suits,rank]
    if (data[1] =="ace"){
        return 11;
    }
    else if (data[1]=="jack" || data[1]=="queen" || data[1]=="king"){
        return 10;
    }
    else return parseInt(data[1])
}
function count_ace(i) {
    let data = i.split("_");   //[suits,rank]
    if (data[1] == "ace"){
        return 1;
    }
    else return 0;
}
function dealer_draw_card() {
    let card = deck.pop();
    dealer_sum += convert_card(card);
    dealer_ace += count_ace(card);

    let cardImg = document.createElement("img");
    cardImg.src = "card/"+card+".png"
    document.getElementById("dealer_card").append(cardImg);
}

function player_draw_card() {
    let card = deck.pop();
    player_sum += convert_card(card);
    player_ace += count_ace(card);

    let cardImg= document.createElement("img");
    cardImg.src = "card/"+card+".png"
    document.getElementById("player_card").append(cardImg);
}


//on start
window.onload = function start_game() {
    deck_create();
    deck_shuffle();
    start();
    console.log(deck);
}

function start() {
    dealer_hidden = deck.pop();
    dealer_sum += convert_card(dealer_hidden);
    dealer_ace += count_ace(dealer_hidden);
    dealer_draw_card();
    
    player_hidden = deck.pop();
    player_sum += convert_card(player_hidden);
    player_ace += count_ace(player_hidden);
    let cardImg= document.createElement("img");
    cardImg.src = "card/"+player_hidden+".png";
    document.getElementById("front").append(cardImg);
    player_draw_card();
    
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
    document.getElementById("end").addEventListener("click", end);
    
    
    console.log("dealer ace " + dealer_ace);
    console.log("dealer sum " + dealer_sum);
    console.log("player ace " + player_ace);
    console.log("player sum " + player_sum);
    console.log(dealer_hidden);
}

function hit() {
    if (player_canHit == false){
        return
    }
    else {player_draw_card();}
    if (checkAce(player_ace,player_sum) > 21){
        player_canHit = false;
    }


    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("end").disabled = false;
}

function checkAce(ace,sum) {
    for (ace>0; ace--;) {
        sum -= 10
    }
    return sum;
}


function stand() {
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    document.getElementById("end").disabled = false;
    player_canHit = false;
}

var msg ="";
function end() {
    if (player_canHit==false ){
        document.getElementById("hit").disabled = true;
        document.getElementById("stand").disabled = true;
        while (dealer_sum < 17&& player_sum!=21){
            dealer_draw_card();
        }
        if (player_sum>21){
            player_sum = checkAce(player_ace,player_sum)
        }
        if (dealer_sum>21){
            dealer_sum = checkAce(dealer_ace,dealer_sum)
        }
        document.getElementById("dealer_hidden").src="card/"+dealer_hidden+".png";
        //check win condition
        if(dealer_ace == 1 && dealer_sum == 21 && document.getElementById("dealer_card").getElementsByTagName("img").length == 2){
            msg = "DEALER WIN\nNatural 21"
            document.getElementById("end").addEventListener("click",function(){document.getElementById("end_banner").style.display="flex"});
        }
        else if(player_ace == 1 && player_sum == 21 && document.getElementById("player_card").getElementsByTagName("img").length == 2){
            msg = "PLAYER WIN\nNatural 21"
            document.getElementById("end").addEventListener("click",function(){document.getElementById("end_banner").style.display="flex"});
        }
        else if (player_sum > 21 && dealer_sum <= 21){
            msg = "DEALER WIN\nPlayer Busted"
            document.getElementById("end").addEventListener("click",function(){document.getElementById("end_banner").style.display="flex"});
        }
        else if (dealer_sum > 21 && player_sum <= 21){
            msg = "PLAYER WIN\nDealer Busted"
            document.getElementById("end").addEventListener("click",function(){document.getElementById("end_banner").style.display="flex"});
        }
        else if (player_sum == dealer_sum){
            msg = "DRAW"
            document.getElementById("end").addEventListener("click",function(){document.getElementById("end_banner").style.display="flex"});
        }
        else if (player_sum > 21 && dealer_sum > 21){
            msg = "DRAW"
            document.getElementById("end").addEventListener("click",function(){document.getElementById("end_banner").style.display="flex"});
        }
        else if (player_sum > dealer_sum){
            msg = "PLAYER WIN"
            document.getElementById("end").addEventListener("click",function(){document.getElementById("end_banner").style.display="flex"});
        }
        else if (player_sum < dealer_sum){
            msg = "DEALER WIN"
            document.getElementById("end").addEventListener("click",function(){document.getElementById("end_banner").style.display="flex"});
        }
        else {
            msg = "DRAW"
            document.getElementById("end").addEventListener("click",function(){document.getElementById("end_banner").style.display="flex"});
        }
        document.getElementById("condition").textContent=msg;

    }
    else {
    if (dealer_sum < 17 && player_sum!=21){
        dealer_draw_card()}
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;
    document.getElementById("end").disabled = true;}
    
    console.log("dealer ace " + dealer_ace);
    console.log("dealer sum " + dealer_sum);
    console.log("player ace " + player_ace);
    console.log("player sum " + player_sum);
    console.log("condition " + msg);

}
function reset(){
    window.location.reload();
}



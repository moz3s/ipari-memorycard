let a = 'url(memocards/mirelit.png)';
let b = 'url(memocards/bufe.png)';
let c_img = 'url(memocards/fujsag.png)';
let d = 'url(memocards/melegedo.png)';
let e = 'url(memocards/szuk.png)';
let f = 'url(memocards/szeles.png)';
let g = 'url(memocards/gepesz.png)';
let h = 'url(memocards/hirado.png)';
let hatter = 'url(memocards/hatter.png)';

var cards = document.querySelectorAll('.card');
var card = new Array(16);   //cards
var step=0;

var card_clicked=-1;
var card1=-1
var card2=-1;
var card_cnt=0;   //ennyi párt vettünk már le
var card_clicked_cnt = 0;
var turn_enabled = false;
var score = 0;
const timer_disp = document.getElementById('timer');
var maintimer = 0;
timercnt = 0;
prgtimer = setInterval(run_prg, 100);       //start process timer
m1=0;
m2=0;
s1=0;
s2=0;
totalseconds = 0;

const scoreboard = document.getElementById('scoreboard');
const yourtime = document.getElementById('yourtime');
const yourscore = document.getElementById('yourscore');
const yourclicks = document.getElementById('yourclicks');
let scoreboard_painted = false;
finaltime = 0;


cards.forEach(function(card) {
card.addEventListener('click', turncard);

});




function shuffleCards(){
    //first fill up cards
    for(i=0; i<cards.length; i++){ 
        card[i]=Math.floor((i/2))+1;
        }
    
    //shuffle randomly
    for(i=1; i<500; i++){
        temp =0;
        p1 = Math.floor(Math.random() * card.length);
        p2 = Math.floor(Math.random() * card.length);
        temp =card[p1];
        card[p1] = card[p2];
        card[p2] = temp;
    }

}

function assignImage(name,p){
    var c = document.getElementById(name);
    if(card[p]==0){
        c.style.opacity= '0';
    }
    else{
        c.style.opacity = '1';
    }
    switch(card[p]){
        case 1: {
            c.style.backgroundImage= a;
            break;
        } 
        case 2: {
            c.style.backgroundImage= b;
            break;
        }
        case 3:{
            c.style.backgroundImage= c_img;
            break;
        }
        case 4:{
            c.style.backgroundImage= d;
            break;
        }
        case 5:{
            c.style.backgroundImage= e;
            break;
        }
        case 6:{
            c.style.backgroundImage= f;
            break;
        }
        case 7:{
            c.style.backgroundImage= g;
            break;
        }
        case 8:{
            c.style.backgroundImage= h;
            break;
        }
    }//switch
}

   
function turncard(event) {
    if(turn_enabled == false){
        return;
    }
    const activeCard = event.target;
    s = activeCard.id;
    s = s.slice(4,6);
    card_clicked=parseInt(s);
    card_clicked_cnt++;
    }


      
//-------------------------------------------------------------------------------------------------------
function reset(){ //step 0-ban fut le
    cards.forEach(function(cardElement) {
        cardElement.style.backgroundImage = hatter;
        cardElement.style.opacity = '1';
    });
}


function reset_game(){ // resetgombra kattintva fut le
    step = 0;
    m1=0;
    m2=0;
    s1=0;
    s2=0;
    totalseconds=0;
    scoreboard.classList.add('scoreboardbef');
    scoreboard.classList.remove('scoreboardaft');
    card_clicked_cnt = 0;
    scoreboard_painted = false;
    turn_enabled = false;
}


//-------------------------------------------------------------------------------------------------------
function painttimer(){
    m1disp = m1.toString();
    m2disp = m2.toString();
    s1disp = s1.toString();
    s2disp = s2.toString();
    disptime = m1disp + m2disp + ':' + s1disp + s2disp;
    if (maintimer % 10 == 0){
        timer_disp.innerText = disptime;
        if(s2<9){
            s2++;
        }
        else{
            s2=0;
            if(s1<5){
                s1++;
            }
            else{
                s1=0;
                if(m2<10){
                    m2++;
                }
                else{
                    m2=0;
                    m1++;
                    if(m1>5){
                        reset_game();
                    }
                }
            }
        }
        totalseconds++;
    }
}



function paintscoreboard(){
    finalscore = totalseconds -1 + card_clicked_cnt;
    yourtime.innerText = timer_disp.innerHTML;
    yourclicks.innerText = card_clicked_cnt;
    yourscore.innerText = finalscore;
}

//-------------------------------------------------------------------------------------------------------
function flip_card(n) {
    idnumber = n.toString();
    id = 'card' + idnumber;
    const currentcard = document.getElementById(id);
    currentcard.style.transform = 'rotateY(90deg)';
}


function show_card(n) {
    idnumber = n.toString();
    id = 'card' + idnumber;
    const currentcard = document.getElementById(id);
    
    assignImage(id,n);
    currentcard.style.transform = 'rotateY(0deg)';
}

 
//-------------------------------------------------------------------------------------------------------
function delete_card(n) {
    card[n]=0;
    idnumber = n.toString();
    id = 'card' + idnumber;
    assignImage(id,n);
}

//-------------------------------------------------------------------------------------------------------
function hide_card(n) {
    idnumber = n.toString();
    id = 'card' + idnumber;
    const currentcard = document.getElementById(id);
    currentcard.style.backgroundImage = hatter;
    currentcard.style.transform = 'rotateY(0deg)';
}


//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
function run_prg(){
if(timercnt>0)
    {
        timercnt = timercnt-100;
    }
else
    {
        timercnt=0;
    }
if(card_cnt<8)
    {
        painttimer();
    }
switch (step)
        {
        case 0:    //inicializáció, tömbök létrehozása   
                reset();
                step=10;
                break;


        case 10:  //játék indítása: START-ra vár, véletlenszerő feltöltés, időzítő indul
                shuffleCards();
                card_cnt=0;
                turn_enabled = true;
                step=20;    
                break;


        case 20:  //1. kattintás: koordináták eltárolása
                if (card_clicked==-1){break};
                card1 = card_clicked;
                card_clicked=-1;
                flip_card(card1);
                timercnt = 300;
                step=25;
                break;
        
        case 25: //
            if (timercnt>0) break;
            show_card(card1);
            step = 30;
            break;

        case 30:  //2. kattintás: koordináták eltárolása
                if (card_clicked==-1){break};
                card2 = card_clicked;
                card_clicked=-1;
                if(card2==card1){
                    card2 = -1;
                    break;
                }
                flip_card(card2);
                timercnt = 300;
                step=35;
                break;

        case 35: 
                if (timercnt>0) break;
                show_card(card2);
                timercnt = 1200;
                step = 40;
                break;

        case 40:  //ellenőrzés: kiolvassuk a tömbből a koordináták alapján a kártyák számát. 
                  //ha egyformák +1 pont, kártyák törlése; ha nem egyformák kártyák visszafordítása
                if (timercnt>0){break};
 
                c1=card[card1];
                c2=card[card2];

                if (c1==c2)   //megegyezik
                    {
                    delete_card(card1);
                    delete_card(card2);    
                    card_cnt++;
                    }
                    else
                    {
                    hide_card(card1);
                    hide_card(card2);    
                    }
                step=50;
                break;

        case 50:  //loop: van még kártya? ha igen vissza 20-ra
                if (card_cnt>=8) 
                    {
                    step=60;
                    }
                    else
                    {
                    step=20;    
                    }
                break;


        case 60:  //játék vége; időzítő leállítása; pontszám kíírása
                scoreboard.classList.remove('scoreboardbef');
                scoreboard.classList.add('scoreboardaft');
                turn_enabled = false;
                if(scoreboard_painted == false){
                    paintscoreboard();
                    scoreboard_painted = true;
                }
                break;


        case 70:   //restart gomb megnyomására vár
                break;


       }

maintimer++;
}

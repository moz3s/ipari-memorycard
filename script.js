let a = 'url(cards/mirelit.png)';
let b = 'url(cards/bufe.png)';
let c_img = 'url(cards/fujsag.png)';
let d = 'url(cards/melegedo.png)';
let e = 'url(cards/szuk.png)';
let f = 'url(cards/szeles.png)';
let g = 'url(cards/gepesz.png)';
let h = 'url(cards/hirado.png)';
let hatter = 'url(hatter.png)'

var cards = document.querySelectorAll('.card');
var card = new Array(4);   //4 lines of cards
var nbr=4;   //number of cards in a raw

// testcard1 = document.querySelector('.card1');
// testcard1.style.backgroundImage = g;
// Iterálj végig a NodeList-en és minden kártyához adj hozzá egy click eseménykezelőt

cards.forEach(function(card) {
    card.addEventListener('click', turncard);
    
});

function initCards(){
    // Loop to create 2D array using 1D array 

    for (i = 0; i < card.length; i++) { 
        card[i] = new Array(nbr); 
        for(j=0; j<nbr; j++) {
          card[i][j]=0;   	
          } 
      }  
    }



function shuffleCards(){
    //first fill up cards
    for(i=0; i<4; i++){ 
        for(j=0; j<4; j++){
            p=i*4+j;
            card[i][j]=Math.floor((p/2))+1;
        }
    }
    //shuffle randomly
    for(i=1; i<500; i++){
        temp =0;
        x1 = Math.floor(Math.random() * 4);
        x2 = Math.floor(Math.random() * 4);
        y1 = Math.floor(Math.random() * 4);
        y2 = Math.floor(Math.random() * 4);
        temp =card[x1][y1];
        card[x1][y1] = card[x2][y2];
        card[x2][y2] = temp;
    }

}

function assignImage(name,x,y){
    var s = 'card'+ name;
    var c = document.getElementById(s);
    if(card[x][y]==0){
        c.style.opacity= '0';
    }
    else{
        c.style.opacity = '1';
    }
    switch(card[x][y]){
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
        const activeCard = event.target;
        s=activeCard.id;
        s = s.slice(4,6);
        n=parseInt(s);
        x=n%4;
        y=Math.floor(n/4);
        activeCard.style.transform = 'rotateY(90deg)';
        assignImage(s,x,y);
        setTimeout(function() {
            activeCard.style.border = 'solid 4px yellow';
            activeCard.style.transform = 'rotateY(0deg)';
        }, 300);
    }


function reset(){
    cards.forEach(function(cardElement) {
        cardElement.style.backgroundImage = hatter;
        cardElement.style.border = 'none';
        clickCount=0;
    });
    shuffleCards();
}
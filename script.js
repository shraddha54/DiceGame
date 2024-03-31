'use strict';
//this game model is based on selection id selecting elements:
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const curScore0 = document.querySelector('#current--0');
const curScore1 = document.querySelector('#current--1');
//both the method works equally in selecting the id; elememtbyid is faster that query but we can use both of them
let score , playing , currentScore , activePlayer;
const init = function(){
     score = [0,0]// this is the final score and we've taken it as 00 as per the index of plyer0 and 1 initialised to 0;
     playing = true;
     currentScore = 0;// the cur val initialised;
     activePlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0; // js will convert num to str ;
    curScore0.textContent = 0
    curScore1.textContent = 0

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')

}
init();

const swapPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active'); // this means with toggle methid i.e. if player--active class is present remove it as like contains and if not present add it; as we have given player0 initialised as active then by toggel it will removed and pl2 will active and in next phase reverse will be done;
    player1El.classList.toggle('player--active');
};




// rolling dice functionality;
btnRoll.addEventListener('click' , function(){
    if(playing){
         //1. random dice roll:
const dice = Math.trunc(Math.random() * 6) + 1; // to generate random val b/w 1 to 6;

//2. display dice
//remove the hidden here as the dice rolled we need to visualise it;
diceEl.classList.remove('hidden');
diceEl.src = `dice-${dice}.png`;// here we have taken src component of html dynamically as src i html takes only oic 5 but we may have any of them so with random val added in the src by js dynamically;

//3. check for dice is 1; if true switch to next player if not store the value;
if(dice !== 1){
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
}
else{ //switch to next player;
   swapPlayer();
}
    }
   
});

// for hold button:
btnHold.addEventListener('click' , function(){
    if(playing){
        score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];


    //check if score>=100
    
    if(score[activePlayer] >= 60){
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }


    //switch to next player:
    else
    swapPlayer();
    }
    
})

// again wala button:
btnNew.addEventListener('click' , init) ;
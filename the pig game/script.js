'use strict';

var scores, roundScore, activePlayer, gamePlaying, current_0_DOM, current_1_DOM, 
    playerActive_0, playerActive_1, diceDOM, diceDOM_0;

init();

var lastDice;
var input;

document.querySelector('.target').style.display = 'block';

document.querySelector('.btn--roll').addEventListener('click', function() {
    if(gamePlaying){
    //1. Produce a random number
     var dice = Math.floor(Math.random() * 6) + 1;
     var dice_0 = Math.floor(Math.random() * 6) + 1;
    
    //2. display result
    diceDOM.style.display = 'block';
    diceDOM_0.style.display = 'block';
    diceDOM.src = 'dice-' + dice  + '.png'; 
    diceDOM_0.src = 'dice-' + dice_0  + '.png';

    //3. Update roundScore with rolled numbers IF condtions are met
    if(dice === 6 && lastDice === 6){
        scores[activePlayer] = 0;
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
    } else if(dice !== 1 && dice_0 !== 1){
        roundScore += dice + dice_0;
        console.log(dice, dice_0);
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
         }
         lastDice = dice;
    }
});

document.querySelector('.btn--hold').addEventListener('click', function() {
    if(gamePlaying) {
   
    var currentScore = (Number (document.getElementById('score--' + activePlayer).textContent));
        currentScore += roundScore;
        document.querySelector('#score--' + activePlayer).textContent = currentScore;
        
        input = document.querySelector('.target').value;
        var winningScore;
        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }

        if(currentScore >= winningScore){
            document.querySelector('#name--' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            diceDOM.style.display = 'none';
            diceDOM_0.style.display = 'none';
            gamePlaying = false;
        } else {
        nextPlayer();
        }
    }
});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        roundScore = 0;

        current_0_DOM.textContent = '0';
        current_1_DOM.textContent = '0';

        playerActive_0.classList.toggle('player--active');
        playerActive_1.classList.toggle('player--active'); 

        diceDOM.style.display = 'none';
        diceDOM_0.style.display = 'none';
}


document.querySelector('.btn--new').addEventListener('click', init);

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //document.getElementById
    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    current_0_DOM = document.getElementById('current--0');
    current_1_DOM = document.getElementById('current--1'); 

    //document.querySelector - toggle class
    playerActive_0 = document.querySelector('.player--0');
    playerActive_1 = document.querySelector('.player--1');

    diceDOM = document.querySelector('.dice');
    diceDOM_0 = document.querySelector('.dice-0');

    diceDOM.style.display = 'none';
    diceDOM_0.style.display = 'none';

    current_0_DOM.textContent = '0';
    current_1_DOM.textContent = '0';

    document.querySelector('#name--0').textContent = 'Player 1';
    document.querySelector('#name--1').textContent = 'Player 2';

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.target').value = '';
    document.querySelector('.target').style.display = 'block';
} 


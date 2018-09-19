const deck = document.querySelector(".deck");
let cards = [];//opened cards will enter into the list
let moves = 0;//count moves;
let textMoves = document.querySelector('.moves');
const stars = document.querySelectorAll('.stars li');
let time = 0;
let clock = true;
let clockId;  
const popup = document.querySelector('.popup');    
const timer = document.querySelector('.clock');
let matched = 0;
const total = 8;
deck.addEventListener('click', event => {
    const clickTarget = event.target;
    if(clickTarget.classList.contains('card') && cards.length < 2 && !clickTarget.classList.contains('match')){
        toggleCard(clickTarget);
        addCard(clickTarget);
        if(clock) {
            startClock();
            clock = false;
        }
        if(cards.length === 2) {
            matchCard();
            moves++;
            textMoves.innerHTML = moves;//counting moves 1 for two cards flipped together
            hideStar();
        }
        if (matched == 8)
        {
            gameOver();
        }
    }
})
//function to stop clock
function stopClock() {
    clearInterval(clockId);
}
//function to display time
function displayTime()
{
    const minute = Math.floor(time / 60);
    const second = time % 60;
    if (second < 10) 
        timer.innerHTML = `${minute}:0${second}`;
    else 
        timer.innerHTML = `${minute}:${second}`;
}
//function to start clock
function startClock() {
    clockId = setInterval(() => {
        time++;
        displayTime();
    },1000);
}
//function to hide stars
function hideStar() {
    if (moves === 18 || moves === 26){
        for (star of stars) {
            if (star.style.display !== 'none') {
                star.style.display = 'none';
                break;
            }
        }
    }
}
//function to check if cards are matched
function matchCard() {
    if(cards[0].firstElementChild.className === cards[1].firstElementChild.className){
        cards[0].classList.toggle('match');
        cards[1].classList.toggle('match');
        cards = [];
        matched++;
    }else{
        setTimeout(() => {
            toggleCard(cards[0]);
            toggleCard(cards[1]);
            cards = [];
        },500);
    }
}
//fuction to open/close cards
function toggleCard(clickTarget) {
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
}
//fuction to add list of open cards in cards array
function addCard(clickTarget) {
    cards.push(clickTarget);
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//function to display popup
function togglePopup() {
    popup.classList.toggle('hide');
}
//get count of stars
function getStars() {
 let starCount = 0;
 for (star of stars) {
     if(star.style.display !== 'none') {
         starCount++;
     }
 }   
 return starCount;
}
//function to display text on popup
function writePopup() {
    const timePopup = document.querySelector('.popup-time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesPopup = document.querySelector('.popup-moves');
    const starsPopup = document.querySelector('.popup-stars');
    const count = getStars();
    timePopup.innerHTML = `Time = ${clockTime}`;
    movesPopup.innerHTML = `Moves = ${moves}`;
    starsPopup.innerHTML = `Stars = ${count}`;
}
//set moves to zero
function resetMoves() {
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}
//set stars to three
function resetStars() {
    starCount = 0;
    for (star of stars) {
        star.style.display = 'inline';
    }
    star
}
document.querySelector('.popup-cancel').addEventListener('click', togglePopup);
document.querySelector('.popup-replay').addEventListener('click', replayGame);
//When game finishes
function gameOver() {
    stopClock();
    togglePopup();
    writePopup();
}
//to replay game
function replayGame() {
    togglePopup();
    restartGame();
}
//reset and shuffle cards by calling shuffle function
function resetCards() {
    let deckCards = document.querySelectorAll('ul.deck li');
    deck.innerHTML = "";
    var shuffledCard = shuffle(Array.from(deckCards)); //shuffles the cards for new Game
    for (newCard of shuffledCard)
    {
        newCard.className = "card";
        deck.appendChild(newCard); //updates shuffled cards to DOM
    }
}
//restart game
function restartGame() {
    stopClock();
    clockOff = true;
    time = 0;
    matched = 0;
    displayTime();
    resetMoves();
    resetStars();
    startClock();
    resetCards();
}
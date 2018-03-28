/*----- constants -----*/
class Card {
    constructor(face, value) {
      this.face = face;
      this.value = value;
    }
  }
  var deck = [];
  deck = deck.map(card => card.face = card.suit.toLowerCase() + card.face)
  var suits = ['c', 's', 'd', 'h'];
  var faces = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
  suits.forEach(function(suit) {
    faces.forEach(function(face){
      var val = parseInt(face);
      if (isNaN(val)) {
        val = face === 'A' ? 11 : 10;
      }
      deck.push(new Card(suit + face, val));
    });
  }); 

/*----- app's state (variables) -----*/
var deck, inProgress, bankroll, bet;
var dealerHand = [];
var playerHand = [];
var winner, blackjack;
var instruction = null;
var winPopup = document.getElementById('win-popup');

/*----- cached element references -----*/
var cash = document.getElementById('cash');
var wager = document.getElementById('bet');
var betBtns = document.getElementById('option2');
var dealBtn = document.getElementById('deal');
var doublelBtn = document.getElementById('double');
var dealerCardsEl= document.getElementById('dealer-cards')
var playerCardsEl= document.getElementById('player-cards')
var winPopup = document.getElementById('win-popup');
var hitBtn = document.getElementById('hit');
var stayBtn = document.getElementById('stay');


//need to work on this to disable//fade betting buttons
                                      //var btn = document.getElementsByClassName("betting"); btn.disabled = false; 


/*----- event listeners -----*/
document.getElementById('option2').addEventListener('click', betting);
dealBtn.addEventListener('click', deal);
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stay').addEventListener('click', stay);
doublelBtn.addEventListener('click', double);
document.getElementById('reset').addEventListener('click', initialize);


/*----- functions -----*/
initialize();

function betting(evt) {
  if (evt.target.classList[0] === "betting") {
    dealerHand = [];
    playerHand = [];
    let placeBet = parseInt(evt.target.classList[1]);
    if (placeBet <= bankroll && ((bankroll + placeBet) >= 0) && ((bet + placeBet) >= 0)) {
      bankroll -= placeBet;
      bet += placeBet;
    }
  }
  render();
}

function shuffle() {
  var shuffledDeck = [];
  while (deck.length) {
    var rnd = Math.floor(Math.random() * deck.length);
    shuffledDeck.push(deck.splice(rnd, 1)[0]);
  }
  deck = shuffledDeck;
}

function deal() {
  inProgress = true;
  winner = null;
  blackjack = null;
  canWager = false;
  shuffle();
  playerHand.push(...deck.splice(deck.length-2, 2));
  dealerHand.push(...deck.splice(deck.length-2, 2));
  var playerTotal = computeHand(playerHand);
  var dealerTotal = computeHand(dealerHand);
  if (dealerTotal === 21 && playerTotal === 21) {
    blackjack = "t";
  } else if (dealerTotal === 21) {
    blackjack = "d";
  } else if (playerTotal === 21) {
    blackjack = "p";
  }
  inProgress = !blackjack;  
  updateWinner();
  render();
}

function updateWinner() {
  if (blackjack) {
    winner = blackjack;
  } else if (!inProgress) {
    var playerTotal = computeHand(playerHand);
    var dealerTotal = computeHand(dealerHand);
    if (playerTotal > dealerTotal) {
      winner = 'p';
    } else if (dealerTotal > playerTotal) {
      winner = 'd';
    } else {
      winner = 't';
    }
  }
  if (winner) computeWinnings();
}

function computeWinnings() {
  // use blackjack and/or winner vars to compute
  if (winner === 't') {
    bankroll += bet;
  } else if (blackjack === 'p') {
    bankroll += Math.floor(bet * 1.5 + .5) + bet;
  } else if (winner === 'p') {
    bankroll += bet * 2;
  }
  bet = 0;
}

function hit(evt) {
  playerHand.push(deck.pop());
  if (computeHand(playerHand) > 21) {
    inProgress = false;
    updateWinner();
  }
  render();
};

function stay() {
  inProgress = false;
  dealerDraw();
  updateWinner();
  render(); 
}

function dealerDraw() {
  while(computeHand(dealerHand) < 17 || computeHand(dealerHand) > 21) {
    dealerHand.push(deck.pop()); 
  }
}

function double(evt) {
  playerHand.push(deck.pop());
  bet *= 2
  inProgress = false;
  dealerDraw();
  updateWinner();
  render();
}

function computeHand(hand) { 
  var total = 0;
  var numAces = 0;
  hand.forEach(c => {
    total += c.value;
    numAces += c.value === 11 ? 1 : 0;
  });
  while (total > 21 && numAces) {
    total -= 10;
    numAces--;
  }
  return total;
}

function render() {
  var playerHtml = '';
  var dealerHtml = '';
  dealerHand.forEach(function(card, idx) {
    dealerHtml += `<div class="card ${idx || !inProgress ? card.face : 'back'}"></div>`;
  });
  playerHand.forEach(function(card, idx) {
    playerHtml += `<div class="card ${card.face}"></div>`;
  });
  dealerCardsEl.innerHTML = dealerHtml;
  playerCardsEl.innerHTML = playerHtml;
  cash.innerHTML= `Bankroll: $${bankroll}.00`;
  wager.innerHTML= `Bet: $${bet}.00`;
  betBtns.style.visibility = inProgress ? 'hidden' : 'visible';
  dealBtn.style.visibility = inProgress || bet === 0 ? 'hidden' : 'visible';
  doublelBtn.style.visibility = inProgress && playerHand.length === 2 && bankroll >= bet ? 'visible' : 'hidden';
  hitBtn.style.visibility = !inProgress ? 'hidden' : 'visible';
  stayBtn.style.visibility = !inProgress ? 'hidden' : 'visible';
  //playBtn.style.visibility = inProgress ? 'hidden' : 'visible';

  if (winner) {
    t = winPopup.innerHTML='PUSH!';
    p = winPopup.innerHTML='Winner Winner Chicken Dinner';
    d = winPopup.innerHTML='';
  }
}

function initialize() {
  bankroll = 200;
  bet = 0;
  instructions = null;
  render();
}



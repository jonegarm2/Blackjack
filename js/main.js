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
  // console.log(deck);
  /*----- constants -----*/

/*----- app's state (variables) -----*/
var deck, bankroll, bet;
var dealerHand = [];
var playerHand = [];
var playSum = 0
var dealSum = 0
var canWager = true

/*----- cached element references -----*/
var cash = document.getElementById('cash');
var wager = document.getElementById('bet');
var dealerCardsEl= document.getElementById('dealer-cards')
var playerCardsEl= document.getElementById('player-cards')

//var gameplay = document.querySelector('.gameplay')
/*----- event listeners -----*/
document.getElementById('option2').addEventListener('click', betting);
document.getElementById('deal').addEventListener('click', deal);
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stay').addEventListener('click', stay);
document.getElementById('double').addEventListener('click', double);

/*----- functions -----*/
function betting(evt) {

  if (!canWager) {
    return;
  }

  if (event.target.classList[0] === "betting") {
    let placeBet = parseInt(evt.target.classList[1]);
    if (placeBet > bankroll) {
        return;
    } else if (bankroll > 0) {
        bankroll -= placeBet;
        bet += placeBet;
    }
    if (bankroll === 0) msg = 'You lost it all!'
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
  canWager = false;
  
    

            //create dealer and player blackjack variables
    //fade button after deal to prevent problems

    // if(dealerBlackjack && !playerBlackjack) {
    //   return ('You lost!');
    //   break;
    // } else if(dealerBlackjack && playerBlackjack) {
    //   return ('Draw!');
    //   break;
    // } else if (!dealerBlackjack && playerBlackjack) {
    //   return ('You Won!')
    // };
  
  shuffle();
  playerHand.push(...deck.splice(deck.length-2, 2));
  dealerHand.push(...deck.splice(deck.length-2, 2));
  document.getElementById('deal').removeEventListener('click', deal);
  if (playSum === 21) return true;

  render();
}


function hit(evt) {
  playerHand.push(deck.pop(deck.length-1));
  //add card from deck 
  playerHand.forEach(function (card) {
    playSum += card.value;
    
  });
  render();
  if(playSum > 21); {
    document.getElementById('hit').removeEventListener('click', hit);
    return false;
    //check winner
  }
      //if bust show lose screen
  //if no bust then contineu
      //fade double button 
};

function stay(evt) {
  //return and check for win/loss logic
  //game logic look for winner
  //flip over dealer face card

  if(dealSum <= 17) {
    return deck.pop[dealerHand.unshift()]; 
  } else if(dealer > 21) {
    return 'You Won!'
  }else if(dealerHand === playerHand) {
    return 'Draw'
  } else if(dealerHand < playerHand) {
    return 'You Won!'
  } else if(dealerHand > playerHand) {
    return 'You lost!'
  };
  render(); 
    // if()
    return//return to betting screen now 
  };

function double(evt) {
  playerHand.push(deck.pop(deck.length-1));
  //double the bet
  document.getElementById('double').removeEventListener('click', double);
  document.getElementById('hit').removeEventListener('click', hit);
  document.getElementById('stay').removeEventListener('click', stay);
  if(playSum > 21) return false;
  render();
}














  function render() {
    var playerHtml= '';
    var dealerHtml= '';
    dealerHand.forEach(function(card, idx) {
      dealerHtml += `<div class="card ${idx ? card.face : 'back'}"></div>`;
    });
    playerHand.forEach(function(card, idx) {
      playerHtml += `<div class="card ${card.face}"></div>`;
    });

    // Write code to take bet and bankroll and add to DOM

    
    dealerCardsEl.innerHTML = dealerHtml;
    playerCardsEl.innerHTML = playerHtml;
    //need this for player but all face up as well
    //check 
    cash.innerHTML= `$${bankroll}.00`;
    wager.innerHTML= `$${bet}.00`;

  }









function initialize() {
    
    bankroll = 200;
    bet = 0
    render();
    
}
initialize();
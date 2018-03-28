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
  // console.log(deck);

/*----- app's state (variables) -----*/
var deck, bankroll, bet;
var dealerHand = [];
var playerHand = [];
var playSum = 0
var dealSum = 0
var canWager = true
var winPopup = document.getElementById('win-popup');

/*----- cached element references -----*/
var cash = document.getElementById('cash');
var wager = document.getElementById('bet');
var dealerCardsEl= document.getElementById('dealer-cards')
var playerCardsEl= document.getElementById('player-cards')


//need to work on this to disable//fade betting buttons
var btn = document.getElementsByClassName("betting"); btn.disabled = false; 


/*----- event listeners -----*/
document.getElementById('option2').addEventListener('click', betting);
document.getElementById('deal').addEventListener('click', deal);
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stay').addEventListener('click', stay);
document.getElementById('double').addEventListener('click', double);
document.getElementById('reset').addEventListener('click', initialize);

/*----- functions -----*/
initialize();

function betting(evt) {

  if (!canWager) {
    return;
  }
  //need to prevent negative bet
  if (event.target.classList[0] === "betting") {
    let placeBet = parseInt(evt.target.classList[1]);
    if (placeBet > bankroll) {


        btn.disable = !false;


        //check this class system
    } else if (bankroll = 0) {
        bankroll -= placeBet;
        bet += placeBet;
    }
    if (bankroll === 0) {
      
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
  canWager = false;
  shuffle();
  playerHand.push(...deck.splice(deck.length-2, 2));
  dealerHand.push(...deck.splice(deck.length-2, 2));
  document.getElementById('deal').removeEventListener('click', deal);
  if (playSum === 21) {



    // make this work
    //double check this function 
    return winPopup.classList.add('popup');
  }
  
  render();
}
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
  
////////
//hit can still be pushed before deal fix that
////////


function hit(evt) {
  playerHand.push(deck.pop(deck.length-1));
  playerHand.forEach(function (card) {
    playSum += card.value;
    render();
    document.getElementById('double').removeEventListener('click', double);
    });
      if(playSum > 21); {
        return false;
    //check winner
    //why doesn't this work
  }
      //if bust show lose screen
  //if no bust then contineu
      //fade double button 
};

function stay(evt) {
  document.getElementById('deal').removeEventListener('click', deal)
  document.getElementById('hit').removeEventListener('click', hit)
  document.getElementById('double').removeEventListener('click', double)
  computeHand();
  if(dealSum <= 17) {
    return deck.pop[dealerHand.unshift()]; 
  } else if(dealer > 21) {
    return 
  }else if(dealerHand === playerHand) {
    return 
  } else if(dealerHand < playerHand) {
    return 
  } else if(dealerHand > playerHand) {
    return 
  };

  //check for winner function
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

  //check for winner

  render();
}


/////////
//  WHERE DOES THIS GO?
////////
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


 ///////////////

 ///////////////














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
    
    //why no bankroll??????
    cash.innerHTML= `$${bankroll}.00`;
    wager.innerHTML= `$${bet}.00`;



  }









function initialize() {
    
    bankroll = 200;
    bet = 0
    render();
    
}

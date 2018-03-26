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
  
  console.log(deck);


  /*----- constants -----*/
  



/*----- app's state (variables) -----*/
var deck, bankroll, bet, dealerHand, playerHand, gameOn;


//Need to adjust for the player card





/*----- cached element references -----*/

var dealerCardsEl= document.getElementById('dealer-cards')
var playerCardsEl= document.getElementById('player-cards')
var gameplay = document.querySelector('.gameplay')






/*----- event listeners -----*/
//click for deal
//click for betting
//click for hit/stand/double
document.getElementById('option2').addEventListener('click', betting);
document.getElementById('option1').addEventListener('click', gameplay);




/*----- functions -----*/
// can 4 buttons be connected to 1 listener
function betting(evt) {
  let placeBet = parseInt(evt.target.classList[1]);
  console.log(placeBet);

  if (placeBet > bankroll) {
      return;
  } else if (bankroll > 0) {
      bankroll = (bankroll -= placeBet);
      bet = (bet += placeBet);
  }

  if (bankroll === 0) msg = 'You lost it all!'
}

  function gameplay(evt) {
    //let button deal with the gameplay buttons

    // shuffle();
    //if (deal is clicked)
    //    return deal/shuffle function
    //else disable button until end of hand
    //if hit add another card to the player-cards
    //render afterwards
  }

function shuffle() {
  var shuffledDeck = [];
  while (deck.length) {
      var rnd = Math.floor(Math.random() * deck.length);
      shuffledDeck.push(deck.splice(rnd, 1)[0]);
  }
  deck = shuffledDeck;
}

  function render() {
    var playerHtml= '';
    var dealerHtml= '';
    dealerHand.forEach(function(card, idx) {
      dealerHtml += `<div class="card ${idx ? card.face : 'back'}"></div>`;
    });
    playerHand.forEach(function(card, idx) {
      playerHtml += `<div class="card ${card.face}</div>`;
    });
    dealerCardsEl.innerHTML = dealerHtml;
    //need this for player but all face up as well
    //check for winner
  }

//shuffle function
function initialize() {
    bankroll = '$200.00'
}
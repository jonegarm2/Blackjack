class Card {
    constructor(suit, face, value) {
      this.suit = suit;
      this.face = face;
      this.value = value;
    }
  }
  
  var deck = [];
  
  var suits = ['C', 'S', 'D', 'H'];
  var faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  
  suits.forEach(function(suit) {
    faces.forEach(function(face){
      var val = parseInt(face);
      if (isNaN(val)) {
        val = face === 'A' ? 11 : 10;
      }
      deck.push(new Card(suit, face, val));
    });
  });
  
  console.log(deck);


  /*----- constants -----*/



/*----- app's state (variables) -----*/



/*----- cached element references -----*/





/*----- event listeners -----*/





/*----- functions -----*/
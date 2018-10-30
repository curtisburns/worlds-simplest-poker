// Construct a deck;
// Shuffle the deck;
// Deal cards while also removing them from the deck;
// Add an option to configure how many players and cards dealt;
// Total up the players hand and declare the winner(s);



const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// This class builds the deck, dealt and totalled are intialised as false to be
// used later
class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
    this.dealt = false;
    this.totalled = false;
  }
}

//This constructs a deck when a game starts
function constructDeck() {
  const deck = [];
  suits.forEach(suit => {
    values.forEach(value => {
      const inNewCard = new Card(suit,value);
      deck.push(inNewCard);
    });
  });
  console.log(deck);
}

constructDeck();

window.onload = () => {


};

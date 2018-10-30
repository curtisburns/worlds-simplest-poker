// Construct a deck;
// Shuffle the deck;
// Deal cards while also removing them from the deck;
// Add an option to configure how many players and cards dealt;
// Total up the players hand and declare the winner(s);

////////////////////////////////////////////////////////////////

// Global
const deck = [];
const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

// Initialised at 2 players
const handSizeOptions = [];
const playerNumberOptions = [1, 2];

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
  suits.forEach(suit => {
    values.forEach(value => {
      const inNewCard = new Card(suit, value);
      deck.push(inNewCard);
    });
  });
}

// Creates and shuffles deck - fisher-yates shuffle
function shuffleDeck() {
  constructDeck();

  // Must decrement in order to maximise shuffle
  const deckSize = deck.length;
  for ( let i = deckSize-1; i >= 0; i-- ) {
    const randomIndex = Math.floor(Math.random() * deckSize);
    const temp = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = temp;
  }
}

shuffleDeck();

// Choose number of players
function choosePlayers({target: { innerHTML }}) {
  console.log(innerHTML);
}

// How many cards dealt needs to be determined by number of players and vice
// versa


function calculateSizeOfHand() {
  const maxNumberOfPlayers = Math.max(...playerNumberOptions);
  const maxHandSize = deck.length/maxNumberOfPlayers;
  // Determines hand size options
  for ( let i = 1; i <= maxHandSize; i++ ) {
    handSizeOptions.push(i);
  }
}

calculateSizeOfHand();

function calculateNumberOfPlayers() {
  const maxHandSize = Math.max(...handSizeOptions);
  const maxNumberOfPlayers = deck.length/maxHandSize;
  for ( let i = 1; i <= maxHandSize; i++ ) {
    playerNumberOptions.push(i);
  }
  console.log(maxNumberOfPlayers);
}

calculateNumberOfPlayers();

window.onload = () => {
  const choosePlayersButtons = document.getElementsByClassName('choosePlayers');

  for (let i = 0; i < choosePlayersButtons.length; i++) {
    choosePlayersButtons[i].addEventListener('click', choosePlayers);
  }
};

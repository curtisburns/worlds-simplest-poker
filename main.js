// Construct a deck;
// Shuffle the deck;
// Deal cards while also removing them from the deck;
// Add an option to configure how many players and cards dealt;
// Total up the players hand and declare the winner(s);

////////////////////////////////////////////////////////////////
window.onload = () => {
  //DOM
  const numberOfPlayersDOM = document.getElementsByClassName('number-of-players')[0];
  const sizeOfHandDOM = document.getElementsByClassName('size-of-hand')[0];
  const upArrow1 = document.getElementsByClassName('up-arrow-1')[0];
  const downArrow1 = document.getElementsByClassName('down-arrow-1')[0];
  const upArrow2 = document.getElementsByClassName('up-arrow-2')[0];
  const downArrow2 = document.getElementsByClassName('down-arrow-2')[0];

  // Global
  const deck = [];
  const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];



  // Initialised at 2 players
  let handSizeOptions = [];
  let playerNumberOptions = [1, 2];
  const currentPlayerChoice = {number: playerNumberOptions[1]};
  const currentHandSizeChoice = {number: 6};

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

  // Player setup
  class Player {
    constructor() {
      this.hand = [];
    }
  }

  // Initialise deck

  shuffleDeck();
  calculateSizeOfHand();
  calculateNumberOfPlayers();
  updateDOMOptions();

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

  // How many cards dealt needs to be determined by number of players and vice
  // versa
  function calculateSizeOfHand() {
    handSizeOptions = [];
    const maxHandSize = Math.floor(deck.length/currentPlayerChoice.number);
    // Determines hand size options
    for ( let i = 1; i <= maxHandSize; i++ ) {
      handSizeOptions[i-1] = i;
    }
  }

  function calculateNumberOfPlayers() {
    playerNumberOptions = [];
    const maxNumberOfPlayers = Math.floor(deck.length/currentHandSizeChoice.number);
    // Determines player number options
    for ( let i = 1; i <= maxNumberOfPlayers; i++ ) {
      playerNumberOptions[i-1] = i;
    }
  }

  function updateDOMOptions() {
    numberOfPlayersDOM.textContent = currentPlayerChoice.number;
    sizeOfHandDOM.textContent = currentHandSizeChoice.number;
  }




  upArrow1.addEventListener('click', assignPlayerNumberSelect('up'));
  downArrow1.addEventListener('click', assignPlayerNumberSelect('down'));
  upArrow2.addEventListener('click', assignHandSizeSelect('up'));
  downArrow2.addEventListener('click', assignHandSizeSelect('down'));

  function assignPlayerNumberSelect(direction) {
    if (direction === 'up') {
      return function increasePlayerNumber() {

        calculateNumberOfPlayers();
        calculateSizeOfHand();

        const index = playerNumberOptions.indexOf(currentPlayerChoice.number) + 1;
        // If the index calculated is higher than possible, send to beginning.
        // Otherwise continue to increase;
        currentPlayerChoice.number = index > playerNumberOptions.length-1 ? playerNumberOptions[0] : playerNumberOptions[index];

        updateDOMOptions();
      };
    }
    if (direction === 'down') {
      return function decreasePlayerOption() {

        calculateNumberOfPlayers();
        calculateSizeOfHand();

        const index = playerNumberOptions.indexOf(currentPlayerChoice.number) - 1;
        // If the index calculated is lower than possible, send to end.
        // Otherwise continue to decrease;
        currentPlayerChoice.number = index < 0 ? playerNumberOptions[playerNumberOptions.length-1] : playerNumberOptions[index];

        updateDOMOptions();
      };
    }
  }

  function assignHandSizeSelect(direction) {
    if (direction === 'up') {
      return function increasePlayerNumber() {

        calculateSizeOfHand();
        calculateNumberOfPlayers();

        const index = handSizeOptions.indexOf(currentHandSizeChoice.number) + 1;
        // If the index calculated is higher than possible, send to beginning.
        // Otherwise continue to increase;
        currentHandSizeChoice.number = index > handSizeOptions.length-1 ? handSizeOptions[0] : handSizeOptions[index];

        updateDOMOptions();
      };
    }
    if (direction === 'down') {
      return function decreasePlayerOption() {

        calculateSizeOfHand();
        calculateNumberOfPlayers();

        const index = handSizeOptions.indexOf(currentHandSizeChoice.number) - 1;
        // If the index calculated is lower than possible, send to end.
        // Otherwise continue to decrease;
        currentHandSizeChoice.number = index < 0 ? handSizeOptions[handSizeOptions.length-1] : handSizeOptions[index];

        updateDOMOptions();
      };
    }
  }


};

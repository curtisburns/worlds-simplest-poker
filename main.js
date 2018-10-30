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
  const handSizeOptions = [];
  const playerNumberOptions = [1, 2];
  const currentPlayerChoice = {number: playerNumberOptions[1]};

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

  // initialise deck

  shuffleDeck();
  calculateSizeOfHand();
  calculateNumberOfPlayers();
  console.log(handSizeOptions);
  const currentHandSizeChoice = {number: handSizeOptions[5]};


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
    const maxNumberOfPlayers = Math.max(...playerNumberOptions);
    const maxHandSize = deck.length/maxNumberOfPlayers;
    // Determines hand size options
    for ( let i = 1; i <= maxHandSize; i++ ) {
      handSizeOptions.push(i);
    }
  }



  function calculateNumberOfPlayers() {
    const maxHandSize = Math.max(...handSizeOptions);
    const maxNumberOfPlayers = deck.length/maxHandSize;
    // Determines player number options
    for ( let i = 1; i <= maxNumberOfPlayers; i++ ) {
      playerNumberOptions.push(i);
    }
  }

  numberOfPlayersDOM.textContent = currentPlayerChoice.number;
  sizeOfHandDOM.textContent = currentHandSizeChoice.number;
  upArrow1.addEventListener('click', assignArrowFunction(currentPlayerChoice, playerNumberOptions, 'up'));
  downArrow1.addEventListener('click', assignArrowFunction(currentPlayerChoice, playerNumberOptions, 'down'));
  upArrow2.addEventListener('click', assignArrowFunction(currentHandSizeChoice, handSizeOptions, 'up'));
  downArrow2.addEventListener('click', assignArrowFunction(currentHandSizeChoice, handSizeOptions, 'down'));




  // this needs to be a reusable function to cycle through options;
  function assignArrowFunction(currentVal, option, direction) {
    if (direction === 'up') {
      return function increaseOption() {
        const index = option.indexOf(currentVal.number) + 1;
        // If the index calculated is higher than possible, send to beginning.
        // Otherwise continue to increase;
        currentVal.number = index > option.length-1 ? option[0] : option[index];
        console.log('hey', currentVal);
      };
    }
    if (direction === 'down') {
      console.log('hoooo', option);
      return function decreaseOption() {
        const index = option.indexOf(currentVal.number) - 1;
        // If the index calculated is lower than possible, send to end.
        // Otherwise continue to decrease;
        currentVal.number = index < 0 ? option[option.length-1] : option[index];
      };
    }
  }



};

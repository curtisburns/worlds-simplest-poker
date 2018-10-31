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
  const playGameButton = document.getElementsByClassName('play-game')[0];

  // Global
  const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let deck = [];
  let players = [];



  // Initialised at 2 players
  let handSizeOptions = [];
  let playerNumberOptions = [1, 2];
  let currentPlayerChoice = playerNumberOptions[1];
  let currentHandSizeChoice = 6;

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
      this.points = 0;
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
    const maxHandSize = Math.floor(deck.length/currentPlayerChoice);
    // Determines hand size options
    for ( let i = 1; i <= maxHandSize; i++ ) {
      handSizeOptions[i-1] = i;
    }
  }

  function calculateNumberOfPlayers() {
    playerNumberOptions = [];
    const maxNumberOfPlayers = Math.floor(deck.length/currentHandSizeChoice);
    // Determines player number options
    for ( let i = 1; i <= maxNumberOfPlayers; i++ ) {
      playerNumberOptions[i-1] = i;
    }
  }

  function updateDOMOptions() {
    numberOfPlayersDOM.textContent = currentPlayerChoice;
    sizeOfHandDOM.textContent = currentHandSizeChoice;
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

        const index = playerNumberOptions.indexOf(currentPlayerChoice) + 1;
        // If the index calculated is higher than possible, send to beginning.
        // Otherwise continue to increase;
        currentPlayerChoice = index > playerNumberOptions.length-1 ? playerNumberOptions[0] : playerNumberOptions[index];

        updateDOMOptions();
      };
    }
    if (direction === 'down') {
      return function decreasePlayerOption() {

        calculateNumberOfPlayers();
        calculateSizeOfHand();

        const index = playerNumberOptions.indexOf(currentPlayerChoice) - 1;
        // If the index calculated is lower than possible, send to end.
        // Otherwise continue to decrease;
        currentPlayerChoice = index < 0 ? playerNumberOptions[playerNumberOptions.length-1] : playerNumberOptions[index];

        updateDOMOptions();
      };
    }
  }

  function assignHandSizeSelect(direction) {
    if (direction === 'up') {
      return function increasePlayerNumber() {

        calculateSizeOfHand();
        calculateNumberOfPlayers();

        const index = handSizeOptions.indexOf(currentHandSizeChoice) + 1;
        // If the index calculated is higher than possible, send to beginning.
        // Otherwise continue to increase;
        currentHandSizeChoice = index > handSizeOptions.length-1 ? handSizeOptions[0] : handSizeOptions[index];

        updateDOMOptions();
      };
    }
    if (direction === 'down') {
      return function decreasePlayerOption() {

        calculateSizeOfHand();
        calculateNumberOfPlayers();

        const index = handSizeOptions.indexOf(currentHandSizeChoice) - 1;
        // If the index calculated is lower than possible, send to end.
        // Otherwise continue to decrease;
        currentHandSizeChoice = index < 0 ? handSizeOptions[handSizeOptions.length-1] : handSizeOptions[index];

        updateDOMOptions();
      };
    }
  }

  ////////////////// START GAME ///////////////////
  function dealCards() {
    createPlayers();
    let card = 0;
    for ( let i = 0; i < currentHandSizeChoice; i++ ) {
      for( let j = 0; j < players.length; j++ ) {
        players[j].hand.push(deck[card]);
        deck[card].dealt = true;
        card++;
      }
    }
    console.log('players', players);
    deck = deck.filter(card => card.dealt !== true );
    console.log('deck', deck);
  }

  function createPlayers() {
    players = [];
    console.log(currentPlayerChoice);
    for ( let i = 0; i < currentPlayerChoice; i++) {
      const newPlayer = new Player();
      players.push(newPlayer);
    }
  }

  dealCards();

  function determineWinner() {
    const result = {
      player: [],
      score: 0
    };
    players.reduce((acc, player, index) => {

      if (totalHand(player) > result.score) {
        acc.score = totalHand(player);
        acc.player = [index+1];
        return acc;
      }

      if (totalHand(player) === result.score) {
        acc.player.push(index+1);
      }
    }, result);
    console.log(result.player.length);
    if (result.player.length > 1) {
      console.log('Drawer', result.player.join('player '), result.score);
    } else {
      console.log('Winner!', result.player);
    }
  }

  function totalHand(player) {
    return player.hand.reduce((acc, card) => {
      card.totalled = true;
      const total = acc + card.value;
      return total;
    }, 0);
  }

  determineWinner();

  playGameButton.addEventListener('click', shuffleDeck);
  shuffleDeck();
};

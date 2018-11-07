// Construct a deck;
// Shuffle the deck;
// Deal cards while also removing them from the deck;
// Add an option to configure how many players and cards dealt;
// Total up the players hand and declare the winner(s);

////////////////////////////////////////////////////////////////
window.onload = () => {
  // DOM
  const numberOfPlayersDOM = document.getElementsByClassName('number-of-players')[0];
  const sizeOfHandDOM = document.getElementsByClassName('size-of-hand')[0];
  const upArrow1 = document.getElementsByClassName('up-arrow-1')[0];
  const downArrow1 = document.getElementsByClassName('down-arrow-1')[0];
  const upArrow2 = document.getElementsByClassName('up-arrow-2')[0];
  const downArrow2 = document.getElementsByClassName('down-arrow-2')[0];
  const dealCardsButton = document.getElementsByClassName('deal-cards')[0];
  const game = document.getElementsByClassName('game')[0];
  const scoreboard = document.getElementsByClassName('scoreboard')[0];
  const scoreboardList = document.getElementsByClassName('scoreboard-list')[0];
  const options = document.getElementsByClassName('options')[0];

  // 'let' as these are removed and recreated when the functions are invoked;
  let startGameContainer, startGameButton, instructionsContainer, instructionsButton;

  // Reusable function for removing the modals;
  function removeModal(element) {

    //Add and remove classes for transition out;
    element.classList.remove('modalEnter');
    element.classList.add('modalLeave');

    // Remove from page so as to not pollute when not in use
    setTimeout(function() {
      element.parentNode.removeChild(element);
      element = null;
    }, 1000);
  }

  // This creates the startGame Modal;
  function createStartGameEl() {
    startGameContainer = document.createElement('div');
    startGameContainer.setAttribute('class', 'startGame');
    startGameContainer.innerHTML = '<p>Welcome to The World\'s Simplest Poker Game!</p>';
    game.appendChild(startGameContainer);

    startGameButton =  document.createElement('button');
    startGameButton.textContent = 'Start game';
    startGameContainer.appendChild(startGameButton);

    // Add event listener to create next modal - Instructions;
    startGameButton.addEventListener('click', createInstructionsEl);

    // Add class for transition in;
    setTimeout( function() {
      startGameContainer.classList.add('modalEnter');
    },100);
  }

  // Essentially the startGame modal except is invoked when first game is finished;
  function createPlayAgainEl(text) {
    startGameContainer = document.createElement('div');
    startGameContainer.setAttribute('class', 'startGame');
    startGameContainer.innerHTML = `${text}
    <p>Would you like to play again?</p>`;
    game.appendChild(startGameContainer);

    startGameButton =  document.createElement('button');
    startGameButton.textContent = 'Play again!';
    startGameContainer.appendChild(startGameButton);
    startGameButton.addEventListener('click', createInstructionsEl);

    // Add class for transition in;
    setTimeout( function() {
      startGameContainer.classList.add('modalEnter');
    },100);
  }

  // This creates the Instructions modal;
  function createInstructionsEl() {

    // Remove previous modal;
    removeModal(startGameContainer);

      instructionsContainer= document.createElement('div');
      instructionsContainer.setAttribute('class', 'instructions');
      instructionsContainer.innerHTML = `
      <p>The player with the hand with the highest total wins.</p>
      <p>Bonus points:</p>
      <p>Four of a kind: +30</p>
      <p>Three of a kind: +20</p>
      <p> Pair: +10</p>
      <p> Good luck!</p>`;
      game.appendChild(instructionsContainer);

      instructionsButton = document.createElement('button');
      instructionsButton.textContent = 'Let\'s play!';
      instructionsButton.addEventListener('click', prepareGame);
      instructionsContainer.appendChild(instructionsButton);

      // Add class for transition in;
      setTimeout( function() {
        instructionsContainer.classList.add('modalEnter');
      },100);
  }

  // Reusable function for showing elements;
  function showEl(element) {
    element.classList.remove('hide');

    // setTimeout added so as to let the transition take effect;
    setTimeout( function() {
      element.classList.add('show');
    }, 50);
    
  }

  // Reusable function for showing elements;
  function hideEl(element) {
    element.classList.remove('show');

      // setTimeout added so as to let the transition take effect;
    setTimeout(function() {
      element.classList.add('hide');
    }, 1000);
  }

  // Initiates game and shows configuration;
  function prepareGame() {

    // If this is the next game, clear the table;
    if(currentGame) {
      currentGame.clearTable();
    }
    
    // currentGame is assigned or reassigned;
    currentGame = new Game(6, 2);
    currentGame.shuffleDeck();
    currentGame.updateDOMOptions()

    removeModal(instructionsContainer)
    showEl(scoreboard);
    showEl(options);
  }

  

  

  // Global
  const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let currentGame;

  // Most of the games functionality is defined here;
  class Game {
    constructor(sizeOfHand, numberOfPlayers) {
      this.sizeOfHand = sizeOfHand;
      this.numberOfPlayers = numberOfPlayers;
      this.handSizeOptions = [];
      this.playerNumberOptions = [1, 2];
      this.deck = this.constructDeck();
      this.players = [];
      upArrow1.addEventListener('click', this.increasePlayerNumber);
      downArrow1.addEventListener('click', this.decreasePlayerNumber);
      upArrow2.addEventListener('click', this.increaseHandSize);
      downArrow2.addEventListener('click', this.decreaseHandSize);
      dealCardsButton.addEventListener('click', this.dealCards);
    }


    // For each suit and for each value as declared above, a card is added to the deck and positioned accordingly;
    constructDeck() {
      let xPos = 50;
      let yPos = 30;
      const deck = [];
      suits.forEach(suit => {
        values.forEach(value => {
          const inNewCard = new Card(suit, value, xPos, yPos);
          deck.push(inNewCard);
          yPos -= .05;
        });
      });
      return deck;
    }
    

    shuffleDeck() {
      // Must decrement in order to maximise shuffle
      const deck = this.deck;
      const deckSize = this.deck.length;
      for ( let i = deckSize-1; i >= 0; i-- ) {
        const randomIndex = Math.floor(Math.random() * deckSize);
        const temp = deck[i];
        deck[i] = deck[randomIndex];
        deck[randomIndex] = temp;
      }
    }

    // These are invoked to calculate the possible options based on the number of players or size of hand;

    calculateSizeOfHand() {
      this.handSizeOptions = [];
      const maxHandSize = Math.floor(this.deck.length/this.numberOfPlayers);
      
      // Determines hand size options;
      for ( let i = 0; i < maxHandSize; i++ ) {
        // i+1 because we cannot have 0 cards or players;
        this.handSizeOptions[i] = i+1;
      }
    }
  
    calculateNumberOfPlayers() {
      this.playerNumberOptions = [];
      const maxNumberOfPlayers = Math.floor(this.deck.length/this.sizeOfHand);

      // Determines player number options;
      for ( let i = 0; i < maxNumberOfPlayers; i++ ) {
        // i+1 because we cannot have 0 cards or players;
        this.playerNumberOptions[i] = i+1;
      }
    }
  
    // Each time the user changes the options, we need to update the DOM. We also recalculate the possible options;
    updateDOMOptions() {
      this.calculateNumberOfPlayers();
      this.calculateSizeOfHand();
      numberOfPlayersDOM.textContent = this.numberOfPlayers;
      sizeOfHandDOM.textContent = this.sizeOfHand;
    }

    
    increasePlayerNumber() {      
      let playerNumberOptions = currentGame.playerNumberOptions;
      const index = playerNumberOptions.indexOf(currentGame.numberOfPlayers) + 1;

      // If the index calculated is higher than possible, send to beginning;
      // Otherwise continue to increase;
      currentGame.numberOfPlayers = index > playerNumberOptions.length-1 ? playerNumberOptions[0] : playerNumberOptions[index];

      currentGame.updateDOMOptions();
    }

    decreasePlayerNumber() {
      let playerNumberOptions = currentGame.playerNumberOptions;
      const index = playerNumberOptions.indexOf(currentGame.numberOfPlayers) - 1;

      // If the index calculated is lower than possible, send to end;
      // Otherwise continue to decrease;
      currentGame.numberOfPlayers = index < 0 ? playerNumberOptions[playerNumberOptions.length-1] : playerNumberOptions[index];

      currentGame.updateDOMOptions();
    }

    increaseHandSize() {
      let handSizeOptions = currentGame.handSizeOptions;
      const index = handSizeOptions.indexOf(currentGame.sizeOfHand) + 1;

      // If the index calculated is higher than possible, send to beginning;
      // Otherwise continue to increase;
      currentGame.sizeOfHand = index > handSizeOptions.length-1 ? handSizeOptions[0] : handSizeOptions[index];

      currentGame.updateDOMOptions();
    };

    decreaseHandSize() {
      let handSizeOptions = currentGame.handSizeOptions;

      const index = handSizeOptions.indexOf(currentGame.sizeOfHand) - 1;

      // If the index calculated is lower than possible, send to end;
      // Otherwise continue to decrease;
      currentGame.sizeOfHand = index < 0 ? handSizeOptions[handSizeOptions.length-1] : handSizeOptions[index];

      currentGame.updateDOMOptions();
    };


    // Options are hidden and cards are dealt;
    dealCards() {
      hideEl(options);
      currentGame.createPlayers();
      let card = 0;
      let delay = 0; 

      // This delay ensures that the hand is only shown once all cards have been dealt;
      let showHandDelay = currentGame.sizeOfHand * currentGame.players.length * 100
      for ( let i = 0; i < currentGame.sizeOfHand; i++ ) {
        for( let j = 0; j < currentGame.players.length; j++ ) {

          // Class 'deal' is added to start transition - delay is incremented each iteration for effect
          setTimeout(function() {
            currentGame.deck[card].DOMElement.classList.add('deal');
            currentGame.players[j].hand.push(currentGame.deck[card]);
            currentGame.deck[card].dealt = true;
            card++;
          }, delay);
          delay += 100;
        }
      }

      // Remove dealt cards from deck;
      currentGame.deck = currentGame.deck.filter(card => card.dealt !== true );
      setTimeout(function(){

        // Player 1 as specified by param;
        currentGame.players[0].showHand(0);

        // Orders the other players hands without showing them - showHands function passes on to next function if not player 1 - see params;
        for (let i = 1; i < currentGame.players.length; i++ ) {
          currentGame.players[i].showHand(i);
        }
      }, showHandDelay);
    }

    // This is invoked before we deal the cards and is determined by configuration - players[0] is 'you';
    createPlayers() {
      for ( let i = 0; i < this.numberOfPlayers; i++) {
        const newPlayer = new Player();
        this.players.push(newPlayer);
      }
    }

    // Logical to have game class determine the winner;
    decideWinner() {
      let winners = [];
      let score = 0;
      let text;

      // Cycles through players to determine highest scoring hands;
      this.players.forEach((player, index) => {
        if (player.score > score) {
          // Clears winners array as there is a new highest score;
          winners = [];
          winners.push(`Player ${index+1}`);
          score = player.score;

        } else if (player.score === score) {
           // This keeps record of players with same score - does not clear winners array;
          winners.push(`Player ${index+1}`);
        }
      });

      // Conditions for declaring winner to user and what text to pass on to modal;
      if (winners.length > 1 && winners.includes('Player 1')) {
        text = `<p>You drew with: ${winners.filter(player => player !== 'Player 1').join(', ')}</p> <p>Score: ${score}</p>`;
      } else if(winners.length > 1) {
       text = `<p>Draw! Between: ${winners.join(', ' )}</p> <p>Score: ${score}</p>`
      } else {
       text =  winners.includes('Player 1') ? `<p>You win!</p> <p>Score: ${score}</p>` : `<p>The winner: ${winners[0]}</p> <p>Score: ${score}</p>`;
      }

      //The text is then presented in the play again modal;
      setTimeout(() => {
        createPlayAgainEl(text);
      }, 1000);
    
    }

    // Clears cards and scoreboard for next game;
    clearTable() {
      const deckToClear = document.getElementsByClassName('deck')
      let cardsLeft = deckToClear.length;
      const scoresToClear = document.getElementsByClassName('score');
      let scoresLeft = scoresToClear.length;

      while (cardsLeft--) {
        const card = deckToClear[0];
        card.parentNode.removeChild(card);
      }

      while (scoresLeft--) {
        const score = scoresToClear[0];
        score.parentNode.removeChild(score);
      }
    }

  }

  // This class builds the deck. Dealt and totalled are initialised as false to be used later;
  class Card {
    constructor(suit, value, xPos, yPos) {
      this.suit = suit;
      this.value = value;
      this.dealt = false;
      this.totalled = false;
      this.xPos = xPos;
      this.yPos = yPos;
      this.DOMElement = document.createElement('img');
      this.DOMElement.setAttribute('src', './assets/img/back.png');
      this.DOMElement.setAttribute('style', `left:${this.xPos}%; top:${yPos}%`);
      this.DOMElement.setAttribute('class', 'deck');
      game.appendChild(this.DOMElement); 
    }
  }

  // Player setup
  class Player {
    constructor() {
      this.hand = [];
      this.score = 0;
    }
    
    // Reassigns src of images to front of card and positions them on page;
    showHand(player) {
      if (player === 0) {

        // This is to calculate even spread of cards without them falling off edge of page;
        let increment = this.hand.length > 6 ? 60/this.hand.length : 10;
        let newXPos = 15 + increment;
        for ( let i = 0; i < this.hand.length; i++ ) {
          const card = this.hand[i];

          // 'deal' class is removed in order to apply the next position of the cards;
          card.DOMElement.classList.remove('deal');
          card.xPos = newXPos;
          card.yPos = 80;

          //z-index and xPos is incremented for visual effect;
          card.DOMElement.setAttribute('style', `top: ${card.yPos}%; left: ${card.xPos}%; z-index: ${i}`)
          card.DOMElement.setAttribute('src', `./assets/img/${card.value}_${card.suit}.png`);
          newXPos += increment;
        };
  
        // setTimeout for visual effect. Player is passed through for conditions defined in subsequent functions;
        setTimeout(() => {
          this.orderHand(player);
        }, 1500);
      } else {
        this.orderHand(player);
      }
    }

    
    orderHand(player) {
      let cardPositions = [];
      let sortedHand = [];

      // Store xPos for when hand is reordered;
      this.hand.forEach(card => {
        cardPositions.push(card.xPos);
      });

      // Creates new hand according to suit order specified above (global declarations);
      for (let i = 0; i < suits.length; i++ ) {
        this.hand.forEach(card => {
          if (card.suit === suits[i]) {
            sortedHand.push(card);
          }
        });
      };

      // After being sorted by suit, sort by value;
      sortedHand.sort(function(a,b) {
        return b.value - a.value;
      });

      // Reassign hand and reapply xPos to new order of cards;
      this.hand = sortedHand;
      this.hand.forEach((card, index) => {
        card.xPos = cardPositions[index];
        card.DOMElement.setAttribute('style',`top: ${card.yPos}%; left: ${card.xPos}%; z-index:${index}`);
      });

      // Total up all other players, total users hand after for suspense;
      if (player === 0) setTimeout(() =>  this.totalHand(player), 500);     
      else {
        this.totalHand(player)
      };
    }

    // Totals hand and displays result on scoreboard;
    totalHand(player) {
      this.scoreElement = document.createElement('li');
      this.scoreElement.classList.add('score');
      scoreboardList.appendChild(this.scoreElement);


      // Originally wanted to stagger repositioning according to pairs, three of a kind etc and in order of totalling but had issues with setTimeout;
      const updateCountAndDOM = (hand, index, score, count) => {
        if (player === 0) {
            hand[index+count].DOMElement.setAttribute('style',`top: ${hand[index+count].yPos - 10}%; left: ${hand[index+count].xPos}%; z-index:${index+count}`);
            this.scoreElement.textContent = `You: ${score}`;
        } else {
          // No need to reposition for other players as they are not showing there hands;
          this.scoreElement.textContent = `Player ${player + 1}: ${score}`;
        }
        // Decrement count for while loop (in event of pairs etc.) and assign totalled as true to avoid duplicate calc;
        this.count--;
        hand[index+count].totalled = true;
      }

      // Conditions for bonuses - does not total up cards with totalled: true;
      this.hand.forEach((card, index, hand) => {
        if (card.totalled !== true) {
          switch (card.value) {
            case hand[index+3] && hand[index+3].value:
              this.score += (card.value * 4) + 30
              this.count= 3;
              while (this.count>= 0) {
                updateCountAndDOM(hand, index, this.score, this.count)
              }   
              // console.log('im four of a kind');
              break;
            case hand[index+2] && hand[index+2].value:
              this.score += (card.value * 3) + 20
              this.count= 2;
              while (this.count>= 0) {
                updateCountAndDOM(hand, index, this.score, this.count) 
              }
              // console.log('im three of a kind');
              break;
            case hand[index+1] && hand[index+1].value:
              this.score += (card.value * 2) + 10
              this.count= 1;
              while (this.count>= 0) {
                updateCountAndDOM(hand, index, this.score, this.count)
              }
              // console.log('im a pair');
              break;
            default:
              // Standard calc
              this.score += card.value;
              card.DOMElement.setAttribute('style',`top: ${card.yPos - 10}%; left: ${card.xPos}%; z-index:${index}`);
              if (player === 0 ) {
                  this.scoreElement.textContent = `You: ${this.score}`;
              } else {
                this.scoreElement.textContent = `Player ${player + 1}: ${this.score}`;
              }
              card.totalled = true;
          }
        }
      })

      // Once user has had chance to check leaderboard, declare winner ask to play again;
      if (player === 0) {
        setTimeout(() => {
          currentGame.decideWinner()
        })
      } 
    }

    
  };

  // Lets begin the game!
  createStartGameEl();

};
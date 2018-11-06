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
  const dealCardsButton = document.getElementsByClassName('deal-cards')[0];
  const game = document.getElementsByClassName('game')[0];
  const scoreboard = document.getElementsByClassName('scoreboard')[0];
  const options = document.getElementsByClassName('options')[0];
  let startGameContainer, startGameButton, instructionsContainer, instructionsButton;

  function removeModal(element) {
    element.classList.remove('modalEnter');
    element.classList.add('modalLeave');
    setTimeout(function() {
      element.parentNode.removeChild(element);
      element = null;
    }, 1000);
  }

  createStartGameEl();

  function createStartGameEl() {
    startGameContainer = document.createElement('div');
    startGameContainer.setAttribute('class', 'startGame');
    startGameContainer.innerHTML = '<p>Welcome to The World\'s Simplest Poker Game!</p>';
    game.appendChild(startGameContainer);
    startGameButton =  document.createElement('button');
    startGameButton.textContent = 'Start game';
    startGameContainer.appendChild(startGameButton);
    startGameButton.addEventListener('click', createInstructionsEl);
    setTimeout( function() {
      startGameContainer.classList.add('modalEnter');
    },100);
  }

  function createInstructionsEl() {
    removeModal(startGameContainer);
      instructionsContainer= document.createElement('div');
      instructionsContainer.setAttribute('class', 'instructions');
      instructionsContainer.innerHTML = '<p>The player with the hand with the highest total wins.</p> <p> You get bonus points for three of a kind and pairs etc.</p> <p> Good luck!</p>';
      game.appendChild(instructionsContainer);
      instructionsButton = document.createElement('button');
      instructionsButton.textContent = 'Let\'s play!';
      instructionsButton.addEventListener('click', prepareGame);
      instructionsContainer.appendChild(instructionsButton);
      setTimeout( function() {
        instructionsContainer.classList.add('modalEnter');
      },100);
  }

  function showEl(element) {
    element.classList.remove('hide');
    setTimeout( function() {
      element.classList.add('show');
    }, 50);
    
  }

  function hideEl(element) {
    element.classList.remove('show');
    setTimeout(function() {
      element.classList.add('hide');
    }, 1000);
  }

  function prepareGame() {
    currentGame = new Game(6, 2);
    currentGame.shuffleDeck();
    currentGame.updateDOMOptions()
    removeModal(instructionsContainer)
    showEl(scoreboard);
    showEl(options);
  }

  

  

  // Global / Game settings
  const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  let currentGame;


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

    calculateSizeOfHand() {
      this.handSizeOptions = [];
      const maxHandSize = Math.floor(this.deck.length/this.numberOfPlayers);
      // Determines hand size options
      for ( let i = 1; i <= maxHandSize; i++ ) {
        this.handSizeOptions[i-1] = i;
      }
    }
  
    calculateNumberOfPlayers() {
      this.playerNumberOptions = [];
      const maxNumberOfPlayers = Math.floor(this.deck.length/this.sizeOfHand);
      // Determines player number options
      for ( let i = 1; i <= maxNumberOfPlayers; i++ ) {
        this.playerNumberOptions[i-1] = i;
      }
    }
  
    updateDOMOptions() {
      this.calculateNumberOfPlayers();
      this.calculateSizeOfHand();
      numberOfPlayersDOM.textContent = this.numberOfPlayers;
      sizeOfHandDOM.textContent = this.sizeOfHand;
    }

    increasePlayerNumber() {      
      let playerNumberOptions = currentGame.playerNumberOptions;
      const index = playerNumberOptions.indexOf(currentGame.numberOfPlayers) + 1;
      // If the index calculated is higher than possible, send to beginning.
      // Otherwise continue to increase;
      currentGame.numberOfPlayers = index > playerNumberOptions.length-1 ? playerNumberOptions[0] : playerNumberOptions[index];

      currentGame.updateDOMOptions();
    }

    decreasePlayerNumber() {
      let playerNumberOptions = currentGame.playerNumberOptions;
      const index = playerNumberOptions.indexOf(currentGame.numberOfPlayers) - 1;
      // If the index calculated is lower than possible, send to end.
      // Otherwise continue to decrease;
      currentGame.numberOfPlayers = index < 0 ? playerNumberOptions[playerNumberOptions.length-1] : playerNumberOptions[index];

      currentGame.updateDOMOptions();
    }

    increaseHandSize() {
      let handSizeOptions = currentGame.handSizeOptions;
      const index = handSizeOptions.indexOf(currentGame.sizeOfHand) + 1;
      // If the index calculated is higher than possible, send to beginning.
      // Otherwise continue to increase;
      currentGame.sizeOfHand = index > handSizeOptions.length-1 ? handSizeOptions[0] : handSizeOptions[index];

      currentGame.updateDOMOptions();
    };

    decreaseHandSize() {
      let handSizeOptions = currentGame.handSizeOptions;

      const index = handSizeOptions.indexOf(currentGame.sizeOfHand) - 1;
      // If the index calculated is lower than possible, send to end.
      // Otherwise continue to decrease;
      currentGame.sizeOfHand = index < 0 ? handSizeOptions[handSizeOptions.length-1] : handSizeOptions[index];

      currentGame.updateDOMOptions();
    };



    dealCards() {
      hideEl(options);
      currentGame.createPlayers();
      let card = 0;
      let delay = 0; 
      let showHandDelay = currentGame.sizeOfHand * currentGame.players.length * 100
      for ( let i = 0; i < currentGame.sizeOfHand; i++ ) {
        for( let j = 0; j < currentGame.players.length; j++ ) {
          setTimeout(function() {
            currentGame.deck[card].DOMElement.classList.add('deal');
            currentGame.players[j].hand.push(currentGame.deck[card]);
            currentGame.deck[card].dealt = true;
            card++;
          }, delay);
          delay += 100;
        }
      }
      currentGame.deck = currentGame.deck.filter(card => card.dealt !== true );
      setTimeout(function(){
        currentGame.players[0].showHand('player1');
        // orders the other players hands
        for (let i = 1; i < currentGame.players.length; i++ ) {
          currentGame.players[i].orderHand();
        }
      }, showHandDelay);
    }

    createPlayers() {
      for ( let i = 0; i < this.numberOfPlayers; i++) {
        const newPlayer = new Player();
        this.players.push(newPlayer);
      }
    }

  }



  // This class builds the deck, dealt and totalled are intialised as false to be
  // used later
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
      this.points = 0;
    }
    
    showHand(player) {
      if (player === 'player1') {
        let increment = 60/this.hand.length;
        let newXPos = 15 + increment;
        for ( let i = 0; i < this.hand.length; i++ ) {
          const card = this.hand[i];
          card.DOMElement.classList.remove('deal');
          card.xPos = newXPos;
          card.yPos = 80;
          card.DOMElement.setAttribute('style', `top: ${card.yPos}%; left: ${card.xPos}%; z-index: ${i}`)
          card.DOMElement.setAttribute('src', `./assets/img/${card.value}_${card.suit}.png`);
          newXPos += increment;
        };
  
        setTimeout(() => {
          this.orderHand();
        }, 1500);
      } else {
        this.orderHand();
      }
    }

    orderHand() {
      let cardPositions = [];
      let sortedHand = [];

      this.hand.forEach(card => {
        cardPositions.push(card.xPos);
      });

      for (let i = 0; i < suits.length; i++ ) {
        this.hand.forEach(card => {
          if (card.suit === suits[i]) {
            sortedHand.push(card);
          }
        });
      };

      sortedHand.sort(function(a,b) {
        return b.value - a.value;
      });

      this.hand = sortedHand;
      this.hand.forEach((card, index) => {
        card.xPos = cardPositions[index];
        card.DOMElement.setAttribute('style',`top: ${card.yPos}%; left: ${card.xPos}%; z-index:${index}`);
      });
      setTimeout(() =>  this.totalHand(), 500);     
    }

    totalHand() {
      let scoreTotal = 0;
      let count;
      let delay = 50;
      const score = document.createElement('p');
      score.classList.add('score');
      score.textContent = `${scoreTotal}`;
      game.appendChild(score);
      this.hand.forEach((card, index, hand) => {
        setTimeout(() => {
          console.log(card.totalled);
          if (card.totalled !== true) {
            console.log('test', hand, index)
            switch (card.value) {
              case hand[index+3] && hand[index+3].value:
              // console.log('im four of a kind');
              count = 3;
                while (count >= 0) {
                  hand[index+count].totalled = true;
                  hand[index+count].DOMElement.setAttribute('style',`top: ${hand[index+count].yPos - 10}%; left: ${hand[index+count].xPos}%; z-index:${index+count}`);
                  count--;
                 
                }
              scoreTotal += (card.value * 4) + 30
              
              break;
              case hand[index+2] && hand[index+2].value:
              count = 2;
              while (count >= 0) {
                hand[index+count].totalled = true;
                hand[index+count].DOMElement.setAttribute('style',`top: ${hand[index+count].yPos - 10}%; left: ${hand[index+count].xPos}%; z-index:${index+count}`);
                count--;
              }
              scoreTotal += (card.value * 3) + 20
              // console.log('im three of a kind');
              break;
              case hand[index+1] && hand[index+1].value:
              count = 1;
              while (count >= 0) {
                hand[index+count].totalled = true;
                hand[index+count].DOMElement.setAttribute('style',`top: ${hand[index+count].yPos - 10}%; left: ${hand[index+count].xPos}%; z-index:${index+count}`);
                count--;
              }
              scoreTotal += (card.value * 2) + 10
              // console.log('im a pair');
              break;
              default:
              scoreTotal += card.value;
              card.DOMElement.setAttribute('style',`top: ${card.yPos - 10}%; left: ${card.xPos}%; z-index:${index}`);
              card.totalled = true;
              // console.log('just add me to the total and carry on');
            }
            score.textContent = `${scoreTotal}`;
          }
        }, delay);
        delay += 500;
        // card.DOMElement
      })  
    }
  };

  // function determineWinner() {
  //   const result = {
  //     player: [],
  //     score: 0
  //   };
  //   players.reduce((acc, player, index) => {

  //     if (totalHand(player) > result.score) {
  //       acc.score = totalHand(player);
  //       acc.player = [index+1];
  //       return acc;
  //     }

  //     if (totalHand(player) === result.score) {
  //       acc.player.push(index+1);
  //     }
  //   }, result);
  //   console.log(result.player.length);
  //   if (result.player.length > 1) {
  //     console.log('Drawer', result.player.join('player '), result.score);
  //   } else {
  //     console.log('Winner!', result.player);
  //   }
  // }

  // function totalHand(player) {
  //   return player.hand.reduce((acc, card) => {
  //     card.totalled = true;
  //     const total = acc + card.value;
  //     return total;
  //   }, 0);
  // }

  // determineWinner();


};

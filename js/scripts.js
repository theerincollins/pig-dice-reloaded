function Game(playerOne, playerTwo) {
  this.playerOne = new Player(playerOne);
  this.playerTwo = new Player(playerTwo);
  this.roundScore = 0;
  this.activePlayer = this.playerOne;
  this.diceOne = 0;
  this.diceTwo = 0;
  var pigMessage; // pig response after roll
}

function Player(playerName, score) {
  this.playerName = playerName;
  this.score = 0;
}

Game.prototype.endRound = function() {
  if (this.activePlayer === this.playerOne) {
    this.playerOne.score += this.roundScore;
    if (this.playerOne.score >= 100) {
      return playerOne.playerName + " wins! Oink oink oink.";
    } else {
      this.activePlayer = this.playerTwo;
    }
  } else {
    this.playerTwo.score += this.roundScore;
    if (this.playerTwo.score >= 100) {
      return playerTwo.playerName + " wins! Oink oink oink.";
    } else {
    this.activePlayer = this.playerOne;
    }
  }
  this.roundScore = 0;
};

Game.prototype.playRound = function() {
  var diceOne = 1 + Math.floor(Math.random() * 6);
  this.diceOne = diceOne;
  var diceTwo = 1 + Math.floor(Math.random() * 6);
  this.diceTwo = diceTwo;
  if (diceOne === 1 && diceTwo === 1) {
    pigMessage = "> Rolled two ONES! Back to ZERO! <";
    if (this.playerOne === this.activePlayer) {
      this.playerOne.score = 0;
    } else {
      this.playerTwo.score = 0;
    }
  } else if (diceOne === 1 || diceTwo === 1) {
    pigMessage = "> Rolled a ONE. NEXT! <";
    this.roundScore = 0;
    this.endRound();
  } else {
    this.roundScore += (diceOne + diceTwo);
    pigMessage = "> More points! OINK <";
  }
};

// Dice animation
  // **currently not displaying correct number in image
  // but actual game scores are still working correctly
function throwAnimatedDice(elem, spins) {
    var value = Math.round(Math.random() * 5) + 1;
    displayDice(10 + (spins*5), value, $(elem));
    return value;
}

function displayDice(times, final, element) {
    element.removeClass();
    if (times > 1) {
        element.addClass('dice dice_' + (Math.round(Math.random() * 5) + 1));
        setTimeout(function () {
            displayDice(times - 1, final, element);
        }, 100);
    } else element.addClass('dice dice_' + final);
}

$(function() {
  $("form#player-form").submit(function(event) {
    event.preventDefault();
    var playerOneName = $("input#player-one-name").val();
    var playerTwoName = $("input#player-two-name").val();
    var newGame = new Game(playerOneName, playerTwoName);

    // start new game
    $("#main-pig").fadeOut(750);
    $("#new-game").fadeOut(750);
    $("#live-game").delay(750).fadeIn(1000);
    $("#player-one-name").val("");
    $("#player-two-name").val("");
    $("#live-game h2").text(newGame.activePlayer.playerName + "'s turn");

    // Player one setup
    $("#player-one-score").text(newGame.playerOne.score);
    $("#player-one h3").text(newGame.playerOne.playerName);

    // Player two setup
    $("#player-two-score").text(newGame.playerTwo.score);
    $("#player-two h3").text(newGame.playerTwo.playerName);

    // Scoreboard setup
    $("#roundScore").text(newGame.roundScore);

    // Roll-dice button
    $("#play-round").click(function() {
      $("#rolling").text("Rolling...");

      $('.dice').each(function(index) {
        throwAnimatedDice(this, index );
      });

      $(".game-buttons").slideUp(100);
      $(".piggie").slideUp(100);
      setTimeout(function() { // adds delay to simulate rolling
        newGame.playRound();
        $("#dice-1").text(newGame.diceOne);
        $("#dice-2").text(newGame.diceTwo);

        $("#roundScore").text(newGame.roundScore);
        $("#player-two-score").text(newGame.playerTwo.score);
        $("#player-one-score").text(newGame.playerOne.score);
        $("#scoreboard h2").text(newGame.activePlayer.playerName + "'s turn");
        $("#rolling").text(pigMessage);

        setTimeout(function() { // delays prompt after roll results
          $("#rolling").text("Oink. What do you want to do?");
        }, 2000);
        $(".game-buttons").fadeIn(1000);
        $(".piggie").fadeIn(300);
      }, 1200);
    });

    // End-turn button
    $("#end-turn").click(function() {
      newGame.endRound();

      $("#roundScore").text(newGame.roundScore);
      $("#player-two-score").text(newGame.playerTwo.score);
      $("#player-one-score").text(newGame.playerOne.score);
      $("#scoreboard h2").text(newGame.activePlayer.playerName + "'s turn");

      // Checks for WIN scenario
      if (newGame.playerOne.score >= 100) {
        $("#live-game").fadeOut();
        $("#win-screen").delay(750).fadeIn();
        $("#win-screen h1").text(newGame.playerOne.playerName + " wins!");
        $("#win-screen").delay(1000).fadeOut();
        $("#new-game").delay(3000).fadeIn();
      } else if (newGame.playerTwo.score >= 100) {
        $("#live-game").fadeOut();
        $("#win-screen").delay(750).fadeIn();
        $("#win-screen h1").text(newGame.playerTwo.playerName + "wins!");
        $("#win-screen").delay(1000).fadeOut();
        $("#new-game").delay(3000).fadeIn();
      }
    });
  });
});

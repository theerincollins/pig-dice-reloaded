function Game(playerOne, playerTwo) {
  this.playerOne = new Player(playerOne);
  this.playerTwo = new Player(playerTwo);
  this.roundScore = 0;
  this.activePlayer = this.playerOne;
  this.diceOne = 0;
  this.diceTwo = 0;
  var pigMessage;
}

function Player(playerName, score) {
  this.playerName = playerName;
  this.score = 0;
}

Game.prototype.endRound = function() {
  if (this.activePlayer === this.playerOne) {
    this.playerOne.score += this.roundScore;
    if (this.playerOne.score >= 100) {
      return "Player 1 wins";
    } else {
      this.activePlayer = this.playerTwo;
    }
  } else {
    this.playerTwo.score += this.roundScore;
    if (this.playerTwo.score >= 100) {
      return "Player 2 wins";
    } else {
    this.activePlayer = this.playerOne;
    }
  }
  this.roundScore = 0;
}

Game.prototype.playRound = function() {
  var diceOne = Math.floor(Math.random() * (6 - 1)) + 1;
  this.diceOne = diceOne;
  var diceTwo = Math.floor(Math.random() * (6 - 1)) + 1;
  this.diceTwo = diceTwo;
  if (diceOne === 1 && diceTwo === 1) {
    var pigMessage = "Oink oink...back to zero!";
    if (this.playerOne === this.activePlayer) {
      this.playerOne.score = 0;
    } else {
      this.playerTwo.score = 0;
    }
  } else if (diceOne === 1 || diceTwo === 1) {
    var pigMessage = "Oink. Ouch. Round over!";
    this.roundScore = 0;
    this.endRound();
  } else {
    this.roundScore += (diceOne + diceTwo);
    var pigMessage = "";
  }
}

$(function() {
  $("form#player-form").submit(function(event) {
    event.preventDefault();
    var playerOneName = $("input#player-one-name").val();
    var playerTwoName = $("input#player-two-name").val();
    var newGame = new Game(playerOneName, playerTwoName);

    // start new game
    $("#new-game").fadeOut(750);
    $("#live-game").delay(750).fadeIn(1000);
    $("#player-one-name").val("")
    $("#player-two-name").val("")
    $("#live-game h2").text(newGame.activePlayer.playerName + "'s turn");

    // Player one setup
    $("#player-one-score").text(newGame.playerOne.score);
    $("#player-one h3").text(newGame.playerOne.playerName);

    // Player two setup
    $("#player-two-score").text(newGame.playerTwo.score);
    $("#player-two h3").text(newGame.playerTwo.playerName);

    //scoreboard/controller setup
    $("#roundScore").text(newGame.roundScore);

    //play round button
    $("#play-round").click(function() {
      newGame.playRound();
      $("#live-game h5").text(newGame.diceOne + (String.fromCharCode(160)) + (String.fromCharCode(160)) + (String.fromCharCode(160)) +
                                                (String.fromCharCode(160)) + (String.fromCharCode(160)) + (String.fromCharCode(160))
      + newGame.diceTwo) // refactor me please :D
      $("#roundScore").text(newGame.roundScore);
      $("#player-two-score").text(newGame.playerTwo.score);
      $("#player-one-score").text(newGame.playerOne.score);
      $("#scoreboard h2").text(newGame.activePlayer.playerName + "'s turn");

    });

    //end turn button
    $("#end-turn").click(function() {
      newGame.endRound();

      $("#roundScore").text(newGame.roundScore);
      $("#player-two-score").text(newGame.playerTwo.score);
      $("#player-one-score").text(newGame.playerOne.score);
      $("#scoreboard h2").text(newGame.activePlayer.playerName + "'s turn");


      // win check
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

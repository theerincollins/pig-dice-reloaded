function Game(playerOne, playerTwo) {
  this.playerOne = new Player(playerOne);
  this.playerTwo = new Player(playerTwo);
  this.roundScore = 0;
  this.activePlayer = this.playerOne;
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
  var diceRoll = Math.floor(Math.random() * (6 - 1)) + 1;
  if (diceRoll === 1) {
    this.roundScore = 0;
    this.endRound();
  } else {
    this.roundScore += diceRoll
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
    $("#live-game h4").text(newGame.activePlayer.playerName + "'s turn");

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
      $("#roundScore").text(newGame.roundScore);
      $("#player-two-score").text(newGame.playerTwo.score);
      $("#player-one-score").text(newGame.playerOne.score);

    });

    //end turn button
    $("#end-turn").click(function() {
      newGame.endRound();

      $("#roundScore").text(newGame.roundScore);
      $("#player-two-score").text(newGame.playerTwo.score);
      $("#player-one-score").text(newGame.playerOne.score);
      $("#live-game h4").text(newGame.activePlayer.playerName + "'s turn");


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

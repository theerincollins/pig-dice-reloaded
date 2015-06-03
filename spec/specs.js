describe('Game', function() {
  it("take two player names as parameters and create them", function() {
    var testGame = new Game("Tywin", "Tyrion");
    expect(testGame.playerOne.playerName).to.eq("Tywin");
    expect(testGame.playerTwo.playerName).to.eq("Tyrion");
  })

  it("will update the player's score when endRound() is called", function() {
    var testGame = new Game("Tywin", "Tyrion");
    testGame.endRound();
    expect(testGame.playerOne.score).to.eq(0);
  });

  it("will end when a player gets 100 points", function() {
    var testGame = new Game("Tywin", "Tyrion");
    testGame.playerOne.score = 100;
    expect(testGame.endRound()).to.eq("Player 1 wins");
  });

  it('will roll two dice and update the roundScore', function() {
    var testGame = new Game("Tywin", "Tyrion");
    testGame.playRound()
    expect(testGame.roundScore).to.be.above(-1);
    expect(testGame.roundScore).to.be.below(13);
  })

  it("will update roundScore to 0 if one of the die rolled is 1", function() {
    var testGame = new Game("Tywin", "Tyrion");
    testGame.roundScore = 1;
    while (testGame.roundScore > 0) {
      testGame.playRound();
    }
    expect(testGame.roundScore).to.eq(0);
  })

  it("will reset the player's score to 0 if both dice roll a 1", function() {
    var testGame = new Game("Tywin", "Tyrion");
    testGame.playerOne.score = 4;
    while (testGame.playerOne.score > 0) {
      testGame.playRound();
    }
    expect(testGame.playerOne.score).to.eq(0);
  })
});

describe('Player', function() {
  it("should start with a player score of zero", function() {
    var testPlayer = new Player();
    expect(testPlayer.score).to.eq(0);
  });

  it("should create a new Player object and start with a score of zero", function() {
    var testPlayer = new Player("Reek");
    expect(testPlayer.score).to.eq(0);
    expect(testPlayer.playerName).to.eq("Reek");
  });
});

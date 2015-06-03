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

  it('will roll a dice and add its score into roundScore', function() {
    var testGame = new Game("Tywin", "Tyrion");
    testGame.playRound();
    expect(testGame.roundScore).to.be.above(0);
    expect(testGame.roundScore).to.be.below(7);
  });

  it("will end the round if a 1 is rolled", function() {
    var testGame = new Game("Tywin", "Tyrion");
    testGame.playRound();
    testGame.roundScore = 1; // hard-coded score
    while (testGame.roundScore > 0) {
      testGame.playRound();
    }
    expect(testGame.roundScore).to.eq(0);
  });
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

// describe('rollDice', function() {
//   it("will return a random number from 1 to 6", function() {
//     expect(rollDice()).to.be.above(0);
//     expect(rollDice()).to.be.below(7);
//   });
// });
//
// describe('playRound', function() {
//   it("rolls dice and returns a number", function() {
//     var testPlayer = new Player("Reek");
//     playRound(testPlayer);
//     expect(testPlayer.score).to.be.above(0);
//     expect(testPlayer.score).to.be.below(7);
//   });
// });

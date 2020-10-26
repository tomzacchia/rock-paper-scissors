const gameController = (function () {
  let state = {
    isGameActive: true,
    playerScore: 0,
  };

  const choices = ["rock", "paper", "scissors"];
  const winningPairings = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  const toggleIsGameActive = function () {
    state.isGameActive = !state.isGameActive;
    return state.isGameActive;
  };

  const generateBotChoice = function () {
    const randomInt = Math.round(Math.random() * choices.length);

    const botChoice = choices[randomInt];

    return botChoice;
  };

  const determineOutcome = function (userChoice, botChoice) {
    if (userChoice === botChoice) {
      return "tie";
    } else if (winningPairings[userChoice] === botChoice) {
      return "win";
    } else {
      return "loss";
    }
  };

  const updateScore = function (outcomeType) {
    if (outcomeType === "win") {
      state.playerScore += 1;
    } else if (outcomeType === "loss") {
      state.playerScore -= 1;
    }

    return state.playerScore;
  };

  return {
    init: function () {
      console.log("gameController");
    },
    toggleIsGameActive,
    generateBotChoice,
    determineOutcome,
    updateScore,
    getIsGameActive: function () {
      return state.isGameActive;
    },
  };
})();

export default gameController;

import GAME_OUTCOMES from "./constants";

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
  };

  const generateBotChoice = function () {
    const randomInt = Math.round(Math.random() * (choices.length - 1));
    const botChoice = choices[randomInt];

    return botChoice;
  };

  const determineOutcome = function (userChoice, botChoice) {
    if (userChoice === botChoice) {
      return GAME_OUTCOMES.tie;
    } else if (winningPairings[userChoice] === botChoice) {
      return GAME_OUTCOMES.win;
    } else {
      return GAME_OUTCOMES.lose;
    }
  };

  const updateScore = function (outcomeType) {
    if (outcomeType === GAME_OUTCOMES.win) {
      state.playerScore += 1;
    } else if (outcomeType === GAME_OUTCOMES.lose) {
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

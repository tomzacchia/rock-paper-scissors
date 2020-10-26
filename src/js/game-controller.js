import GAME_OUTCOMES from "./constants";

const gameController = (function () {
  let state = {
    isGameActive: true,
    playerScore: 0,
    gameOutcome: "",
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
    let gameOutcome;

    if (userChoice === botChoice) {
      gameOutcome = GAME_OUTCOMES.tie;
    } else if (winningPairings[userChoice] === botChoice) {
      gameOutcome = GAME_OUTCOMES.win;
    } else {
      gameOutcome = GAME_OUTCOMES.lose;
    }

    state.gameOutcome = gameOutcome;

    return gameOutcome;
  };

  const updateScore = function () {
    const gameOutcome = state.gameOutcome;

    if (gameOutcome === GAME_OUTCOMES.win) {
      state.playerScore += 1;
    } else if (gameOutcome === GAME_OUTCOMES.lose) {
      state.playerScore -= 1;
    }

    return state.playerScore;
  };

  const resetGameOutcome = function () {
    state.gameOutcome = null;
  };

  return {
    init: function () {
      console.log("gameController");
    },
    getIsGameActive: function () {
      return state.isGameActive;
    },
    toggleIsGameActive,
    generateBotChoice,
    determineOutcome,
    updateScore,
    resetGameOutcome,
  };
})();

export default gameController;

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

  return {
    getIsGameActive,
    toggleIsGameActive,
    generateBotChoice,
    determineOutcome,
    updateScore,
    resetGameOutcome,
    getScore,
    setScore,
  };

  // ********************************

  function toggleIsGameActive() {
    state.isGameActive = !state.isGameActive;
  }

  function generateBotChoice() {
    const randomInt = Math.round(Math.random() * (choices.length - 1));
    const botChoice = choices[randomInt];

    return botChoice;
  }

  function determineOutcome(userChoice, botChoice) {
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
  }

  function updateScore() {
    const gameOutcome = state.gameOutcome;

    if (gameOutcome === GAME_OUTCOMES.win) {
      state.playerScore += 1;
    } else if (gameOutcome === GAME_OUTCOMES.lose) {
      state.playerScore -= 1;
    }

    return state.playerScore;
  }

  function resetGameOutcome() {
    state.gameOutcome = null;
  }

  function getIsGameActive() {
    return state.isGameActive;
  }

  function getScore() {
    return state.playerScore;
  }

  function setScore(scoreString) {
    if (!scoreString) return;

    const scoreInt = parseInt(scoreString);

    state.playerScore = scoreInt;

    return scoreInt;
  }
})();

export default gameController;

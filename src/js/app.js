import "../scss/styles.scss";
import gameController from "./game-controller";
import uiController from "./ui-controller";
import GAME_OUTCOMES from "./constants";

const appController = (function (gameController, uiController) {
  const userChoiceHandler = function (userChoice) {
    let score;
    gameController.toggleIsGameActive();

    const botChoice = gameController.generateBotChoice();
    const gameOutcome = gameController.determineOutcome(userChoice, botChoice);

    // if (gameOutcome === GAME_OUTCOMES.tie) {

    // }

    if (gameOutcome === GAME_OUTCOMES.win) {
      score = gameController.updateScore(GAME_OUTCOMES.win);
    } else if (gameOutcome === GAME_OUTCOMES.lose) {
      score = gameController.updateScore(GAME_OUTCOMES.lose);
    }
  };

  const setupEventLiseners = function () {
    const playAreaContainer = document.querySelector(
      uiController.domStrings.playAreaContainer
    );

    playAreaContainer.addEventListener("click", function (event) {
      // user selection event listener
      const target = event.target;
      const choiceContainer = target.closest(".choice-container");

      if (!choiceContainer) return;

      const userChoice = choiceContainer.dataset.userChoice;
      const isGameActive = gameController.getIsGameActive;

      if (!isGameActive) return;

      userChoiceHandler(userChoice);
    });

    // play again button listener
    document.addEventListener("click", function (event) {
      const target = event.target;
      const buttonContainer = target.closest(".play-again-button");

      if (!buttonContainer) return;

      console.log(buttonContainer);
    });

    // rules event listener
  };

  return {
    init: function () {
      uiController.init();
      setupEventLiseners();
    },
  };
})(gameController, uiController);

appController.init();

import "../scss/styles.scss";
import gameController from "./game-controller";
import uiController from "./ui-controller";

const appController = (function (gameController, uiController) {
  const userChoiceHandler = function (userChoice) {
    const botChoice = gameController.generateBotChoice();
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

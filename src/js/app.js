import "../scss/styles.scss";
import gameController from "./game-controller";
import uiController from "./ui-controller";

const appController = (function (gameController, uiController) {
  const setupEventLiseners = function () {
    const playAreaContainer = document.querySelector(
      uiController.domStrings.playAreaContainer
    );

    playAreaContainer.addEventListener("click", function (event) {
      // user selection event listener
      const target = event.target;
      const targetContainer = target.closest(".choice-container");
      const userSelection = targetContainer
        ? targetContainer.dataset.userSelection
        : null;

      // play again button listener

      // rules event listener
    });
  };

  return {
    init: function () {
      uiController.init();
      setupEventLiseners();
    },
  };
})(gameController, uiController);

appController.init();

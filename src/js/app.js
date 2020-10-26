import "../scss/styles.scss";
import gameController from "./game-controller";
import uiController from "./ui-controller";
import GAME_OUTCOMES from "./constants";

const appController = (function (gameController, uiController) {
  const userChoiceHandler = function (userChoice) {
    let score, botChoice, gameOutcome;

    gameController.toggleIsGameActive();
    botChoice = gameController.generateBotChoice();
    gameOutcome = gameController.determineOutcome(userChoice, botChoice);
    score = gameController.updateScore();

    uiController.removePlayAreaBackgroundHTML();
    uiController.triggerGameBoardAnimation(userChoice, botChoice, gameOutcome);

    setTimeout(() => {
      uiController.renderHighlightHTML(gameOutcome);
      uiController.updateScore(score);
      uiController.renderGameOveralyHTML(gameOutcome);
    }, 1000);
  };

  const resetBoardHandler = function () {
    uiController.emptyGameBoardContainer();
    gameController.toggleIsGameActive();
    gameController.resetGameOutcome();

    setTimeout(() => {
      uiController.init();
    }, 1000);
  };

  const toggleModalDisplay = function () {
    let rulesModal = document.querySelector(".modal-container");
    rulesModal.classList.toggle("display-none");
  };

  const setupEventLiseners = function () {
    let rulesButton, playAreaContainer, rulesModal, closeModal;

    playAreaContainer = document.querySelector(
      uiController.domStrings.playAreaContainer
    );
    rulesButton = document.querySelector(".rules-button");
    closeModal = document.querySelector(".modal-close");

    // user clicks on rock, paper or scissors
    playAreaContainer.addEventListener("click", function (event) {
      const target = event.target;
      const choiceContainer = target.closest(".choice-container");

      if (!choiceContainer) return;

      const userChoice = choiceContainer.dataset.userChoice;
      const isGameActive = gameController.getIsGameActive();

      if (!isGameActive) return;

      userChoiceHandler(userChoice);
    });

    // play again button
    document.addEventListener("click", function (event) {
      const target = event.target;
      const buttonContainer = target.closest(".play-again-button");

      if (!buttonContainer) return;

      resetBoardHandler();
    });

    // show rules
    rulesButton.addEventListener("click", function () {
      toggleModalDisplay();
    });

    closeModal.addEventListener("click", function () {
      toggleModalDisplay();
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

import "../scss/styles.scss";
import gameController from "./game-controller";
import uiController from "./ui-controller";

const appController = (function (gameController, uiController) {
  return {
    init: function () {
      handleInitialLoad();
      uiController.init();
      setupEventLiseners();
    },
  };

  // ************************************

  function userChoiceHandler(userChoice) {
    let score, botChoice, gameOutcome;

    gameController.toggleIsGameActive();
    botChoice = gameController.generateBotChoice();
    gameOutcome = gameController.determineOutcome(userChoice, botChoice);
    score = gameController.updateScore();

    uiController.removePlayAreaBackgroundHTML();
    uiController.triggerGameBoardAnimation(userChoice, botChoice, gameOutcome);

    setTimeout(() => {
      uiController.renderHighlightHTML(gameOutcome);
      uiController.updateScoreInnerHTML(score);
      uiController.renderGameOveralyHTML(gameOutcome);
    }, 1000);
  }

  function resetBoardHandler() {
    uiController.emptyGameBoardContainer();
    gameController.toggleIsGameActive();
    gameController.resetGameOutcome();

    setTimeout(() => {
      uiController.init();
    }, 400);
  }

  function toggleModalDisplay() {
    let rulesModal = document.querySelector(
      uiController.domStrings.modalContainer
    );
    rulesModal.classList.toggle("display-none");
  }

  function setupEventLiseners() {
    let rulesButton, playAreaContainer, closeModal;

    playAreaContainer = document.querySelector(
      uiController.domStrings.playAreaContainer
    );
    rulesButton = document.querySelector(uiController.domStrings.rulesButton);
    closeModal = document.querySelector(uiController.domStrings.modalClose);

    // user clicks on rock, paper or scissors
    playAreaContainer.addEventListener("click", function (event) {
      const target = event.target;
      const choiceContainer = target.closest(
        uiController.domStrings.choiceContainer
      );

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

    // save score to localStorage
    window.addEventListener("beforeunload", function () {
      const score = gameController.getScore();

      localStorage.setItem("score", score.toString());
    });
  }

  function handleInitialLoad() {
    let score;

    if (!localStorage.getItem("score")) return;

    score = localStorage.getItem("score");

    gameController.setScore(score);
    uiController.updateScoreInnerHTML(score);
  }
})(gameController, uiController);

appController.init();

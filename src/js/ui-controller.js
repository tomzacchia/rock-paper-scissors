import paperSvg from "../resources/icon-paper.svg";
import scissorsSvg from "../resources/icon-scissors.svg";
import rockSvg from "../resources/icon-rock.svg";
import GAME_OUTCOMES from "./constants";

const uiController = (function () {
  const DOM_STRINGS = {
    backgroundEffectContainer: ".background-effects-container",
    playAreaContainer: ".play-area-container",
    gameOverlayContainer: ".game-overlay-container",
    score: ".score",
    gameBoard: ".game-board",
    playAreaBackground: ".play-area-bg",
    choicesContainer: ".choices-container",
  };

  const highlightHTML = `
    <div class="highlight-container highlight-container-%winner%">
      <div class="highlight highlight-sm highlight-sm-%winner%"></div>
      <div class="highlight highlight-md highlight-md-%winner%"></div>
      <div class="highlight highlight-lg highlight-lg-%winner%"></div>
    </div>
  `;

  const playAreaBackgroundHTML = `
    <div class="play-area-bg absolute-horizontal-center"></div>
  `;

  const playerChoicesHTML = `
    <div class="choices-container absolute-horizontal-center">
      <div class="choice-container paper" data-user-choice="paper">
        <div class="choice-white-bg">
          <img src="${paperSvg}" alt="paper" />
        </div>
      </div>
      <div class="choice-container scissors" data-user-choice="scissors">
        <div class="choice-white-bg">
          <img src="${scissorsSvg}" alt="scissors" />
        </div>
      </div>
      <div class="choice-container rock" data-user-choice="rock">
        <div class="choice-white-bg">
          <img src="${rockSvg}" alt="rock" />
        </div>
      </div>
    </div>
  `;

  const gameOverlayHTML = `
    <div class="winner-message-container">
      <p>YOU PICKED</p>
      <p class="message-right">THE HOUSE PICKED</p>
    </div>

    <div class="button-container">
      <h1>%message%</h1>
      <button class="play-again-button">PLAY AGAIN</button>
    </div>
  `;

  const formatHighlightHTML = function (isPlayerWinner) {
    let newHtml;

    isPlayerWinner
      ? (newHtml = highlightHTML.replaceAll("%winner%", "left"))
      : (newHtml = highlightHTML.replaceAll("%winner%", "right"));

    return newHtml;
  };

  const gameTieAnimation = function (userChoice) {
    let svgUrl;
    let choicesContainer = document.querySelector(DOM_STRINGS.choicesContainer);

    if (userChoice === "rock") {
      svgUrl = rockSvg;
    } else if (userChoice === "paper") {
      svgUrl = paperSvg;
    } else {
      svgUrl = scissorsSvg;
    }

    const newHTML = `
      <div class="choice-container ${userChoice} animate-bot-choice">
        <div class="choice-white-bg">
          <img src="${svgUrl}" alt="${userChoice}" />
        </div>
      </div>
    `;

    choicesContainer.insertAdjacentHTML("beforeend", newHTML);
  };

  const renderPlayAreaBackgroundHTML = function () {
    document
      .querySelector(DOM_STRINGS.playAreaContainer)
      .insertAdjacentHTML("afterbegin", playAreaBackgroundHTML);
  };

  const removePlayAreaBackgroundHTML = function () {
    const playAreaBackgroundNode = document.querySelector(
      DOM_STRINGS.playAreaBackground
    );

    playAreaBackgroundNode.parentNode.removeChild(playAreaBackgroundNode);
  };

  const renderPlayerChoicesHTML = function () {
    document
      .querySelector(DOM_STRINGS.playAreaContainer)
      .insertAdjacentHTML("beforeend", playerChoicesHTML);
  };

  const triggerGameBoardAnimation = function (
    userChoice,
    botChoice,
    gameOutcome
  ) {
    let choicesHTMLArr = document.querySelectorAll(".choice-container");

    choicesHTMLArr.forEach((choiceHTML) => {
      if (choiceHTML.dataset.userChoice === userChoice) {
        choiceHTML.classList.add("animate-player-choice");
      } else if (choiceHTML.dataset.userChoice === botChoice) {
        choiceHTML.classList.add("animate-bot-choice");
      } else {
        choiceHTML.parentNode.removeChild(choiceHTML);
      }
    });

    if (gameOutcome === GAME_OUTCOMES.tie) gameTieAnimation(userChoice);
  };

  const renderHighlightHTML = function (gameOutcome) {
    let isPlayerWinner = gameOutcome === GAME_OUTCOMES.win;

    if (gameOutcome === GAME_OUTCOMES.tie) return;

    const highlightHTML = formatHighlightHTML(isPlayerWinner);

    document
      .querySelector(DOM_STRINGS.backgroundEffectContainer)
      .insertAdjacentHTML("afterbegin", highlightHTML);
  };

  const updateScoreInnerHTML = function (score) {
    const scoreHTML = document.querySelector(DOM_STRINGS.score);

    scoreHTML.innerHTML = score;
  };

  const renderGameOveralyHTML = function (gameOutcome) {
    let message, newHTML;

    if (gameOutcome === GAME_OUTCOMES.win) {
      message = "YOU WIN";
    } else if (gameOutcome === GAME_OUTCOMES.lose) {
      message = "YOU LOSE";
    } else {
      message = "TIE";
    }

    newHTML = gameOverlayHTML.replace("%message%", message);

    document
      .querySelector(DOM_STRINGS.gameOverlayContainer)
      .insertAdjacentHTML("beforeend", newHTML);
  };

  const emptyGameBoardContainer = function () {
    const containersToBeEmptied = [
      document.querySelector(DOM_STRINGS.backgroundEffectContainer),
      document.querySelector(DOM_STRINGS.playAreaContainer),
      document.querySelector(DOM_STRINGS.gameOverlayContainer),
    ];

    containersToBeEmptied.forEach((container) => (container.innerHTML = ""));
  };

  const init = function () {
    renderPlayAreaBackgroundHTML();
    renderPlayerChoicesHTML();
  };

  return {
    domStrings: DOM_STRINGS,
    init,
    renderPlayAreaBackgroundHTML,
    removePlayAreaBackgroundHTML,
    renderPlayerChoicesHTML,
    triggerGameBoardAnimation,
    renderHighlightHTML,
    updateScoreInnerHTML,
    renderGameOveralyHTML,
    emptyGameBoardContainer,
  };
})();

export default uiController;

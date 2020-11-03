import paperSvg from "../resources/icon-paper.svg";
import scissorsSvg from "../resources/icon-scissors.svg";
import rockSvg from "../resources/icon-rock.svg";
import GAME_OUTCOMES from "./constants";
import HTML_MARKUP_CONSTANTS from "./ui-constants";

const uiController = (function () {
  const DOM_STRINGS = {
    score: ".score",
    backgroundEffectContainer: ".background-effects-container",
    gameBoard: ".game-board",
    playAreaBackground: ".play-area-bg",
    playAreaContainer: ".play-area-container",
    choicesContainer: ".choices-container",
    choiceContainer: ".choice-container",
    gameOverlayContainer: ".game-overlay-container",
    rulesButton: ".rules-button",
    modalContainer: ".modal-container",
    modalClose: ".modal-close",
  };

  const {
    highlightHTML,
    playAreaBackgroundHTML,
    choiceHTML,
    gameOverlayHTML,
  } = HTML_MARKUP_CONSTANTS;

  const choicesContainerHTML = `
    <div class="choices-container absolute-horizontal-center">
      ${["rock", "scissors", "paper"]
        .map(function createChoiceHtml(choiceType) {
          return formatChoiceType(choiceType);
        })
        .join("")}
    </div>
  `;

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

  // ******************************************************

  function formatChoiceType(choiceType) {
    const choiceTypeImageUrlMap = {
      paper: paperSvg,
      scissors: scissorsSvg,
      rock: rockSvg,
    };

    let formattedChoiceHtml = choiceHTML.replace(/%choice-type%/gi, choiceType);

    formattedChoiceHtml = formattedChoiceHtml.replace(
      "%img-url%",
      choiceTypeImageUrlMap[choiceType]
    );

    return formattedChoiceHtml;
  }

  function formatHighlightHTML(isPlayerWinner) {
    let newHtml;

    isPlayerWinner
      ? (newHtml = highlightHTML.replace(/%winner%/gi, "left"))
      : (newHtml = highlightHTML.replace(/%winner%/gi, "right"));

    return newHtml;
  }

  function insertDuplicate(userChoice) {
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
  }

  function renderPlayAreaBackgroundHTML() {
    document
      .querySelector(DOM_STRINGS.playAreaContainer)
      .insertAdjacentHTML("afterbegin", playAreaBackgroundHTML);
  }

  function removePlayAreaBackgroundHTML() {
    const playAreaBackgroundNode = document.querySelector(
      DOM_STRINGS.playAreaBackground
    );

    playAreaBackgroundNode.parentNode.removeChild(playAreaBackgroundNode);
  }

  function renderPlayerChoicesHTML() {
    document
      .querySelector(DOM_STRINGS.playAreaContainer)
      .insertAdjacentHTML("beforeend", choicesContainerHTML);
  }

  function triggerGameBoardAnimation(userChoice, botChoice, gameOutcome) {
    let choicesHTMLArr = document.querySelectorAll(".choice-container");

    choicesHTMLArr.forEach(addAnimationClass);

    if (gameOutcome === GAME_OUTCOMES.tie) insertDuplicate(userChoice);

    function addAnimationClass(choiceHTML) {
      if (choiceHTML.dataset.userChoice === userChoice) {
        choiceHTML.classList.add("animate-player-choice");
      } else if (choiceHTML.dataset.userChoice === botChoice) {
        choiceHTML.classList.add("animate-bot-choice");
      } else {
        choiceHTML.parentNode.removeChild(choiceHTML);
      }
    }
  }

  function renderHighlightHTML(gameOutcome) {
    let isPlayerWinner = gameOutcome === GAME_OUTCOMES.win;

    if (gameOutcome === GAME_OUTCOMES.tie) return;

    const highlightHTML = formatHighlightHTML(isPlayerWinner);

    document
      .querySelector(DOM_STRINGS.backgroundEffectContainer)
      .insertAdjacentHTML("afterbegin", highlightHTML);
  }

  function updateScoreInnerHTML(score) {
    const scoreHTML = document.querySelector(DOM_STRINGS.score);

    scoreHTML.innerHTML = score;
  }

  function renderGameOveralyHTML(gameOutcome) {
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
  }

  function emptyGameBoardContainer() {
    const containers = [
      document.querySelector(DOM_STRINGS.backgroundEffectContainer),
      document.querySelector(DOM_STRINGS.playAreaContainer),
      document.querySelector(DOM_STRINGS.gameOverlayContainer),
    ];

    containers.forEach(emptyContainerInnerHTML);

    function emptyContainerInnerHTML(container) {
      container.innerHTML = "";
    }
  }

  function init() {
    renderPlayAreaBackgroundHTML();
    renderPlayerChoicesHTML();
  }
})();

export default uiController;

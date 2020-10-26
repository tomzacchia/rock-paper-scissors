import paperSvg from "../resources/icon-paper.svg";
import scissorsSvg from "../resources/icon-scissors.svg";
import rockSvg from "../resources/icon-rock.svg";

const uiController = (function () {
  const DOM_STRINGS = {
    backgroundEffectContainer: ".background-effects-container",
    playAreaContainer: ".play-area-container",
    score: ".score",
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
      <div class="choice-container paper" data-user-selection="paper">
        <div class="choice-white-bg">
          <img src="${paperSvg}" alt="paper" />
        </div>
      </div>
      <div class="choice-container scissors" data-user-selection="scissors">
        <div class="choice-white-bg">
          <img src="${scissorsSvg}" alt="scissors" />
        </div>
      </div>
      <div class="choice-container rock" data-user-selection="rock">
        <div class="choice-white-bg">
          <img src="${rockSvg}" alt="rock" />
        </div>
      </div>
    </div>
  `;

  const gameOverlayHTML = `
    <div class="game-overlay-container absolute-horizontal-center">
      <div class="winner-message-container">
        <p>YOU PICKED</p>
        <p class="message-right">THE HOUSE PICKED</p>
      </div>

      <div class="button-container">
        <h1>%message%</h1>
        <button>PLAY AGAIN</button>
      </div>
    </div>
  `;

  const formatHighlightHTML = function (isPlayerWinner) {
    let newHtml;

    isPlayerWinner
      ? (newHtml = highlightHTML.replaceAll("%winner%", "left"))
      : (newHtml = highlightHTML.replaceAll("%winner%", "right"));

    return newHtml;
  };

  return {
    renderHighlightHTML: function (isPlayerWinner) {
      const highlightHTML = formatHighlightHTML(isPlayerWinner);

      document
        .querySelector(DOM_STRINGS.backgroundEffectContainer)
        .insertAdjacentHTML("afterbegin", highlightHTML);
    },

    renderPlayAreaBackgroundHTML: function () {
      document
        .querySelector(DOM_STRINGS.playAreaContainer)
        .insertAdjacentHTML("afterbegin", playAreaBackgroundHTML);
    },

    renderPlayerChoiceHTML: function () {
      document
        .querySelector(DOM_STRINGS.playAreaContainer)
        .insertAdjacentHTML("beforeend", playerChoicesHTML);
    },

    updateScore: function (score) {
      const scoreHTML = document.querySelector(DOM_STRINGS.score);

      scoreHTML.innerHTML = score;
    },

    renderGameOveralyHTML: function (isWinner) {
      let message = isWinner ? "YOU WIN" : "YOU LOSE";
      let newHTML = gameOverlayHTML.replace("%message%", message);

      document
        .querySelector(DOM_STRINGS.playAreaContainer)
        .insertAdjacentHTML("beforeend", newHTML);
    },

    triggerGameBoardAnimation: function (playerSelection, botSelection) {
      let choicesHTMLArr = document.querySelectorAll(".choice-container");

      choicesHTMLArr.forEach((choiceHTML) => {
        if (choiceHTML.dataset.userSelection === playerSelection) {
          choiceHTML.classList.add("animate-player-choice");
        } else if (choiceHTML.dataset.userSelection === botSelection) {
          choiceHTML.classList.add("animate-bot-choice");
        } else {
          choiceHTML.parentNode.removeChild(choiceHTML);
        }
      });
    },

    init: function () {
      this.renderPlayAreaBackgroundHTML();
      this.renderPlayerChoiceHTML();

      setTimeout(() => this.triggerGameBoardAnimation("rock", "paper"), 2000);
    },
  };
})();

export default uiController;

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

  const formatHighlightHTML = function (isPlayerWinner) {
    let newHtml;

    isPlayerWinner
      ? (newHtml = highlightElement.replaceAll("%winner%", "left"))
      : (newHtml = highlightElement.replaceAll("%winner%", "right"));

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
      document.querySelector(DOM_STRINGS.score).innerHTML = score;
    },

    init: function () {
      this.renderPlayAreaBackgroundHTML();
      this.renderPlayerChoiceHTML();
      this.updateScore(0);
    },
  };
})();

export default uiController;

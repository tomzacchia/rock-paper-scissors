const uiController = (function () {
  const DOM_STRINGS = {
    backgroundEffectContainer: ".background-effects-container",
  };

  const highlightElement = `
          <div class="highlight-container highlight-container-%winner%">
          <div class="highlight highlight-sm highlight-sm-%winner%"></div>
          <div class="highlight highlight-md highlight-md-%winner%"></div>
          <div class="highlight highlight-lg highlight-lg-%winner%"></div>
        </div>
  `;

  const formatHighlightElement = function (isPlayerWinner) {
    let newHtml;

    isPlayerWinner
      ? (newHtml = highlightElement.replaceAll("%winner%", "left"))
      : (newHtml = highlightElement.replaceAll("%winner%", "right"));

    return newHtml;
  };

  return {
    renderHighlightElement: function (isPlayerWinner) {
      const highlightHTML = formatHighlightElement(isPlayerWinner);

      document
        .querySelector(DOM_STRINGS.backgroundEffectContainer)
        .insertAdjacentHTML("afterbegin", highlightHTML);
    },
  };
})();

export default uiController;

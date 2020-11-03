const HTML_MARKUP_CONSTANTS = {
  highlightHTML: `
    <div class="highlight-container highlight-container-%winner%">
      <div class="highlight highlight-sm highlight-sm-%winner%"></div>
      <div class="highlight highlight-md highlight-md-%winner%"></div>
      <div class="highlight highlight-lg highlight-lg-%winner%"></div>
    </div>
  `,
  playAreaBackgroundHTML: `
    <div class="play-area-bg absolute-horizontal-center"></div>
  `,
  choiceHTML: `
    <div class="choice-container %choice-type%" data-user-choice="%choice-type%">
      <div class="choice-white-bg">
        <img src="%img-url%" alt="%choice-type%" />
      </div>
    </div>
  `,
  gameOverlayHTML: `
    <div class="winner-message-container">
      <p>YOU PICKED</p>
      <p class="message-right">THE HOUSE PICKED</p>
    </div>

    <div class="button-container">
      <h1>%message%</h1>
      <button class="play-again-button">PLAY AGAIN</button>
    </div>
  `,
};

export default HTML_MARKUP_CONSTANTS;

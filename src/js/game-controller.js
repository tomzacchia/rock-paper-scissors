const gameController = (function () {
  let state = {
    botSelection: "",
    playerSelection: "",
    isPlayerWinner: "",
    isGameActive: true,
    playerScore: 0,
  };

  return {
    init: function () {
      console.log("gameController");
    },
  };
})();

export default gameController;

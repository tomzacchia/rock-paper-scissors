import "../scss/styles.scss";
import gameController from "./game-controller";
import uiController from "./ui-controller";

const appController = (function (gameController, uiController) {
  console.log("inside appController");
  gameController.init();
  uiController.renderHighlightElement();
})(gameController, uiController);

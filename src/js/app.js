import "../scss/styles.scss";
import gameController from "./game-controller";
import uiController from "./ui-controller";

const appController = (function (gameController, uiController) {
  uiController.init();
})(gameController, uiController);

import KeyBoard from "./KeyboardState.js";
import { throttle } from "../utils.js";

export function setupKeyBoard(res) {
  const keyBoard = new KeyBoard();
  keyBoard.addMapping(
    "Space",
    throttle((keyState) => {
      if (keyState) {
        res.jump.start();
      } else {
        res.jump.cancel();
      }
    }, 100)
  );
  keyBoard.addMapping(
    "ArrowRight",
    throttle((keyState) => {
      res.go.dir = keyState;
    }, 50)
  );
  keyBoard.addMapping(
    "ArrowLeft",
    throttle((keyState) => {
      res.go.dir = -keyState;
    }, 50)
  );
  keyBoard.addMapping("KeyD", (keyState) => {
    res.go.dir = keyState;
  });

  keyBoard.addMapping("KeyA", (keyState) => {
    res.go.dir = -keyState;
  });

  keyBoard.listenTo(window);
  return keyBoard;
}

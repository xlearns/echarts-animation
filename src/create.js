import Entity from "./entity.js";
import Go from "./action/Go.js";
import Jump from "./action/Jump.js";
import Velocity from "./action/Velocity.js";
export function createHero() {
  const snow = new Entity("snow");
  snow.size.set(14, 16);
  snow.addDeps(new Go(snow));
  snow.addDeps(new Jump(snow));
  // snow.addDeps(new Velocity(snow));
  snow.draw = function drawHero(context) {};
  return snow;
}

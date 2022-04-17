import { Name } from "./../../utils.js";

export default class Velocity extends Name {
  constructor() {
    super("velocity");
  }
  update(dt, res) {
    res.pos.x = res.vel.x * dt;
    res.pos.y = res.vel.x * dt;
  }
}

import { Name } from "./../../utils.js";
export default class Jump extends Name {
  constructor(ref) {
    super("jump");
    this.ref = ref;
    this.duration = 0.3;
    this.engageTime = 0;
    this.velocity = 230;
  }
  start() {
    this.ref.motionStatus = 1;
    this.engageTime = this.duration;
  }
  cancel() {
    this.ref.motionStatus = 0;
    this.engageTime = 0;
  }
  update(dt, res) {
    if (this.engageTime > 0) {
      res.vel.y = -this.velocity;
      this.engageTime -= dt;
    } else {
      res.vel.y = 0;
    }
  }
}

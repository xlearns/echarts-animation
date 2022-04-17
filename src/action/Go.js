import { Name } from "./../../utils.js";
export default class Go extends Name {
  constructor(ref) {
    super("go");
    this.ref = ref;
    this.dir = 0;
    this.speed = 6000;
  }
  update(dt, res) {
    res.vel.x = this.speed * this.dir * dt;
    if (res.vel.x > 0) {
      if (this.ref.walkingLoopStatus === 0) {
        this.ref.walkingLoopStatus = 1;
      } else if (this.ref.walkingLoopStatus === 1) {
        this.ref.walkingLoopStatus = 0;
      }
    }
  }
}

import { Vec2 } from "./../utils.js";
export default class Entity {
  constructor(config) {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.type = config;
    this.deps = [];
  }
  addDeps(dep) {
    this.deps.push(dep);
    this[dep.name] = dep;
  }
  update(dt) {
    this.deps.forEach((dep) => dep.update(dt, this));
  }
}

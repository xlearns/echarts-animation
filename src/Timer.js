export default class Timer {
  constructor(dt = 1 / 60) {
    let totalTime = 0;
    let lastTime = 0;

    this.updateProxy = (time) => {
      totalTime += (time - lastTime) / 1000;

      while (totalTime > dt) {
        this.update(dt);
        totalTime -= dt;
      }

      lastTime = time;

      this.kickoffLoop();
    };
  }

  kickoffLoop() {
    requestAnimationFrame(this.updateProxy);
  }

  start() {
    this.kickoffLoop();
  }
}

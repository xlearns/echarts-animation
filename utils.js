let env = "dev";
export function log(v, colors = "blue") {
  if (!env == "dev") return;
  if (typeof v === "string") console.log(`%c${v}`, `color:${colors}`);
  else console.log(v);
}

export function sleep(timer = 100) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, timer);
  });
}

export function throttle(fn, delay) {
  let wait = false;
  return function () {
    if (!wait) {
      wait = true;
      setTimeout(() => {
        fn(...arguments);
        wait = false;
      }, delay);
    }
  };
}

export class Vec2 {
  constructor(x, y) {
    this.set(x, y);
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Name {
  constructor(name) {
    this.name = name;
  }
}

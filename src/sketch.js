import p5 from "p5";

const WIDTH = 720;
const HEIGHT = 720;
const TRAIL = 3;

class Orb {
  constructor({ x, y, r, p }) {
    this.x = Array(TRAIL)
      .fill(null)
      .map(() => x);
    this.y = Array(TRAIL)
      .fill(null)
      .map(() => y);
    this.r = r;
    this.p = p;
  }

  update() {
    this.x.push(this.p.mouseX);
    this.y.push(this.p.mouseY);
    this.x.shift();
    this.y.shift();
  }

  draw() {
    if (this.x.length !== TRAIL || this.y.length !== TRAIL) {
      throw new Error("Unexpected position array size");
    }

    for (let i = 0; i < TRAIL; i++) {
      this.p.blendMode(this.p.ADD);
      this.p.colorMode(this.p.HSB);
      this.p.fill(
        this.p.lerp(240, 0, i / (TRAIL - 1)),
        100,
        100
      );

      this.p.circle(this.x[i], this.y[i], this.r * 2);
    }
  }
}

/** @type {(p: p5) => void} */
export default (p) => {
  let orb;

  /**
   * Runs once at the beginning of the sketch.
   */
  p.setup = () => {
    p.createCanvas(WIDTH, HEIGHT);
    p.background(0);

    orb = new Orb({ x: p.mouseX, y: p.mouseY, r: 50, p });
  };

  /**
   * Runs once for each frame
   */
  p.draw = () => {
    p.clear();
    orb.update();
    orb.draw();
  };
};

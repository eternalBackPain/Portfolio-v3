class RedDot {
  constructor(posx, posy, velx, vely, accx, accy) {
    this.pos = createVector(posx, posy);
    this.vel = createVector(velx, vely);
    this.acc = createVector(accx, accy);
    this.r = 15;
    this.red = 255;
    this.green = 0;
    this.blue = 0;
  }
  update() {
    this.vel.add(this.acc).limit(7);
    this.pos.add(this.vel);
  }

  show() {
    fill(this.red, this.green, this.blue);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  }

  leap(x) {
    this.acc.y = 0;
    const jumpVel = createVector(0, x).setMag(10);
    this.vel.add(jumpVel);
    const jumpAcc = createVector(0, 1).setMag(0.1);
    this.acc.add(jumpAcc);
  }

  move(direction) {
    if (direction == "left") {
      const moveLeft = createVector(-1, 0).setMag(50);
      this.vel.add(moveLeft);
    }
    if (direction == "right") {
      const moveRight = createVector(1, 0).setMag(50);
      this.vel.add(moveRight);
    }
  }

  bounce() {
    if (this.pos.x <= 0 + this.r) {
      this.pos.x = 0 + this.r;
      this.vel.x *= -1;
      // window.location.href = '/new-page.html'
    } else if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.y <= 0 + this.r) {
      this.pos.y = 0 + this.r;
      this.vel.y *= -1;
    } else if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    } else false;
  }
}

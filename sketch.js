// Moving the redDot
// function keyPressed() {
//   if (keyCode === UP_ARROW && keyIsPressed) {
//       redDot.leap(-1);
//   } else if (keyCode === DOWN_ARROW && keyIsPressed) {
//       redDot.leap(1);
//   } else if (keyCode === LEFT_ARROW && keyIsPressed) {
//       redDot.move('left');
//   } else if (keyCode === RIGHT_ARROW && keyIsPressed) {
//       redDot.move('right');
//   } else false;
// }

let circles = [];
let numCircles = 60;
let gravity = 0.005;
let windResistance = 0.999;


function setup() {
  const canvasContainer = select(".canvas-container");
  const canvas = createCanvas(
    document.body.scrollWidth,
    document.body.scrollHeight
  );
  canvas.parent(canvasContainer);

  for (let i = 0; i < numCircles; i++) {
    let x = random(width);
    let y = 11;
    let r = random(5, 10);
    let xSpeed = random(-5, 5);
    let ySpeed = random(-5, 5);
    let circle = new Circle(x, y, r, xSpeed, ySpeed);
    circles.push(circle);
  }

  // redDot = new RedDot(770, 325, 0, 0, 0, 0);
}

function windowResized() {
  resizeCanvas(document.body.scrollWidth, document.body.scrollHeight);
}

function draw() {
  //add some creative code here
  background(255, 255, 255, 10);
  for (let circle of circles) {
    circle.applyGravity();
    circle.applyWindResistance();
    circle.update();
    circle.display();
  }
  //Draw RedDot
  // redDot.show();
  // redDot.update();
  // redDot.bounce();
}

function mousePressed() {
  for (let circle of circles) {
    circle.jump();
  }
}

class Circle {
  constructor(x, y, r, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
  }

  applyGravity() {
    this.ySpeed += gravity;
  }

  applyWindResistance() {
    this.xSpeed *= windResistance;
    this.ySpeed *= windResistance;
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x + this.r > width || this.x - this.r < 0) {
      this.xSpeed = -this.xSpeed;
    }
    if (this.y + this.r > height || this.y - this.r < 0) {
      this.ySpeed = -this.ySpeed;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(frameCount / 50.0);
    fill(255, 0, 0);
    noStroke();
    ellipse(0, 0, this.r * 2, this.r * 2);
    pop();
  }

  jump() {
    this.xSpeed = random(-10, 10);
    this.ySpeed = random(-10, 0);
  }
}

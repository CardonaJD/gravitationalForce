let planet;
let sun;

function setup() {
  createCanvas(400, 400);
  planet = new Ball(1, 100, 150);
  sun = new Sun();
}

function draw() {
    background(0);
  // let g = createVector (-0.2 , 0);

  planet.show();
  planet.update();
	planet.gravityForce(sun);


  sun.display();
  // b.applyForce(g.mult(b.m));
  planet.edges();

}




function Ball(mass, x, y) {
  this.position = createVector(x, y);
  this.velocity = createVector(0,1, 0,5);
  this.acele = createVector(0, 0);
  this.m = mass;

  this.show = function() {
    fill(255);
    ellipse(this.position.x, this.position.y, this.m * 15, this.m * 15);
  }

  this.update = function() {
    this.velocity.add(this.acele);
    this.position.add(this.velocity);

    this.acele.mult(0);
  }

  this.applyForce = function(force) {

    let f = force.copy();
    f.div(this.m);

    this.acele.add(f);
  }

  this.gravityForce = function( a ) {
    let c = a.position.copy();
    let distance = c.sub(this.position);
    let d = distance.mag();

    d = constrain( d , 5 ,25);
    let mag = a.G * a.m * this.m / (d * d);
    distance.normalize().mult(mag);

    this.applyForce(distance);

  }

  this.edges = function() {
    if (this.position.y > height) {
      this.position.y = 0
    };
    if (this.position.y < 0) {
      this.position.y = height
    };
    if (this.position.x > width) {
      this.position.x = 0
    };
    if (this.position.x < 0) {
      this.position.x = width
    };
  }
}

function Sun() {
  this.position = createVector(width / 2, height / 2);
  this.m = 3;
  this.G = 10;

  this.display = function() {
		fill(255);
    ellipse(this.position.x, this.position.y, this.m * 15, this.m * 15);
  }
}

class Particle {
  constructor(id, pos, vel, connectionDistance, distancesMatrix) {
    this.id = id;
    this.connectedTo = [];
    this.connectionDistance = connectionDistance

    this.distancesMatrix = distancesMatrix; // Optimization: Every particle knows every other

    this.pos = pos;
    this.vel = vel;
    this.acc = createVector(0, 0);
    this.maxVel = 5;

    this.baseSize = 5;
    this.size = this.calcSize();
    this.mass = this.calcMass();
    this.color = color('white');
    this.connectionColor = this.color;
    this.connectionWidth = 0.3;

    this.minAttractionDistance = 0;
  }

  calcMass() {
    return this.size * 2;
  }

  calcSize() {
    return this.baseSize + this.connectedTo.length * 0.12;
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  }

  connectTo(particle) {
    this.connectedTo.push(particle);
  }

  disconnectFrom(particle) {
    let index = this.connectedTo.indexOf(particle);
    this.connectedTo.splice(index, 1);
  }

  isConnectedTo(particle) {
    return this.connectedTo.includes(particle);
  }

  getDistanceTo(particle) {
    return this.distancesMatrix[this.id][particle.id];
  }

  collideWith(particle) {
    // TODO: Implement
  }

  checkForConnectionEffects() {
    for (let i = this.connectedTo.length - 1; i >= 0 ; i--) {
      let that = this.connectedTo[i];
      if (this.isWithinConnectionDistanceTo(that)) {
        this.attract(that);
      } else {
        this.disconnectFrom(that);
      }
    }
  }

  isWithinConnectionDistanceTo(that) {
    return this.getDistanceTo(that) < this.connectionDistance;
  }

  attract(that) {
    let thatPos = that.pos.copy();
    let force = thatPos.sub(this.pos);
    let distance = force.mag();
    distance = constrain(distance, this.minAttractionDistance, this.connectionDistance);

    let m = (G * this.mass * that.mass) / (distance**2);
    force.normalize();
    force.mult(-m);
    that.applyForce(force);
  }

  edges() {
    let pos = this.pos;
    if (pos.x >= width) pos.x = 0;
    else if (pos.x <= 0) pos.x = width;
    if (pos.y >= height) pos.y = 0;
    else if (pos.y <= 0) pos.y = height;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.edges();

    this.checkForConnectionEffects();
    this.size = this.calcSize();
    this.mass = this.calcMass();
    this.minAttractionDistance = this.size * 2.5;
  }

  display() {
    stroke(this.connectionColor);
    strokeWeight(this.connectionWidth);
    this.connectedTo.forEach(particle => {
      line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
    });

    ellipseMode(CENTER);
    fill(this.color);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }
}

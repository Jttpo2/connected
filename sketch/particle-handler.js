class ParticleHandler {
  constructor(noOfParticles) {
    this.noOfParticles = noOfParticles;
    this.particles = [];
    this.maxInitVel = 2;
    this.maxConnectionDistance = 150;
  }

  init() {
    for(let p=0; p<this.noOfParticles; p++) {
      let randX = Math.random() * width;
      let randY = Math.random() * height;
      let pos = createVector(randX, randY);
      let vel = p5.Vector.random2D().mult(this.maxInitVel);
      this.particles.push(new Particle(pos, vel, this.maxConnectionDistance));

    }
    // this.particles[0].connectTo(this.particles[1]);
  }

  run() {
    this.update();
    this.display();

    this.particles.forEach(particle => particle.run());
  }

  update() {
    this.checkForProximity();
    // this.particles.forEach(particle => particle.update());
  }

  display() {
    // this.particles.forEach(particle => particle.display());
  }

  checkForProximity() {
    for (let i = 0; i < this.particles.length; i++) {
      // Limiting array lookups to half for optimization purposes
      for (let j = i + 1; j < this.particles.length; j ++) {
        let p1 = this.particles[i];
        let p2 = this.particles[j];
        if (p1 == p2) return;
        else {
          let distanceBetween = p1.getDistanceTo(p2);
          if (distanceBetween < (p1.size / 2 + p2.size / 2)) {
            p1.collideWith(p2);
            p2.collideWith(p1);
          } else {
            if (!p1.isConnectedTo(p2) && distanceBetween < this.maxConnectionDistance) {
              p1.connectTo(p2);
            }
          }
        }
      }
    }
  }

}

class ParticleHandler {
  constructor(noOfParticles) {
    this.noOfParticles = noOfParticles;
    this.particles = [];
    this.maxInitVel = 2;
    this.maxConnectionDistance = 150;

    this.currentNumberOfParticles = 0;

    this.distances = new Array(this.noOfParticles);
    for (let i = this.distances.length; i >= 0 ; i--) {
      this.distances[i] = new Array(i);
    }
  }

  init() {
    for(let p=0; p<this.noOfParticles; p++) {
      let randX = Math.random() * width;
      let randY = Math.random() * height;
      let pos = createVector(randX, randY);
      let vel = p5.Vector.random2D().mult(this.maxInitVel);
      this.particles.push(
        new Particle(
          this.currentNumberOfParticles,
          pos,
          vel,
          this.maxConnectionDistance,
          this.distances)
        );
        this.currentNumberOfParticles++;


      }
    }

    run() {
      this.update();
      this.display();
    }

    update() {
      this.runThroughParticleDistanceMatrix();
    }

    display() {
      this.particles.forEach(particle => particle.display());
    }

    runThroughParticleDistanceMatrix() {
      for (let i = 0; i < this.particles.length; i++) {
        // Limiting array lookups to half for optimization purposes
        for (let j = i + 1; j < this.particles.length; j ++) {
          this.updateDistance(i, j);
          this.checkForProximity(i, j);
        }
        this.particles[i].update();
      }
    }

    updateDistance(row, col) {
      this.distances[row][col] = this.particles[row].pos.dist(this.particles[col].pos);
    }

    checkForProximity(row, col) {
      let p1 = this.particles[row];
      let p2 = this.particles[col];
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

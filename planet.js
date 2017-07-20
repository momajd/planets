/* eslint no-undef:1, max-len:0*/

class Planet {
  constructor(name, color, mass, radius, initialPosition, initialVelocity, solarSystem) {
    this.name = name;
    this.color = color;
    // mass in kg, distance in km, vel in km/s
    this.mass = mass;
    this.radius = radius;
    this.position = initialPosition;
    this.velocity = initialVelocity;
    this.acceleration = new Acceleration(0, 0);
    this.solarSystem = solarSystem;
    // this.trailCoords = [];
  }

  step() {
    const G = 6.674e-11; //gravitational constant
    let timeInterval = this.solarSystem.timeInterval;
    this.position.x += this.velocity.x * timeInterval;
    this.position.y += this.velocity.y * timeInterval;
    // this.pushToTrail(new Position(this.position.x, this.position.y));

    this.solarSystem.planets.forEach(planet => {
      if (this !== planet) {
        let rx = this.position.x - planet.position.x;
        let ry = this.position.y - planet.position.y;
        let r = Math.sqrt(Math.pow(rx, 2) + Math.pow(ry, 2));

        // Universal law of gravitation
        let F = G * this.mass * planet.mass / Math.pow(r * 1000, 2); //newtons
        if (rx > 0) {F *= -1;}

        let theta = Math.atan(ry/rx);
        let Fx = F * Math.cos(theta);
        let Fy = F * Math.sin(theta);

        // Newton's 2nd Law
        this.acceleration.x = (Fx / this.mass) / 1000; // km/sec^2
        this.acceleration.y = (Fy / this.mass) / 1000;

        this.velocity.x += this.acceleration.x * timeInterval;
        this.velocity.y += this.acceleration.y * timeInterval;
      }
    });
  }
}

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceToOrigin() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
}

class Velocity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Acceleration {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}


const G = 6.674e-11;
const timeInterval = 10000; //in seconds

class Planet {
  constructor(name, mass, radius, position, velocity, acceleration, solarSystem) {
    this.name = name;
    // mass in kg, distance in km, vel in km/s
    this.mass = mass;
    this.radius = radius;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.solarSystem = solarSystem;
  }

  step() {
    this.position.x += this.velocity.x * timeInterval;
    this.position.y += this.velocity.y * timeInterval;

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

        if (this.name === "earth") {console.log(Fx, Fy);}
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

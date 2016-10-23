class SolarSystem {
  constructor () {
    this.planets = [];

    this.addPlanets();
  }

  addPlanets () {
    let sun = new Planet("sun", 1.989e30, 695700, new Position(0, 0), new Velocity(0, 0), new Acceleration(0, 0), this);
    let earth = new Planet("earth", 5.972e24, 6371, new Position(0, 1.496e8), new Velocity(30, 0), new Acceleration(0, 0), this);
    let mercury = new Planet("mercury", 3.285e23, 2440, new Position(0, 5.791e7), new Velocity(47.4, 0), new Acceleration(0, 0), this);

    let planets = [sun, earth, mercury];
    planets.forEach(planet => this.planets.push(planet));
  }
}

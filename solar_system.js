/* eslint no-undef:1, max-len:0*/

class SolarSystem {
  constructor (timeInterval) {
    this.timeInterval = timeInterval; //time that each step is calc'ed
    this.planets = [];
    this.addPlanets();
  }

  addPlanets () {
    let sun = new Planet("sun", 1.989e30, 695700, new Position(0, 0), new Velocity(0, 0), this);
    let earth = new Planet("earth", 5.972e24, 6371, new Position(0, 1.496e8), new Velocity(30, 0), this);
    let mars = new Planet("mars", 6.39e23, 3390, new Position(0, 2.279e8), new Velocity(24.1, 0), this);
    let jupiter = new Planet("jupiter", 1.898e27, 69911, new Position(0, 7.785e8), new Velocity(13.1, 0), this);
    let mercury = new Planet("mercury", 3.285e23, 2440, new Position(0, 5.791e7), new Velocity(47.4, 0), this);
    let venus = new Planet("venus", 4.867e24, 6052, new Position(0, 1.082e8), new Velocity(35, 0), this);
    let pluto = new Planet("pluto", 1.309e22, 1187, new Position(0, 4.44e9), new Velocity(4.75, 0), this);
    let saturn = new Planet("saturn", 5.683e26, 58232, new Position(0, 1.429e9), new Velocity(9.67, 0), this);
    let uranus = new Planet("uranus", 8.681e25, 25362, new Position(0, 2.871e9), new Velocity(6.84, 0), this);
    let neptune = new Planet("neptune", 1.024e26, 24622, new Position(0, 4.498e9), new Velocity(5.48, 0), this);

    let planets = [sun, earth, mars, jupiter, mercury, venus, pluto, saturn, uranus, neptune];
    planets.forEach(planet => this.planets.push(planet));
  }
}

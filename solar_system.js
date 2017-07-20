/* eslint no-undef:1, max-len:0 */
/* globals Planet Position Velocity */

class SolarSystem {
  constructor (timeInterval) {
    this.timeInterval = timeInterval; //time that each step is calc'ed
    this.planets = [];
    this.addPlanets();
  }

  addPlanets () {

    let sunRadius = 695700; //in kilometers
    sunRadius *= 50; //need to scale larger since radius is small compared to distance of planets
    // scale other planets in terms of sun radius for visual purposes
    // actual radii:
    // earth: 6371, mars: 3390, jupiter: 69911, mercury 2440, venus: 6052,
    // pluto: 1187, saturn 58232, uranus 25362, neptune 24622

    let sun = new Planet("sun", "#fbac13", 1.989e30, sunRadius, new Position(0, 0), new Velocity(0, 0), this);
    let earth = new Planet("earth", "blue", 5.972e24, 1/4*sunRadius, new Position(0, 1.496e8), new Velocity(30, 0), this);
    let mars = new Planet("mars", "#FF4500", 6.39e23, 1/8*sunRadius, new Position(0, 2.279e8), new Velocity(24.1, 0), this);
    let jupiter = new Planet("jupiter", "#FF8C00", 1.898e27, 3/4*sunRadius, new Position(0, 7.785e8), new Velocity(13.1, 0), this);
    let mercury = new Planet("mercury", "#A9A9A9", 3.285e23, 1/8*sunRadius, new Position(0, 5.791e7), new Velocity(47.4, 0), this);
    let venus = new Planet("venus", "#f5f5dc", 4.867e24, 1/4*sunRadius, new Position(0, 1.082e8), new Velocity(35, 0), this);
    let pluto = new Planet("pluto", "lightcyan", 1.309e22, 1/16*sunRadius, new Position(4.44e9, 0), new Velocity(0, -4.75), this);
    let saturn = new Planet("saturn", "#FFA500", 5.683e26, 3/4*sunRadius, new Position(0, 1.429e9), new Velocity(9.67, 0), this);
    let uranus = new Planet("uranus", "#FF4500", 8.681e25, 1/2*sunRadius, new Position(0, 2.871e9), new Velocity(6.84, 0), this);
    let neptune = new Planet("neptune", "#00ffff", 1.024e26, 1/2*sunRadius, new Position(0, 4.498e9), new Velocity(5.48, 0), this);

    let planets = [sun, earth, mars, jupiter, mercury, venus, pluto, saturn, uranus, neptune];
    planets.forEach(planet => this.planets.push(planet));
  }
}

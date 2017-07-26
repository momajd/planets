# Planets

[Live Link](https://momajd.github.io/planets/)

A simulation of the solar system that uses Newton's Universal Law of Gravitation. User can modify the mass of each planet. Built with javascript and HTML5.

![Intro](https://media.giphy.com/media/OclNTHOaVRggU/giphy.gif)

```javascript
// planet.js

step() {
  const G = 6.674e-11; //gravitational constant
  let timeInterval = this.solarSystem.timeInterval;

  if (!this.solarSystem.isPaused) {
    this.position.x += this.velocity.x * timeInterval;
    this.position.y += this.velocity.y * timeInterval;
    this.updateMass();

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

```

class View {
  constructor(context, scale, solarSystem) {
    this.context = context;
    this.scale = scale;
    this.solarSystem = solarSystem;
    this.years = 0;

    this.drawAllPlanets();
    this.addZoom();
  }

  drawAllPlanets() {
    let ctx = this.context;
    let offsetX = ctx.canvas.width / 2; //use offsets to center the sun
    let offsetY = ctx.canvas.height / 2;
    let scale = this.scale;

    this.solarSystem.planets.forEach(planet => {
      planet.step();
      ctx.beginPath();
      ctx.arc(
        planet.position.x * scale + offsetX,
        planet.position.y * scale + offsetY,
        planet.radius * scale,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = planet.color;
      ctx.fill();

      // for text
      if (planet.position.distanceToOrigin() * scale > 20 || planet.name === "sun") {
        ctx.font="16px Helvetica, Arial, sans-serif";
        ctx.fillText(
          planet.name,
          (planet.position.x + planet.radius) * scale + offsetX + 5,
          planet.position.y * scale + offsetY
        );
      }
    });
  }

  drawDistanceMarkers() {
    let ctx = this.context;
    let offsetX = ctx.canvas.width / 2;
    let offsetY = ctx.canvas.height / 2;

    let rad = 1e8;
    let markerRadii = [rad, 1.5*rad, 5*rad, 10*rad, 20*rad, 50*rad];

    markerRadii.forEach(radius => {
      ctx.beginPath();
      ctx.arc(offsetX, offsetY, radius * this.scale, 0, 2*Math.PI);
      ctx.strokeStyle = "green";
      ctx.stroke();

      // only label marker if radius is big enough
      if (radius*this.scale > 100) {
        ctx.fillStyle = "green";
        ctx.font="14px Helvetica, Arial, sans-serif";
        ctx.fillText(
          radius.toExponential() + " km",
          -radius * this.scale + offsetX ,
          offsetY
        );
      }
    });
  }

  animate() {
    setInterval(function () {
      let canvasEl = this.context.canvas;
      this.context.clearRect(0, 0, canvasEl.width, canvasEl.height);
      this.drawAllPlanets();
      this.calculateTime();
      this.drawDistanceMarkers();
    }.bind(this), 10);
  }

  addZoom() {
    this.context.canvas.addEventListener("mousewheel", function(e) {
      e.preventDefault();
      if (this.scale > 0.00000005 && e.deltaY > 0) {
        this.scale -= e.deltaY/1000000000;
      } else if (this.scale < .00001 && e.deltaY < 0) {
        this.scale -= e.deltaY/1000000000;
      }
    }.bind(this));
  }

  calculateTime() {
    this.years += this.solarSystem.timeInterval/60/60/24/365;
    document.getElementById("time-count").innerHTML = this.years.toFixed(5);
  }
}

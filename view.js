class View {
  constructor(context, scale, solarSystem) {
    this.context = context;
    this.scale = scale;
    this.solarSystem = solarSystem;

    this.drawPlanets();
  }

  drawPlanets() {
    let ctx = this.context;
    let offsetX = ctx.canvas.width / 2;
    let offsetY = ctx.canvas.height / 2;
    let scale = this.scale;

    this.solarSystem.planets.forEach(planet => {
      planet.step();
      ctx.beginPath();
      ctx.arc(planet.position.x * scale + offsetX,
              planet.position.y * scale + offsetY,
              planet.radius * 50 * scale, //scale planet radius larger
              0,
              2 * Math.PI
             );
      ctx.stroke();
    });
  }

  animate() {
    setInterval(function () {
      let canvasEl = this.context.canvas;
      this.context.clearRect(0, 0, canvasEl.width, canvasEl.height);
      this.drawPlanets();
    }.bind(this), 10);
  }
}
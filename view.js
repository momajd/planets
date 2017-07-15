class View {
  constructor(context, scale, solarSystem) {
    this.context = context;
    this.scale = scale;
    this.solarSystem = solarSystem;

    this.drawPlanets();
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
      ctx.stroke();

      ctx.font="20px Georgia";
      ctx.fillText(
        planet.name,
        (planet.position.x + 5/4 * planet.radius) * scale + offsetX,
        planet.position.y * scale + offsetY
      );
    });
  }

  drawPlanet() {
    context.beginPath();
    context.arc(cw/2,ch/2,75,0,Math.PI*2);
    context.fillStyle='lightcyan';
    context.fill();

    context.globalCompositeOperation='source-atop';

    context.shadowOffsetX = 500;
    context.shadowOffsetY = 0;
    context.shadowBlur = 15;
    context.shadowColor = 'rgba(30,30,30,1)';

    context.beginPath();
    context.arc(cw/2-500,ch/2,75,0,Math.PI*2);
    context.stroke();
    context.stroke();
    context.stroke();

    context.globalCompositeOperation='source-over';
  }

  animate() {
    setInterval(function () {
      let canvasEl = this.context.canvas;
      this.context.clearRect(0, 0, canvasEl.width, canvasEl.height);
      this.drawPlanets();
    }.bind(this), 10);
  }

  addZoom() {
    this.context.canvas.addEventListener("mousewheel", function(e) {
      if (this.scale > 0.00000001 && e.deltaY > 0) {
        this.scale -= e.deltaY/1000000000;
      } else if (this.scale < .00001 && e.deltaY < 0) {
        this.scale -= e.deltaY/1000000000;
      }
      console.log(this.scale);
    }.bind(this));
  }
}

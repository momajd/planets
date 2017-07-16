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
      ctx.fillStyle=planet.color;
      ctx.fill();

      // for shadow
      ctx.globalCompositeOperation='source-atop';

      ctx.shadowOffsetX = 500;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(30,30,30,1)';

      ctx.beginPath();
      ctx.arc(
        planet.position.x * scale + offsetX - 500,
        planet.position.y * scale + offsetY,
        75,0,Math.PI*2);
      ctx.stroke();
      ctx.stroke();
      ctx.stroke();

      ctx.globalCompositeOperation='source-over';

      // for text
      ctx.font="16px Helvetica, Arial, sans-serif";
      ctx.fillText(
        planet.name,
        (planet.position.x + 5/4 * planet.radius) * scale + offsetX,
        planet.position.y * scale + offsetY
      );

      // this.drawPlanetTrail(planet, offsetX, offsetY);
    });
  }

  animate() {
    setInterval(function () {
      let canvasEl = this.context.canvas;
      this.context.clearRect(0, 0, canvasEl.width, canvasEl.height);
      this.drawAllPlanets();
      this.calculateTime();
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
      console.log(this.scale);
    }.bind(this));
  }

  calculateTime() {
    this.years += this.solarSystem.timeInterval/60/60/24/365;
    document.getElementById("time-count").innerHTML = this.years.toFixed(5);
  }

  // very bad for performance
  // drawPlanetTrail(planet, canvasOffsetX, canvasOffsetY) {
  //   let ctx = this.context;
  //   planet.trailCoords.forEach(coord => {
  //     ctx.beginPath();
  //     ctx.arc(
  //       coord.x * this.scale + canvasOffsetX,
  //       coord.y * this.scale + canvasOffsetY,
  //       1,
  //       0,
  //       2 * Math.PI
  //     );
  //     ctx.fillStyle='lightcyan';
  //     ctx.fill();
  //   });
  // }
}

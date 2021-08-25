class Gem {
  constructor(ctx, map) {
    this.ctx = ctx;
    this.gemSize = {
      w: 100,
      h: 100,
    };
    // y: Math.floor(Math.random() * (max - min) + min)

    this.map = map;

    // console.log(map);

    // if (!map) {
    //   this.gemPosition = {
    //     x: Math.floor(Math.random() * (2250 - 250) + 250),
    //     y: Math.floor(Math.random() * (2250 - 250) + 250),
    //   };
    // } else {
    this.gemPosition = {
      x: Math.floor(Math.random() * (2250 - map.x) + map.x),
      y: Math.floor(Math.random() * (2250 - map.y) + map.y),
    };

    // console.log(this.gemPosition.x);
    // console.log(this.gemPosition.y);

    // }

    // this.canvasSize = canvasSize;

    this.correctionLeft = false;
    this.correctionRight = false;
    this.correctionUp = false;
    this.correctionDown = false;

    this.gem = new Image();
    this.gem.src = "../images/Untitled.png";
  }

  draw() {
    this.ctx.drawImage(
      this.gem,
      this.gemPosition.x,
      this.gemPosition.y,
      this.gemSize.w,
      this.gemSize.h
    );
    // console.log("hola");
    // console.log(this.ctx);
  }

  correction() {
    this.correctionLeft ? (this.gemPosition.x += 6) : null;
    this.correctionRight ? (this.gemPosition.x -= 6) : null;
    this.correctionUp ? (this.gemPosition.y += 6) : null;
    this.correctionDown ? (this.gemPosition.y -= 6) : null;
  }
}

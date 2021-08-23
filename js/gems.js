class Gem {
  constructor(ctx) {
    this.ctx = ctx;
    this.gemSize = {
      w: 100,
      h: 100,
    };
    this.gemPosition = {
      x: 0,
      y: 0,
      //   x: Math.floor(Math.random() * 2640) * -1,
      //   y: Math.floor(Math.random() * 2620) * -1,
    };

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
      this.gemSize.x,
      this.gemSize.y
    );
  }

  correction() {
    this.gemPosition.x < 130 && this.correctionLeft
      ? (this.gemPosition.x += 4)
      : null;
    this.gemPosition.x > -2640 && this.correctionRight
      ? (this.gemPosition.x -= 4)
      : null;
    this.gemPosition.y < 108 && this.correctionUp
      ? (this.gemPosition.y += 4)
      : null;
    this.gemPosition.y > -2620 && this.correctionDown
      ? (this.gemPosition.y -= 4)
      : null;
  }
}

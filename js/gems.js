class Gem {
  constructor(ctx) {
    this.ctx = ctx;
    this.gemSize = {
      w: 100,
      h: 100,
    };
    this.gemPosition = {
      // x: 200,
      // y: 0,
      x: Math.floor(Math.random() * 2000),
      y: Math.floor(Math.random() * 2000),
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
    this.correctionLeft ? (this.gemPosition.x += 6) : null;
    this.correctionRight ? (this.gemPosition.x -= 6) : null;
    this.correctionUp ? (this.gemPosition.y += 6) : null;
    this.correctionDown ? (this.gemPosition.y -= 6) : null;
  }
}

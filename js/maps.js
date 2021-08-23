class Map {
  constructor(ctx, canvasSize) {
    this.ctx = ctx;
    this.mapPosition = {
      x: 0,
      y: 0,
    };
    this.mapSize = {
      w: 2800,
      h: 2800,
    };
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;

    this.map = new Image();
    this.map.src = "../images/pixil-frame-0.png";
  }

  drawMap() {
    this.ctx.drawImage(
      this.map,
      this.mapPosition.x,
      this.mapPosition.y,
      this.mapSize.w,
      this.mapSize.h
    );
  }

  move() {
    this.mapPosition.x < 130 && this.moveLeft
      ? (this.mapPosition.x += 4)
      : null;
    this.mapPosition.x > -2640 && this.moveRight
      ? (this.mapPosition.x -= 4)
      : null;
    this.mapPosition.y < 108 && this.moveUp ? (this.mapPosition.y += 4) : null;
    this.mapPosition.y > -2620 && this.moveDown
      ? (this.mapPosition.y -= 4)
      : null;
  }
}

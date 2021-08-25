const gameApp = {
  ctx: undefined,
  canvasSize: {
    w: undefined,
    h: undefined,
  },
  magusSize: {
    w: 80,
    h: 80,
  },
  intervalId: undefined,
  score: 0,
  gems: [],
  MAX_Gems: 5,
  frameCounter: 0,
  timerCounter: 1000,
  referenceGem: undefined,

  init(canvas) {
    this.getContext(canvas);
    this.setCanvasDimension(canvas);
    this.newMap();
    this.magus = new Image();
    this.magus.src = "../images/wizard2.png";
    this.setListeners();
    this.createGems();
    console.log(this.gems);
    this.screenRefresh();
  },

  getContext(canvas) {
    this.ctx = canvas.getContext("2d");
  },

  setCanvasDimension(canvas) {
    this.canvasSize.w = 800;
    this.canvasSize.h = 800;

    canvas.setAttribute("width", this.canvasSize.w);
    canvas.setAttribute("height", this.canvasSize.h);
  },

  newMap() {
    this.map = new Map(this.ctx, this.canvasSize);
  },

  drawMagus() {
    this.ctx.drawImage(
      this.magus,
      this.canvasSize.w / 2 - this.magusSize.w / 2,
      this.canvasSize.h / 2 - this.magusSize.h / 2,
      this.magusSize.w,
      this.magusSize.h
    );
  },

  screenRefresh() {
    this.intervalId = setInterval(() => {
      this.clearCanvas();
      this.map.move();
      this.drawAll();
      this.pickUpGems();
      this.showScores();
      this.frameCounter++;
      // console.log(this.map.mapPosition);
      if (this.frameCounter % 100 === 0) {
        this.timerCounter--;
        this.filterGem();
      }
      if (this.timerCounter === 0) {
        this.outOfTime();
      }
      this.timer();
    }, 1000 / 60);
  },

  drawAll() {
    this.map.drawMap();
    this.drawMagus();
    this.gems.forEach((gem) => gem.draw());
  },

  setListeners() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.map.moveLeft = true;
          break;
        case "w":
          this.map.moveUp = true;
          break;
        case "d":
          this.map.moveRight = true;
          break;
        case "s":
          this.map.moveDown = true;
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "a":
          this.map.moveLeft = false;
          break;
        case "w":
          this.map.moveUp = false;
          break;
        case "d":
          this.map.moveRight = false;
          break;
        case "s":
          this.map.moveDown = false;
          break;
      }
    });
  },

  clearCanvas() {
    this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  },

  createGems() {
    for (let i = this.gems.length; i < this.MAX_Gems; i++) {
      const newGem = new Gem(this.ctx, this.map.mapPosition);
      this.gems.push(newGem);
    }
  },

  // Math.floor(Math.random() * (max - min) + min)

  filterGem() {
    this.gems = this.gems.filter(
      (gem) =>
        gem.gemPosition.x + this.map.mapPosition.x > this.map.mapPosition.x &&
        gem.gemPosition.x + this.map.mapPosition.x <
          this.map.mapPosition.x + 2400 &&
        gem.gemPosition.y + this.map.mapPosition.y > this.map.mapPosition.y &&
        gem.gemPosition.y + this.map.mapPosition.y <
          this.map.mapPosition.y + 2400
    );
    console.log(this.gems);
    this.gems.length < this.MAX_Gems ? this.createGems() : null;
    console.log(this.gems);
  },

  pickUpGems() {
    this.gems.forEach((gem, i) => {
      let playerPosX = this.canvasSize.w / 2 - this.magusSize.w / 2;
      let playerPosY = this.canvasSize.h / 2 - this.magusSize.h / 2;

      if (
        playerPosX <
          this.map.mapPosition.x + gem.gemPosition.x + gem.gemSize.w - 20 &&
        playerPosX + this.magusSize.w - 20 >
          this.map.mapPosition.x + gem.gemPosition.x &&
        playerPosY <
          this.map.mapPosition.y + gem.gemPosition.y + gem.gemSize.h - 20 &&
        this.magusSize.h - 20 + playerPosY >
          this.map.mapPosition.y + gem.gemPosition.y
      ) {
        this.score += 1;
        this.gems.splice(i, 1);
        // console.log(this.gems);
        // console.log(this.referenceGem)
        // console.log(this.gems);
        this.timerCounter += 5;
      }
    });
  },

  showScores() {
    // show scores
    this.ctx.font = "30px Verdana";
    this.ctx.fillText("Collected Gems: " + this.score, 500, 100);
  },

  timer() {
    this.ctx.font = "30px Verdana";
    this.ctx.fillText("Timer: " + this.timerCounter, 100, 100);
  },

  addZeros(num) {
    if (num < 10) {
      num = "0" + num;
    }
    return num;
  },

  outOfTime() {
    clearInterval(this.intervalId);
    setInterval(() => {
      console.log(this.ctx);
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h);
      this.ctx.strokeStyle = "purple";
      this.ctx.font = "80px Verdana";
      this.ctx.strokeText("Game Over", 200, 300);
      this.ctx.font = "40px Verdana";
      this.ctx.strokeText("You collected " + this.score + " gems!!!", 200, 400);

      console.log(this.ctx);
    }, 1000 / 60);
  },
};

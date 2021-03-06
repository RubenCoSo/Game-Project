const gameApp = {
  //canvas settings
  ctx: undefined,
  canvasSize: {
    w: undefined,
    h: undefined,
  },

  //player Image
  magusSize: {
    w: 80,
    h: 100,
  },
  wizardIndexX: 0,
  wizardIndexY: 0,
  wizImgW: 32,
  wizImgH: 48,
  magusMovement: false,

  //game settings
  intervalId: undefined,
  score: undefined,
  gems: [],
  MAX_Gems: 5,
  frameCounter: 0,
  timerCounter: 10,
  timerToShow: "",
  minutes: undefined,
  seconds: undefined,

  crystalSound: document.getElementById("pickAGem"),

  init(canvas) {
    this.getContext(canvas);
    this.setCanvasDimension(canvas);
    this.newMap();
    this.magus = new Image();
    this.magus.src = "../images/mage.png";
    this.setListeners();
    this.createGems();
    this.explosion = new Image();
    this.explosion.src = "../images/explossion.png";
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
      this.wizardIndexX * this.wizImgW,
      this.wizardIndexY * this.wizImgH,
      this.wizImgW,
      this.wizImgH,
      this.canvasSize.w / 2 - this.magusSize.w / 2,
      this.canvasSize.h / 2 - this.magusSize.h / 2,
      this.magusSize.w,
      this.magusSize.h
    );
    if (this.frameCounter % 10 === 0) {
      this.wizardIndexX < 3 && this.magusMovement
        ? (this.wizardIndexX += 1)
        : (this.wizardIndexX = 0);
    }
  },

  screenRefresh() {
    this.intervalId = setInterval(() => {
      this.clearCanvas();
      this.map.move();
      this.drawAll();
      this.pickUpGems();
      this.showScores();
      this.frameCounter++;
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
          this.wizardIndexY = 1;
          this.magusMovement = true;
          break;
        case "w":
          this.map.moveUp = true;
          this.wizardIndexY = 3;
          this.magusMovement = true;
          break;
        case "d":
          this.map.moveRight = true;
          this.wizardIndexY = 2;
          this.magusMovement = true;
          break;
        case "s":
          this.map.moveDown = true;
          this.wizardIndexY = 0;
          this.magusMovement = true;
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "a":
          this.map.moveLeft = false;
          this.magusMovement = false;
          break;
        case "w":
          this.map.moveUp = false;
          this.magusMovement = false;
          break;
        case "d":
          this.map.moveRight = false;
          this.magusMovement = false;
          break;
        case "s":
          this.map.moveDown = false;
          this.magusMovement = false;
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
    this.gems.length < this.MAX_Gems ? this.createGems() : null;
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
        this.refGem = this.gems.splice(i, 1);
        let pickaGem = document.getElementById("pickAGem");
        pickaGem.play();
        this.score < 10 ? (this.timerCounter += 3) : null;
        this.score < 15 ? (this.timerCounter += 2) : null;
        this.score < 20 ? (this.timerCounter += 1) : null;

        this.gemExplosion(this.refGem[0]);
      }
    });
  },

  showScores() {
    this.ctx.font = "30px Verdana";
    this.ctx.fillText("Collected Gems: " + this.score, 500, 100);
    return this.scores;
  },

  timer() {
    this.minutes;
    this.seconds;
    this.ctx.font = "30px Verdana";
    if (this.timerCounter < 60) {
      this.ctx.fillText("Timer: 00:" + this.timerCounter, 100, 100);
    } else {
      this.minutes = this.timerCounter / 60;
      this.seconds = this.timerCounter % 60;
      this.minutes > 9
        ? (this.minutes = `0${this.minutes}`)
        : (this.minutes = `${this.minutes}`);
      this.seconds > 9
        ? (this.seconds = `0${this.seconds}`)
        : (this.seconds = `${this.seconds}`);
    }
  },

  outOfTime() {
    clearInterval(this.intervalId);
    setInterval(() => {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h);
      this.ctx.strokeStyle = "purple";
      this.ctx.font = "80px Verdana";
      this.ctx.strokeText("Game Over", 200, 300);
      this.ctx.font = "40px Verdana";
      this.ctx.strokeText("You collected " + this.score + " gems!!!", 200, 400);
    }, 1000 / 60);
  },
};

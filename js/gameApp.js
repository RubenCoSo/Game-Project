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
    this.magus.src = "/images/wizard2.png";
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
      this.gems.forEach((gem) => gem.correction());
      this.drawAll();
      this.pickUpGems();
      this.showScores();
      this.frameCounter++;
      console.log(this.map.mapPosition);
      // if (this.gems.length !== 5) {
      //   this.createGems;
      // }
      if (this.frameCounter % 100 === 0) {
        this.timerCounter--;
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

    for (let i = 0; i < this.gems.length; i++) {
      this.ctx.drawImage(
        this.gems[i].gem,
        this.gems[i].gemPosition.x,
        this.gems[i].gemPosition.y,
        this.gems[i].gemSize.w,
        this.gems[i].gemSize.h
      );
    }
    // this.gems.forEach((gem) => gem.draw());
  },

  setListeners() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.map.moveLeft = true;
          // this.gems[0].correctionLeft = true;
          this.gems.forEach((gem) => {
            if (this.map.mapPosition.x < 402) {
              gem.correctionLeft = true;
            } else {
              gem.correctionLeft = false;
            }
          });
          break;
        case "w":
          this.map.moveUp = true;
          // this.gems[0].correctionUp = true;
          this.gems.forEach((gem) => {
            if (this.map.mapPosition.y < 402) {
              gem.correctionUp = true;
            } else {
              gem.correctionUp = false;
            }
          });
          break;
        case "d":
          this.map.moveRight = true;
          // this.gems[0].correctionRight = true;
          this.gems.forEach((gem) => {
            if (this.map.mapPosition.x > -2400) {
              gem.correctionRight = true;
            } else {
              gem.correctionRight = false;
            }
          });
          break;
        case "s":
          this.map.moveDown = true;
          // this.gems[0].correctionDown = true;
          this.gems.forEach((gem) => {
            if (this.map.mapPosition.y > -2400) {
              gem.correctionDown = true;
            } else {
              gem.correctionDown = false;
            }
          });
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "a":
          this.map.moveLeft = false;
          // this.gems[0].correctionLeft = false;
          this.gems.forEach((gem) => {
            if (this.map.mapPosition.x < 402) {
              gem.correctionLeft = false;
            }
          });
          break;
        case "w":
          this.map.moveUp = false;
          // this.gems[0].correctionUp = false;
          this.gems.forEach((gem) => {
            if (this.map.mapPosition.y < 402) {
              gem.correctionUp = false;
            }
          });
          break;
        case "d":
          this.map.moveRight = false;
          // this.gems[0].correctionRight = false;
          this.gems.forEach((gem) => {
            if (this.map.mapPosition.y > -2400) {
              gem.correctionRight = false;
            }
          });
          break;
        case "s":
          this.map.moveDown = false;
          // this.gems[0].correctionDown = false;
          this.gems.forEach((gem) => {
            if (this.map.mapPosition.y > -2400) {
              gem.correctionDown = false;
            }
          });
          break;
      }
    });
  },

  clearCanvas() {
    this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  },

  createGems() {
    for (let i = 0; i < this.MAX_Gems; i++) {
      const newGem = new Gem(this.ctx, this.canvasSize);

      this.gems.push(newGem);
    }
  },

  // Math.floor(Math.random() * (max - min) + min)

  addGem(referenceGem) {
    const additionalGem = new Gem(this.ctx);

    // let posOrNeg = (theRandomNumber = Math.floor(Math.random() * 10) + 1);

    // if (posOrNeg > 5) {
    //   additionalGem.gemPosition.x = Math.floor(
    //     Math.random() * (2250 - referenceGem[0].gemPosition.x - 0) + 0
    //   );
    //   additionalGem.gemPosition.y = Math.floor(
    //     Math.random() * (2250 - referenceGem[0].gemPosition.y - 0) + 0
    //   );
    // } else {
    //   additionalGem.gemPosition.x =
    //     Math.floor(
    //       Math.random() *
    //         (2800 - 402 - (2250 - referenceGem[0].gemPosition.x) - 0) +
    //         0
    //     ) * -1;
    //   additionalGem.gemPosition.y =
    //     Math.floor(
    //       Math.random() *
    //         (2800 - 402 - (2250 - referenceGem[0].gemPosition.y) - 0) +
    //         0
    //     ) * -1;
    // }

    this.gems.push(additionalGem);
  },

  pickUpGems() {
    this.gems.forEach((gem, i) => {
      let playerPosX = this.canvasSize.w / 2 - this.magusSize.w / 2;
      let playerPosY = this.canvasSize.h / 2 - this.magusSize.h / 2;

      if (
        playerPosX < gem.gemPosition.x + gem.gemSize.w - 20 &&
        playerPosX + this.magusSize.w - 20 > gem.gemPosition.x &&
        playerPosY < gem.gemPosition.y + gem.gemSize.h - 20 &&
        this.magusSize.h - 20 + playerPosY > gem.gemPosition.y
      ) {
        this.score += 1;
        this.referenceGem = this.gems.splice(i, 1);
        console.log(this.gems);
        console.log(this.referenceGem);
        this.addGem(this.referenceGem);
        console.log(this.gems);
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

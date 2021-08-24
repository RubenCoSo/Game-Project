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

  gems: [],

  MAX_Gems: 5,

  init(canvas) {
    this.getContext(canvas);
    this.setCanvasDimension(canvas);
    this.newMap();
    this.magus = new Image();
    this.magus.src = "/images/wizard2.png";
    this.setListeners();
    this.createGems();
    // console.log(this.gems);
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
    setInterval(() => {
      this.clearCanvas();
      this.map.move();
      // console.log(this.map.mapPosition);
      this.gems.forEach((gem) => gem.correction());
      this.drawAll();
      this.pickUpGems();
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
            gem.correctionLeft = true;
          });
          break;
        case "w":
          this.map.moveUp = true;
          // this.gems[0].correctionUp = true;
          this.gems.forEach((gem) => {
            gem.correctionUp = true;
          });
          break;
        case "d":
          this.map.moveRight = true;
          // this.gems[0].correctionRight = true;
          this.gems.forEach((gem) => {
            gem.correctionRight = true;
          });
          break;
        case "s":
          this.map.moveDown = true;
          // this.gems[0].correctionDown = true;
          this.gems.forEach((gem) => {
            gem.correctionDown = true;
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
            gem.correctionLeft = false;
          });
          break;
        case "w":
          this.map.moveUp = false;
          // this.gems[0].correctionUp = false;
          this.gems.forEach((gem) => {
            gem.correctionUp = false;
          });
          break;
        case "d":
          this.map.moveRight = false;
          // this.gems[0].correctionRight = false;
          this.gems.forEach((gem) => {
            gem.correctionRight = false;
          });
          break;
        case "s":
          this.map.moveDown = false;
          // this.gems[0].correctionDown = false;
          this.gems.forEach((gem) => {
            gem.correctionDown = false;
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
      const newGem = new Gem(this.ctx);

      this.gems.push(newGem);
    }
  },

  pickUpGems() {
    this.gems.forEach((gem, i) => {
      let playerPosX = this.canvasSize.w / 2 - this.magusSize.w / 2;
      let playerPosY = this.canvasSize.h / 2 - this.magusSize.h / 2;

      if (
        playerPosX < gem.gemPosition.x + gem.gemSize.w &&
        playerPosX + this.magusSize.w > gem.gemPosition.x &&
        playerPosY < gem.gemPosition.y + gem.gemSize.h &&
        this.magusSize.h + playerPosY > gem.gemPosition.y
      ) {
        console.log(`coge la gema ${i}`);
      }
      // if (
      //   this.map.mapPosition.x * -1 + 347 < gem.gemPosition.x + gem.gemSize.w &&
      //   this.map.mapPosition.x * -1 + 347 + this.map.mapSize.w >
      //     gem.gemPosition.x &&
      //   this.map.mapPosition.y * -1 + 350 < gem.gemPosition.y + gem.gemSize.h &&
      //   this.map.mapSize.h + (this.map.mapPosition.y * -1 + 350) >
      //     gem.gemPosition.y
      // ) {
      //   console.log("coge la gema");
      // }
    });
  },
};

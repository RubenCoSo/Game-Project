window.onload = () => {
  const playPause = document.getElementById("playpause");
  const music = document.getElementById("music");
  const startGame = document.getElementById("startGame");
  const instructions = document.getElementById("instructions");
  const counter = document.getElementById("counter");
  const timer = document.getElementById("timer");
  const gameSide = document.querySelector(".gameTittle");

  playPause.addEventListener("click", () => {
    if (playPause.getAttribute("class") === "pause") {
      playPause.setAttribute("class", "play");
      playPause.src = "../images/play.png";
      music.src = "";
    } else if (playPause.getAttribute("class") === "play") {
      playPause.setAttribute("class", "pause");
      playPause.src = "../images/pause.png";
      music.src = "../audio/Magicka Soundtrack 8 Encounter.mp3";
    }
  });

  startGame.onclick = () => {
    const canvas = document.querySelector("#canvas");
    canvas.style.display = "block";
    gameApp.init(canvas);
    music.src = "../audio/Magicka Soundtrack 8 Encounter.mp3";
    startGame.remove();
    instructions.remove();
    let gemsCounter = document.createElement("img");
    gemsCounter.setAttribute("class", "gemsCounter");
    gemsCounter.src = "../images/Untitled.png";
    counter.appendChild(gemsCounter);
    gameSide.className = "gameSide";
    let gemsCountText = document.createElement("p");
    gemsCountText.innerText = "X " + gameApp.showScores();
    gemsCountText.setAttribute("class", "gemsCounter");
    counter.appendChild(gemsCountText);
  };
};

window.onload = () => {
  const playPause = document.getElementById("playpause");
  const music = document.getElementById("music");
  const startGame = document.getElementById("startGame");
  const instructions = document.getElementById("instructions");

  playPause.addEventListener("click", () => {
    if (playPause.getAttribute("class") === "pause") {
      playPause.setAttribute("class", "play");
      playPause.src = "../images/play.png";
      music.setAttribute("autoplay", "false");
    } else if (playPause.getAttribute("class") === "play") {
      playPause.setAttribute("class", "pause");
      playPause.src = "../images/pause.png";
      music.setAttribute("autoplay", "true");
    }
  });

  startGame.onclick = () => {
    const canvas = document.querySelector("#canvas");
    canvas.style.display = "block";
    gameApp.init(canvas);
    startGame.remove();
    instructions.remove();
  };
};

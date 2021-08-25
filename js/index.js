window.onload = () => {
  document.getElementById("startGame").onclick = () => {
    const canvas = document.querySelector("#canvas");
    canvas.style.display = "block";
    gameApp.init(canvas);
  };
};

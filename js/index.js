window.onload = () => {
  document.getElementById("startGame").onclick = () => {
    const canvas = document.querySelector("#canvas");
    gameApp.init(canvas);
  };
};

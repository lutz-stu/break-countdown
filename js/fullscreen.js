const fullscreenBtn = document.getElementById("fullscreen-btn");

function isFullscreen() {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}

function requestFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

fullscreenBtn.addEventListener("click", function () {
  requestFullscreen(document.body);
});

function updateFullscreenBtn() {
  if (isFullscreen()) {
    fullscreenBtn.classList.add("hide");
  } else {
    fullscreenBtn.classList.remove("hide");
  }
}

document.addEventListener("fullscreenchange", updateFullscreenBtn);
document.addEventListener("webkitfullscreenchange", updateFullscreenBtn);
document.addEventListener("mozfullscreenchange", updateFullscreenBtn);
document.addEventListener("MSFullscreenChange", updateFullscreenBtn);

updateFullscreenBtn();

function pad(n) {
  return n < 10 ? "0" + n : n;
}

function updateCountdown() {
  const now = new Date();
  const t = getNextTarget(now);

  if (!t) {
    console.error('No schedule entry found');
    return;
  }

  const diff = t.target - now;
  const info = document.getElementById("info");
  const countdown = document.getElementById("countdown");

  let absDiff = Math.abs(diff);
  let hours = Math.floor(absDiff / (1000 * 60 * 60));
  let minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((absDiff % (1000 * 60)) / 1000);

  let timeString;
  if (hours > 0) {
    timeString = `${pad(hours)}:${pad(minutes)}`;
  } else {
    timeString = `${pad(minutes)}:${pad(seconds)}`;
  }

  if (diff >= 0) {
    info.textContent = t.label;
    countdown.textContent = timeString;
  } else {
    info.textContent = t.label + " (vergangen)";
    countdown.textContent = `-${timeString}`;
  }
}

// Start timer after config is loaded
function startCountdown() {
  setInterval(updateCountdown, 1000);
}

// timer js 
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 120;
const ALERT_THRESHOLD = 30;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

let timePassed = 0;
let timeLeft;
let timerInterval = null;
let remainingPathColor;

function initializeTimer(TIME_LIMIT) {
    timeLeft = TIME_LIMIT;
    remainingPathColor = COLOR_CODES.info.color;

    document.getElementById("app").innerHTML = `
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
      )}</span>
      <button  id="start-timer-button">Start timer</button>
    </div>
    `;
    const startButton = document.querySelector("#start-timer-button");
    if (startButton) {
        startButton.addEventListener('click', () => startTimer(TIME_LIMIT));
    }
}

function onTimesUp() {
  clearInterval(timerInterval);
  timerInterval = null; 
}

function startTimer(TIME_LIMIT) {
  if (!timerInterval) { // To prevent multiple intervals if button is clicked again
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;

      if (timeLeft <= 0) {
        timeLeft = 0;
        onTimesUp();
      }

      document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );

      const rawTimeFraction = timeLeft / TIME_LIMIT;
      const timeFraction = rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
      const circleDasharray = `${(timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
      document.getElementById("base-timer-path-remaining").setAttribute("stroke-dasharray", circleDasharray);

      // Update the remaining path color
      setRemainingPathColor(timeLeft);
    }, 1000);
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

export { initializeTimer, startTimer };
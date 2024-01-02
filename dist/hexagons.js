// $(function(){
//   $('.card').click(function(){$(this).toggleClass('flipped');});
// })

// function clickRandom() {
//   var elements = document.querySelectorAll(".card");
//   var randomIndex = Math.floor(Math.random() * elements.length);
//   var randomElement = elements[randomIndex];
//   randomElement.click();
// }

$(function(){
  $('.card').click(function(){
    $(this).toggleClass('flipped');
  });
});

function clickRandom() {
  var elements = document.querySelectorAll(".card");
  var randomIndex = Math.floor(Math.random() * elements.length);
  var randomElement = elements[randomIndex];
  randomElement.click();

  // Check if the randomly clicked card has the id 'targetCard'
  if (randomElement.id === 'targetCard') {
    // Schedule another click after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      randomElement.click();
    }, 3000);
  }
}

setInterval(clickRandom, 10000);

document.addEventListener("DOMContentLoaded", function() {
  // Your code here

  const images = [
    '/images/teaching/calvin.jpg', 
    '/images/teaching/brain-thumbnail.jpg',
    '/images/teaching/RThaler.jpg',
    '/images/teaching/ponzoIllusion.jpg',
    'https://media.giphy.com/media/3ndAvMC5LFPNMCzq7m/giphy.gif',
    'https://media.giphy.com/media/ri8Kb9LOe5Nza/giphy.gif',
    '/images/teaching/the-scientific-method.png',
    '/images/teaching/bored-ape.jpeg',
  ];

  function setRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];
    document.getElementById('random-hexagon-image').src = randomImage;
  }

  document.getElementById('targetCard').addEventListener('click', function() {
    setRandomImage();
  });

});

document.addEventListener("DOMContentLoaded", function() {
  const targetCardBack = document.querySelector('#targetCard .back');
  targetCardBack.classList.add('invisible');
});


function display_c(){
  var refresh=1000; // Refresh rate in milli seconds
  mytime=setTimeout('display_ct()',refresh)
}

function display_ct() {
  var today = new Date();
  var time = today.getHours() + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes();
  document.getElementById('ct1').style.color = "#582C83";
  document.getElementById('ct1').innerHTML = time;
  document.getElementById('ct2').style.color = "#FFFFFF";
  document.getElementById('ct2').innerHTML = time;
  display_c();
 }

 function setSessionDate() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    document.getElementById('session-date').innerHTML = date;
}

window.onload = function() {
    display_ct();  // Your existing function
    setSessionDate();  // The new function to set the date
};

// Parse the container holding the emojis
twemoji.parse(document.getElementById('emoji-container'));

const element = document.getElementById('conditional-div');

function checkAndSetVisibility(event) {
    const urlHash = window.location.hash;
    const slideIndex = event ? event.indexh : 0; // Use 0 as default for the initial call

    if (slideIndex === 0) { // First slide
        element.classList.add('hidden');
    } else { // Other slides
        element.classList.remove('hidden');
    }
}

// Initial check
checkAndSetVisibility();

// Check on slide changes
Reveal.addEventListener('slidechanged', function(event) {
    checkAndSetVisibility(event);
});

// Check on hash changes (might not be necessary if slidechanged covers all cases)
window.addEventListener("hashchange", function() {
    checkAndSetVisibility();
});



// timer js 
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 60;
const ALERT_THRESHOLD = 10;

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
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
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

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

export { startTimer };
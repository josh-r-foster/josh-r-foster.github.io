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

// document.addEventListener("DOMContentLoaded", function() {
//   const targetCardBack = document.querySelector('#targetCard .back');
//   targetCardBack.classList.add('invisible');
// });

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
const tabs = document.getElementById('tabContainer');

function checkAndSetVisibility(event) {
    const urlHash = window.location.hash;
    const slideIndex = event ? event.indexh : 0; // Use 0 as default for the initial call

    if (slideIndex === 0) { // First slide
        element.classList.add('hidden');
        tabs.classList.add('hidden');
    } else { // Other slides
        element.classList.remove('hidden');
        tabs.classList.remove('hidden'); 
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

document.addEventListener('DOMContentLoaded', function() {
    display_ct();
});
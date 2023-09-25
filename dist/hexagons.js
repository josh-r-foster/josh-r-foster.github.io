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

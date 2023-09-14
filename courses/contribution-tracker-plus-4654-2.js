const container = document.getElementById('person-container');
const exportButton = document.getElementById('export-button');

const peopleData = [
  {name: 'Alexander Flannery', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Alexandra Nicolescu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Amberly Zhou', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Andrew Lukezic', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Annie Lai', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Anthony De Rango', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ariella Gelb', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Arlo Coleman-Shapiro', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Arman Valyani-Perera', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Byron Edwardson', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Eric Li', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Eric Wang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Grace Okamura', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Iliyan Bhanji', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jackson MacPhie', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jacky Huang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jasmine Chen', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jasmine Kordbacheh', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jessica Bian', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jessie Wu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'John Liu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jomana Elsays', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Judy Zhang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jukka Schotter', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Julia Ionescu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Katie Thien', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Kenan Xu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Lisa Jia', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Matthew Sandford', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Michael Chi', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Michael Hawkes', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Nick Bennett', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Paige Murray', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Rachel Bai', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Rachel Lee', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Rafa Drumond', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Renee Xie', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Roger Luo', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ronak Lad', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sophia Lu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Tiffany Too', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Valerie Ah-Yen', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Valerie Phu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Wendy Chi', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'William Chan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Yong Yu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
];
const buttonsData = ["Came prepared", "Strong problem solving", "Quality decision analysis", "Good listening", "Considered other perspectives", "Insightful connections", "Clear communication", "Distracted", "Arrived late", "Absent"];

function createPersonBox(person) {
  const box = document.createElement('div');
  box.className = 'box';

  const boxHeader = document.createElement('div');
  boxHeader.className = 'box-header';
  box.appendChild(boxHeader);

  const profilePicture = document.createElement('img');
  profilePicture.className = 'profile-picture';
  profilePicture.src = person.profilePictureUrl; // Set the source of profile picture from person data
  profilePicture.alt = person.name + "'s profile picture";
  boxHeader.appendChild(profilePicture);

  const nameAndCounter = document.createElement('div');
  nameAndCounter.className = 'name-and-counter';
  boxHeader.appendChild(nameAndCounter);

  const heading = document.createElement('h2');
  heading.textContent = person.name;
  nameAndCounter.appendChild(heading);

  const counter = document.createElement('div');
  counter.className = 'counter';
  nameAndCounter.appendChild(counter);

  const decreaseButton = document.createElement('button');
  decreaseButton.className = 'decrease';
  decreaseButton.textContent = '-';
  counter.appendChild(decreaseButton);

  const countElement = document.createElement('span');
  countElement.className = 'count';
  countElement.textContent = '0';
  counter.appendChild(countElement);

  const increaseButton = document.createElement('button');
  increaseButton.className = 'increase';
  increaseButton.textContent = '+';
  counter.appendChild(increaseButton);

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
  box.appendChild(buttonContainer);

  buttonsData.forEach((buttonName) => {
    const button = document.createElement('button');
    button.textContent = buttonName;
    button.className = 'button';

    button.addEventListener('click', () => {
      button.classList.toggle('active');
    });

    buttonContainer.appendChild(button);
  });

  container.appendChild(box);

  // Counter functionality
  const decreaseButtonElement = box.querySelector('.decrease');
  const increaseButtonElement = box.querySelector('.increase');

  let count = 0;

  decreaseButtonElement.addEventListener('click', () => {
    count--;
    countElement.textContent = count;
  });

  increaseButtonElement.addEventListener('click', () => {
    count++;
    countElement.textContent = count;
  });
}

function exportData() {
  const boxes = document.querySelectorAll('.box');
  const data = [];

  boxes.forEach((box) => {
    const personData = {
      person: box.querySelector('h2').textContent,
      count: parseInt(box.querySelector('.count').textContent),
      buttons: Array.from(box.querySelectorAll('.button')).map((button) => ({
        name: button.textContent,
        active: button.classList.contains('active'),
      })),
    };

    data.push(personData);
  });

  const currentDate = new Date().toISOString().split('T')[0];
  const fileName = `contribution_data_${currentDate}.json`;
  const jsonData = JSON.stringify(data);

  const link = document.createElement('a');
  link.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
  link.download = fileName;
  link.click();
}

peopleData.forEach((person) => {
  createPersonBox(person);
});

exportButton.addEventListener('click', exportData);
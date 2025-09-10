const container = document.getElementById('person-container');
const exportButton = document.getElementById('export-button');

const peopleData = [
  {name: 'Aaditya Geed', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Adam Meadows', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Akber Amanulla Khan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Aliya Nazeer', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Angelita Martin', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Avneet Chohan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Awaad Aamir', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Bella Natasha Diego', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Calvin Zehr', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Chaitanya Gandhi', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Derek Adam', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Elisabeth Iannucci', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Gauri Angrish', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Iain Smith', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ishani Adityan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ishi Khamesra', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Judith Osemeke', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Kendall Zhang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Kiera Treloar', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Mac Astritis', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Maro Egbedi', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'May El Damatty', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Olamide Adeboboye', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Olayinka Adesanya', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Princess Adeniran', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Rio Baudisch-McCabe', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Robert Gray', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Rutuja Desai', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sam Jain', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sam Macy', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Samira Jain', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sean Morris', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sebastian Henao', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sifan Wang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Silvia Pacheco Diaz', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Valentina Efionayi', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Zachary Zarnett-Klein', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
];
const buttonsData = ["Came prepared", "Came unprepared", "Strong problem solving", "Quality decision analysis", "Good listening", "Considered other perspectives", "Connected with theory", "Insightful connections", "Clear communication", "Distracted", "Arrived late", "Absent"];

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
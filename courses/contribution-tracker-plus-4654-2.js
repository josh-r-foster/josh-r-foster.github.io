const container = document.getElementById('person-container');
const exportButton = document.getElementById('export-button');

const peopleData = [
  {name: 'Adam Ramkissoon', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Alessandro Panetta', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Andrew Ko', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Andy Hwang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Braeden Stewart', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Carol Xu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Cole Purdell-Lewis', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Connie Xu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Emma Bradacs', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Emmett Koles', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ethan Gilhula', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Evan Scrivener', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Fiona Fan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Florence Rouvez', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Francesco Rende', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Gabe Evans', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Hanisha Dhoofar', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Hannah Jeon', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Harvey Zhu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Hooman Mohammadi', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Isabella Valdez', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jack Hogan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jackey Lai', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jackson Su', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jasmine Gu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Joanne Shao', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Joseph Spadafina', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Keegan Smith', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Kieran Amoroso', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Laith Amad', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Maurice Ma', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Michael Thien', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Nicholas Giangregorio', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Oliver He', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ryan Pin Harry', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sanaa El Fatihi', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sarah Shao', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sarinah Goolam', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Simon Hungate', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Stefano Ruggieri', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Steven Grano', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sudipta Sarkar', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Travis MacKay', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Vanessa Chen', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Xin Zeng', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Yusuf Nissar', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Zi Li', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
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
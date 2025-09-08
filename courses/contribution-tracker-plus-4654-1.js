const container = document.getElementById('person-container');
const exportButton = document.getElementById('export-button');

const peopleData = [
  {name: 'Abhi Ravipati', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Aidan Zia', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Amelie Pirotte', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Andrew Feng', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Andrew Korne', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Andrew Yang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Armaan Sandhu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Aya Aherdan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ben Goring', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Caitlin Trinh', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Carrie Malkin', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Cheuk Yee Chen', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Clemence Valet', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Cole Smith', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Elaine Lin', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Elliott Wardle', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Emily Tao', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Emma Jewell', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Gabriel Sinha', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Grace Cousineau', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jack McDonnell', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jackie Yuan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jessica Luo', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Johann Abraham', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Junsoo Pak', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Kyle Kim', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Laura Amelie Cordeddu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Liam Geddes', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Madie Erauw', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Mallery Fischer', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Mathis Zanzucchi', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Michael Wei', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Miriam Youssef', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'MK Dao', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Nathan Mark', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Newt Chen', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Nienke Toonen', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Oren Joffe', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Otis Ding', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Peter Guo', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Peyton Kou', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ricky Chiu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Rongrui Mao', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ryan Mitchener', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sadiyah Sajjad', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sarah Smith', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Tessa Fois', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Uttej Mannava', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
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
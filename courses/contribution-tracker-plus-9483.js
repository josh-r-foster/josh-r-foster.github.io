const container = document.getElementById('person-container');
const exportButton = document.getElementById('export-button');

const peopleData = [
  {name: 'Aakriti Gupta', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Abhimanyu Sheoran', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Adamo Sansalone', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Akshat Singh', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Akshay Rewale', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Alexis Gantous', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Andrew Shepherd', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Annie Zhang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Atanu Sahoo', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Bani Sehgal', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Brianna Bossio', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Calvin Jiang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Christina Gucciardi', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Daniel Zhu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Elvin Yu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Eric Parr', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Evelyn Vanderhoof', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Feng Xu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Gabrielle Stadler', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Gagandip Grewal', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Imaiya Ravichandran', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ismyal Khan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jennifer Hsin', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Josiah Dueck', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Kaanshika Mittal', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Kaartikeya Pandey', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Kai Hu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Karanvir Singh', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Lin Ma', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Mackenzie Fulton', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Matthew Grilli', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Max Welyhorsky', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Mayank Ahuja', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Mehak Sood', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Melanie Starke', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Michael Saunders', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Mike Hockin', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Milos Masnikosa', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Mustafa Khan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Natasha Shew', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Nikola Lapenna', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Noah Suissa', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Prithvi Nag', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Rawaiz Sheikh', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ross Ferguson', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Runfeng Li', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sachin Mohanty', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Shashank Rusia', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Shiva Sankar', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Siddhanth Khanvilkar', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Smarth Narula', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Suyash Singh', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Syed Murtaza Nadeem', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Tunmise Ajiboye', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Yashodhan Sule', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Zhaokun Du', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
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
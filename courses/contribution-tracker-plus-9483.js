const container = document.getElementById('person-container');
const exportButton = document.getElementById('export-button');

const peopleData = [
  {name: 'Moatasm Almaouie', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Elizabeth Areola', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Vegar Arnesen', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Samuel Baganzi', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Samer Balaa', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Nayan Banerjee', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Wardah Behzad', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Manan Bhatia', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Michael Cooper', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Soumyarup Dasgupta', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ramsey Franklyn', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Konner Fung-Kee-Fung', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Adik Goel', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ozlem Gorkan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'David Grilli', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Chandana Hiran', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Colton James', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Shalini Kanodia', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Raiyan Khair', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Bethany Lin', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Alexandra MacKinnon', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Alex Mladen', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Josee Morell', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Varun Myageri', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Zuhair Naseem', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ebuka Nwadike', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Apourv Pandey', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Olivia Petric', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Michael Pettet', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Aadhyaa Rai', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sari Sartawi', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Arian Shahrizad', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Deepti Sharma', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Susanna Shu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Rounak Siraj', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Robbie Sparrow', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Michael Starr', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Natasha Vattikonda', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Michael Vettese', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
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
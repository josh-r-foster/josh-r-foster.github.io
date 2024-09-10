const container = document.getElementById('person-container');
const exportButton = document.getElementById('export-button');

const peopleData = [
  {name: 'Amandine Prioux', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Anthony Pham', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Audrey Ghilain', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Chloe Bissell', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'David Hascal', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'David Kang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Declan O\'Neill', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Emily Kim', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Emily Qin', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Gauri Pasbola', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Gavin Barclay', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Hailey Tang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Isabel Yuan', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jamie White', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jane Wang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Jennifer Bitton', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Joey Lisser', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Johann Zhao', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Joyce Liu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Junaid Rana', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Juvhan Krisnapillai', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Kate McCallum', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Katie Werner', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Kayla DeAngelis', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Kayla Whitnell', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Lauren Um', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Lena Tang Qiu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Makenzie Shirley', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Mara Lerf', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Max Leibovich', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Noah Roddis', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Nunu Mequanint', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Orianna Lui', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Palina Radzioshkina', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Patrick Westdal', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Ryan Smith', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sam Lu', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Saniya Niyoosha', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Shane Gitlin', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Siqi Man', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Sue Han', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Tanner Spadafora', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Tej Sharma', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Theo Kalff', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Timothy Haluk', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Tristan Gilchrist', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Wenqi Shen', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
  {name: 'Yiling Yang', profilePictureUrl: '/images/teaching/default-profile-picture.jpg'},
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
	profilePicture.src = person.profilePictureUrl; 
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

	const profileAndCountersWrapper = document.createElement('div');
	const buttonsWrapper = document.createElement('div');
	buttonsWrapper.className = 'button-container';

	buttonsData.forEach((buttonName) => {
		const button = document.createElement('button');
		button.textContent = buttonName;
		button.className = 'button';

		button.addEventListener('click', () => {
			button.classList.toggle('active');
		});

		buttonContainer.appendChild(button);
	});

	const textBox = document.createElement('textarea');
	textBox.setAttribute('class', 'qualitative-input');
	textBox.setAttribute('placeholder', 'Offer any constructive feedback you have for '+person.name+' here. Please be kind. \uD83D\uDE00\u2764\uFE0F');
	box.appendChild(textBox);
	
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

		const textBox = box.querySelector('.qualitative-input'); // Assuming '.qualitative-input' is the class you've used for the text box
		if (textBox) {
			personData.feedback = textBox.value;
		}

		data.push(personData);
	});

	const currentDate = new Date().toISOString().split('T')[0];
	const fileName = `peer_feedback_data_${currentDate}.json`;
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
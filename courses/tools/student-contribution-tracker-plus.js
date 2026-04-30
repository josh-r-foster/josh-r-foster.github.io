const container = document.getElementById('person-container');
const exportButton = document.getElementById('export-button');

const peopleData = [
{ name: 'John Doe', profilePictureUrl: '/images/teaching/default-profile-picture.jpg' },
{ name: 'Jane Smith', profilePictureUrl: '/images/teaching/default-profile-picture.jpg' },
{ name: 'Michael Johnson', profilePictureUrl: '/images/teaching/default-profile-picture.jpg' },
{ name: 'Emily Davis', profilePictureUrl: '/images/teaching/default-profile-picture.jpg' },
{ name: 'Daniel Wilson', profilePictureUrl: '/images/teaching/default-profile-picture.jpg' },
{ name: 'Olivia Thompson', profilePictureUrl: '/images/teaching/default-profile-picture.jpg' },
]
const buttonsData = ["Came prepared", "Strong problem solving", "Quality decision analysis", "Good listening", "Considered other perspectives", "Clear communication", "Distracted", "Arrived late", "Absent"];

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
document.addEventListener('DOMContentLoaded', function () {
	let wrapper = document.getElementById('wrapper');
	let topLayer = document.querySelector('.top');
	let handle = document.querySelector('.handle');
	let skew = 0;
	let delta = 0;

	if (wrapper.className.indexOf('skewed') != -1) {
		skew = 990;
	}

	wrapper.addEventListener('mousemove', function (e) {
		delta = (e.clientX - window.innerWidth / 2) * 0.5;

		handle.style.left = e.clientX + delta + 'px';

		topLayer.style.width = e.clientX + skew + delta + 'px';
	});
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
	scrollFunction();
};

// Button to generate a single card in the DOM (card.html)
const buttonOne = document.getElementById('generateCard');

// Button to generate a card set in the DOM (cards.html)
const buttonTwo = document.getElementById('generateSet');

//Get the button
let mybutton = document.getElementById('btn-back-to-top');

// Where the card will be displayed in the DOM
const singleCard = document.querySelector('.cardDisplay');
const cardSet = document.querySelector('.setDisplay');

// Event Listeners
if (buttonOne !== null) {
	buttonOne.addEventListener('click', gallery);
}
if (buttonTwo !== null) {
	buttonTwo.addEventListener('click', cardSetGallery);
}

// When the user clicks on the button, scroll to the top of the document
if (mybutton !== null) {
	mybutton.addEventListener('click', backToTop);
}

// Fetches data from api for a card set
async function cardSetGallery() {
	clearSet();
	const res = await fetch(
		'https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=metal%20raiders&attribute=earth'
	);
	const data = await res.json();
	getImages(data);
}

// Fetches data from api to display a random card
async function gallery() {
	clear();
	const res = await fetch('https://db.ygoprodeck.com/api/v7/randomcard.php');
	const data = await res.json();
	console.log(data);
	displayRandom(data);
}

function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		mybutton.style.display = 'block';
	} else {
		mybutton.style.display = 'none';
	}
}

function backToTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

// Displays that card recieved from the API
function displayRandom(data) {
	data.card_images.forEach((image) => {
		const newImage = document.createElement('div');
		newImage.innerHTML = `<img id="random1" class="one_Card" src=${image.image_url}></img>`;
		singleCard.appendChild(newImage);
	});
}

// Displays that card set recieved from the API
function getImages(data) {
	data.data.forEach((images) => {
		let card = images.card_images[0];
		const newDiv = document.createElement('div');
		newDiv.innerHTML = `<img class="cardSet_singleImage" src=${card.image_url}></img>`;
		cardSet.appendChild(newDiv);
	});
}

// Clears DOM for next card to be displayed
function clear() {
	singleCard.innerHTML = '';
}

// Clears DOM for next card set to be displayed
function clearSet() {
	cardSet.innerHTML = '';
}

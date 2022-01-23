console.log("connected!");

// DOM Objects
const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');


// Constants & Variables

const TYPES = [
    'bug', 'dark', 'dragon',  
    'electric', 'fairy', 'fighting',
    'fire', 'flying', 'ghost', 
    'grass', 'ground', 'ice',
    'normal', 'poison', 'psychic',
     'rock', 'steel', 'water'  
];

let prevUrl = null;
let nextUrl = null;


// Functions

const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
    // Removes the hide class on the main screen
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
        // console.log(type);
        mainScreen.classList.remove(type);
    }
};

const fetchPokeList = (url) => {
    // Get data for right side of screen
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // const results = data['results'];
            // ES6 | Destructured variable //
            const { results, previous, next } = data;
            prevUrl = previous;
            nextUrl = next;

        for (let i =0; i < pokeListItems.length; i++) {
            const pokeListItem = pokeListItems[i];
            const resultData = results[i];

            if (resultData) {
                const { name, url } = resultData;
                const urlArray = url.split('/');
                const id = urlArray[urlArray.length -2];
                pokeListItem.textContent = id + '. ' + capitalize(name);
            } else {
                pokeListItem.textContent = '';
            }
        }
    });
};

const fetchPokeData = id => {
    // Get data for left side of screen
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => /*Returns data in a readable format*/ res.json())
    .then(data => {
        resetScreen();

        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];

        pokeTypeOne.textContent = capitalize(dataFirstType['type']['name']);

        if (dataSecondType ) {
            pokeTypeTwo.classList.remove('hide');
            pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
        } else {
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
        }

        mainScreen.classList.add(dataFirstType['type']['name']);
        pokeName.textContent = capitalize(data['name']);
        pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];
        pokeFrontImage.src = data['sprites']['front_default'] || '';
        pokeBackImage.src = data['sprites']['back_default'] || '';
    });
};

const handleLeftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl);
    }
};

const handleRightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl);
    }
};

const handleListItemClick = (e) => {
    // If no data return nothing
    if (!e.target) return;
    // if the list item has no data return nothing
    const listItem = e.target;
    if (!listItem.textContent) return;

    const id = listItem.textContent.split('.')[0];
    fetchPokeData(id);
};


// Adding even listeners
leftButton.addEventListener('click', handleLeftButtonClick);
rightButton.addEventListener('click', handleRightButtonClick);

for (const pokeListItem of pokeListItems) {
    pokeListItem.addEventListener('click', handleListItemClick);
};
 

// Initalize App
fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
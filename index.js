class Pet {
    // Static properties to hold all pets and the maximum number of pets allowed
    static pets = [];
    static maxPets = 4;
    static petImages = {
        cat: "images/cat.png",
        rabbit: "images/rabbit.png",
        duck: "images/duck.png",
        dog: "images/dog.png"

    };

    constructor(name, animalType, fullness, happiness, energy) {
        this.name = name;
        this.animalType = animalType;   
        this.fullness = fullness;
        this.happiness = happiness;
        this.energy = energy;
        this.image = Pet.petImages[animalType];
    }   
}
adoptPetBtn = document.getElementById("adoptPet");
adoptPetBtn.addEventListener("click", () => {
    if (Pet.pets.length < Pet.maxPets) {
        const petName = document.getElementById("petName").value;
        const animalType = document.getElementById("petType").value;

       
        const newPet = new Pet(petName, animalType, 50, 50, 50);

        Pet.pets.push(newPet);
        renderPets();
    } else {
        alert("You have reached the maximum number of pets!");
    }
});

function renderPets() {
    const petContainer = document.getElementById("petContainer");
    petContainer.innerHTML = "";
    Pet.pets.forEach((pet) => {
        const petCard = document.createElement("div");
        petCard.classList.add("pet-card");
        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" class="pet-image">
            <h3>${pet.name}</h3>    
            <p>Fullness: ${pet.fullness}</p>
            <p>Happiness: ${pet.happiness}</p>
            <p>Energy: ${pet.energy}</p>
        `;
        petCard.button = document.createElement("button");
        petCard.button.textContent = "Eat";
        petCard.appendChild(petCard.button);
        petCard.button = document.createElement("button");
        petCard.button.textContent = "Play";
        petCard.appendChild(petCard.button);
        petCard.button = document.createElement("button");
        petCard.button.textContent = "Nap";
        petCard.appendChild(petCard.button);
        petContainer.appendChild(petCard);

        // timer every 10 seconds to decrease energy, fullness and happiness by 10 
let energy = 50;
let fullness = 50;
let happiness = 50;
const energyElement = document.getElementById('energy');
const fullnessElement = document.getElementById('fullness');
const happinessElement = document.getElementById('happiness');
function updateStats() {
    energyElement.textContent = `${energy}`;
    fullnessElement.textContent = `${fullness}`;
    happinessElement.textContent = `${happiness}`;
}
setInterval(() => {
    energy = Math.max(0, energy - 10);
    fullness = Math.max(0, fullness - 10);
    happiness = Math.max(0, happiness - 10);
    updateStats();
}, 10000);
// event listeners for buttons
document.getElementById('nap-button').addEventListener('click', () => {
    energy = Math.min(100, energy + 40);
    happiness = Math.max(0, happiness - 10);
    fullness = Math.max(0, fullness - 10);
    updateStats();
});
document.getElementById('play-button').addEventListener('click', () => {
    happiness = Math.min(100, happiness + 30);
    energy = Math.max(0, energy - 10);
    fullness = Math.max(0, fullness - 10);
    updateStats();
});         
document.getElementById('eat-button').addEventListener('click', () => {
    fullness = Math.min(100, fullness + 30);
    energy = Math.max(0, energy - 15);
    happiness = Math.max(0, happiness + 5);
    updateStats();
}); 


    });
}

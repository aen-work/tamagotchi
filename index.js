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
    
    // Creating eatButton
    const eatButton = document.createElement("button");
    eatButton.textContent = "Eat";
    eatButton.classList.add("eat-button");

    eatButton.addEventListener("click", () => {
        pet.fullness = Math.min(100, pet.fullness + 30);
        pet.energy = Math.max(0, pet.energy - 15);
        pet.happiness = Math.min(100, pet.happiness + 5);
        renderPets();
      });

    //Creating PlayButton
    const playButton = document.createElement("button");
    playButton.textContent = "Play";
    playButton.classList.add("play-button");

    playButton.addEventListener("click", () => {
        pet.happiness = Math.min(100, pet.happiness + 30);
        pet.energy = Math.max(0, pet.energy - 10);
        pet.fullness = Math.max(0, pet.fullness - 10);
        renderPets();
      });
    //Creating NapButton
    const napButton = document.createElement("button");
    napButton.textContent = "Nap";
    napButton.classList.add("nap-button");

    napButton.addEventListener("click", () => {
        pet.energy = Math.min(100, pet.energy + 40);
        pet.happiness = Math.max(0, pet.happiness - 10);
        pet.fullness = Math.max(0, pet.fullness - 10);
        renderPets();
});
  });
// timer every 10 seconds to decrease energy, fullness and happiness by 10 
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
}
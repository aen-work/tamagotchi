//Pet class med statiska properties.
class Pet {
    static pets = [];
    static maxPets = 4;
    static petImages = {
    cat: "images/cat.png",
    rabbit: "images/rabbit.png",
    duck: "images/duck.png",
    dog: "images/dog.png"
};

// Konstruktor som tar in namn, djurtyp och stats, samt sätter bild baserat på djurtyp
    constructor(name, animalType, fullness, happiness, energy, intervalId) {
        this.name = name;
        this.animalType = animalType;   
        this.fullness = fullness;
        this.happiness = happiness;
        this.energy = energy;
        this.image = Pet.petImages[animalType];
        this.intervalId = intervalId;
        }

    startTimer(updateStats) {
        this.intervalId = setInterval(() => {
            this.fullness = Math.max(0, this.fullness - 10);
            this.happiness = Math.max(0, this.happiness - 10);
            this.energy = Math.max(0, this.energy - 10);
            updateStats();
        }, 10000); // Uppdatera varje 10 sekunder   
        } 

}


const button = document.getElementById("generateName");
const petName = document.getElementById("petName");

let fetchRandomName = async () => {
    try {
        const response = await fetch("https://randomuser.me/api/");

        if (!response.ok) {
            throw new Error("API error");
        }

        const data = await response.json();
        return data.results[0].name.first;

    } catch (error) {
        console.error("Failed to fetch name:", error);
        return null;
    }
};

button.addEventListener("click", async () => {
const name = await fetchRandomName();
    if (name) {
        petName.value = name;
    } else {
        petName.value = "Could not fetch name.";
    }
});


const adoptPetBtn = document.getElementById("adoptPet");

adoptPetBtn.addEventListener("click", () => {
       console.log("Adopt button clicked");
       const nameInput = document.getElementById("petName");
       const typeInput = document.getElementById("petType");
        if (nameInput.value.trim() === "") {
        alert("Please enter a name for your pet!");
        return;
        }

    if (Pet.pets.length < Pet.maxPets) {
       const newPet = new Pet(
            nameInput.value,
            typeInput.value,
            50,
            50,
            50
        );

    Pet.pets.push(newPet);

    newPet.startTimer(() => renderPets());

    renderPets();
    nameInput.value = ""; // rensa input efter adoption
    } else {
        alert("You have reached the maximum number of pets!");
    }
});







// Funktion för att skriva ut pets på sidan
function renderPets() {
const petContainer = document.getElementById("petContainer");
petContainer.innerHTML = "";
    Pet.pets.forEach((pet) => {
        const petCard = document.createElement("div");
        petCard.classList.add("petCard");

        const petImage = document.createElement("img");
        petImage.src = pet.image;
        petImage.alt = pet.animalType;  
        petImage.classList.add("petImage");

        const petName = document.createElement("h2");
        petName.textContent = pet.name;

        //Stats
        const fullnessText = document.createElement("p");
        const happinessText = document.createElement("p");
        const energyText = document.createElement("p");

        function updateStats() {
            fullnessText.textContent = `Fullness: ${pet.fullness}`;
            happinessText.textContent = `Happiness: ${pet.happiness}`;
            energyText.textContent = `Energy: ${pet.energy}`;
        }
        updateStats(); // Initial stats
        
        const eatButton = document.createElement("button");
        eatButton.textContent = "Eat";
        eatButton.addEventListener("click", () => {
        // Uppdatera värden

        console.log(`Feeding ${pet.name}`);
        pet.fullness = Math.min(100, pet.fullness + 30);
        pet.energy = Math.max(0, pet.energy - 15);
        pet.happiness = Math.min(100, pet.happiness + 5);
        updateStats(); // Uppdatera DOM

        // HISTORY LOG
        const history = document.getElementById("history");
        const newP = document.createElement("p");
        newP.textContent = `You fed ${pet.name}. Yummy!`;
        history.appendChild(newP);
        });

        // PLAY
        const playButton = document.createElement("button");
        playButton.textContent = "Play";
        playButton.addEventListener("click", () => {
        console.log(`Playing with ${pet.name}`);
        pet.happiness = Math.min(100, pet.happiness + 30);
        pet.energy = Math.max(0, pet.energy - 10);
        pet.fullness = Math.max(0, pet.fullness - 10);
        updateStats();

        const history = document.getElementById("history");
        const newP = document.createElement("p");
        newP.textContent = `You played with ${pet.name}. Yay!`;
        history.appendChild(newP);
        });

        // NAP
        const napButton = document.createElement("button");
        napButton.textContent = "Nap";
        
        napButton.addEventListener("click", () => {
        console.log(`Napping with ${pet.name}`);
        pet.energy = Math.min(100, pet.energy + 40);
        pet.happiness = Math.max(0, pet.happiness - 10);
        pet.fullness = Math.max(0, pet.fullness - 10);
        updateStats();

        const history = document.getElementById("history");
        const newP = document.createElement("p");
        newP.textContent = `You took a nap with ${pet.name}. Energy boost!`;
        history.appendChild(newP);
        });
    
    petCard.appendChild(petImage);
    petCard.appendChild(petName);
    petCard.appendChild(fullnessText);
    petCard.appendChild(happinessText);
    petCard.appendChild(energyText);
    petCard.appendChild(eatButton);
    petCard.appendChild(playButton);
    petCard.appendChild(napButton);
    petContainer.appendChild(petCard);
    });
}



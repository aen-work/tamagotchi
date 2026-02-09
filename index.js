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
        petCard.button.textContent = "Feed";
        petCard.appendChild(petCard.button);
        petCard.button = document.createElement("button");
        petCard.button.textContent = "Play";
        petCard.appendChild(petCard.button);
        petCard.button = document.createElement("button");
        petCard.button.textContent = "Nap";
        petCard.appendChild(petCard.button);
        petContainer.appendChild(petCard);
    });
}

class pet {
    static pets = [];
    static maxPets = 4;
    static petImages = ["images/cat.png", "images/rabbit.png", "images/duck.png", "images/dog.png"]; 

    constructor(name, animalType, fullness, happiness, energy,image) {
        this.name = name;
        this.animalType = animalType;   
        this.fullness = fullness;
        this.happiness = happiness;
        this.energy = energy;
        this.image = image;
    }   
}

adoptPetBtn = document.getElementById("adoptPet");
adoptPetBtn.addEventListener("click", () => {
    if (pet.pets.length < pet.maxPets) {
        const petName = prompt("Enter a name for your new pet:");
        const petImage = pet.petImages[pet.pets.length];
        const newPet = new pet(petName, 50, 50, 50, petImage);
        pet.pets.push(newPet);
        renderPets();
    } else {
        alert("You have reached the maximum number of pets!");
    }
});

function renderPets() {
    const petContainer = document.getElementById("petContainer");
    petContainer.innerHTML = "";
    pet.pets.forEach((pet) => {
        const petCard = document.createElement("div");
        petCard.classList.add("pet-card");
        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" class="pet-image">
            <h3>${pet.name}</h3>    
            <p>Fullness: ${pet.fullness}</p>
            <p>Happiness: ${pet.happiness}</p>
            <p>Energy: ${pet.energy}</p>
        `;
        petContainer.appendChild(petCard);
    });
}

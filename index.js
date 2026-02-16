class Pet {
    // Static properties för alla pets, en array för att hålla alla pets, max antal pets och objekt som mappar djurtyper till bilder
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


const button = document.getElementById("generateName");
const gName = document.getElementById("petName");

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


// Event listener till adopt pet knappen, skapar en ny pet och lägger till den i arrayen om max antal inte är nått, annars visas en alert   
const adoptPetBtn = document.getElementById("adoptPet");

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


// Funktion för att skriva ut pets på sidan
function renderPets() {
    const petContainer = document.getElementById("petContainer");
    petContainer.innerHTML = "";
    
    Pet.pets.forEach((pet) => {
        const petCard = document.createElement("div");
        petCard.classList.add("petCard");

        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" class="pet-image">
            <h3>${pet.name}</h3>    
            <p>Fullness: ${pet.fullness}</p>
            <p>Happiness: ${pet.happiness}</p>
            <p>Energy: ${pet.energy}</p>
        `;

        // Eat knapp
        const eatButton = document.createElement("button");
        eatButton.textContent = "Eat";
        eatButton.addEventListener("click", () => {
        // Eat ökar fullness med 30, minskar energy med 15 och ökar happiness med 5
          pet.fullness = Math.min(100, pet.fullness + 30);
          pet.energy = Math.max(0, pet.energy - 15);
          pet.happiness = Math.min(100, pet.happiness + 5);

        // Lägg till en rad i historiken
          const history = document.getElementById("history");
          const newP = document.createElement("p");
          newP.textContent = `${pet.name} ate and is now more full!`;
          history.appendChild(newP);

        renderPets();
        });

        // Play knapp
        const playButton = document.createElement("button");
        playButton.textContent = "Play";

        playButton.addEventListener("click", () => {
        //Play ökar happniess med 30, minskar energy och fullness med 10
          pet.happiness = Math.min(100, pet.happiness + 30);
          pet.energy = Math.max(0, pet.energy - 10);
          pet.fullness = Math.max(0, pet.fullness - 10);

        // Lägg till en rad i historiken
          const history = document.getElementById("history");
          const newP = document.createElement("p");
          newP.textContent = `${pet.name} played and is now more happy!`;
          history.appendChild(newP);

        renderPets();
        });

        // Nap button
        const napButton = document.createElement("button");
        napButton.textContent = "Nap";
        napButton.addEventListener("click", () => {
          pet.energy = Math.min(100, pet.energy + 40);
          pet.happiness = Math.max(0, pet.happiness - 10);
          pet.fullness = Math.max(0, pet.fullness - 10);

        // Lägg till en rad i historiken
          const history = document.getElementById("history");
          const newP = document.createElement("p");
          newP.textContent = `${pet.name} took a nap and is now more energetic!`;
          history.appendChild(newP);

          renderPets();
        });


         // Lägg till knapparna i kortet
        petCard.appendChild(eatButton);
        petCard.appendChild(playButton);
        petCard.appendChild(napButton);

        // Lägg till kortet i containern
        petContainer.appendChild(petCard);
    });
}


// Timer som minskar stats var 10:e sekund
setInterval(() => {
    Pet.pets.forEach(pet => {
        pet.energy = Math.max(0, pet.energy - 10);
        pet.fullness = Math.max(0, pet.fullness - 10);
        pet.happiness = Math.max(0, pet.happiness - 10);
        
        if (pet.energy <= 0 || pet.fullness <= 0 || pet.happiness <= 0) {
            document.querySelectorAll("p");
            petCards.forEach(i => {
                i.remove();
});
        }

    });

    renderPets();
}, 10000);



    
    
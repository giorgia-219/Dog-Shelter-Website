// load dog cards on adopt.html

async function loadDogs() {
    try {
        const response = await fetch('http://localhost:3333/api/dogs');
        const dogs = await response.json();
        renderDogs(dogs);
    } catch (error) {
        console.error("Error fetching dogs:", error);
        document.getElementById('dogs-container').innerHTML = "<p>Sorry, we couldn't load the dogs at this time.</p>";
    }
}

function renderDogs(dogsArray) {
    const container = document.getElementById('dogs-container');
    container.innerHTML = '';

    dogsArray.forEach(dog => {
        const dogCard = `
            <div class="col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm" style="background-color: var(--light-bg); border: none;">
                    <img src="${dog.imageUrl || 'img/puppies_shelter.jpg'}" class="card-img-top" alt="${dog.name}" style="object-fit: cover; height: 250px;">
                    <div class="card-body">
                        <h5 class="card-title text-center" style="color: var(--dark-primary-color);">${dog.name}</h5>
                        <p class="card-text text-muted mb-1"><small>Age: ${dog.age}</small></p>
                        <p class="card-text text-muted mb-1"><small>Size: ${dog.size}</small></p>
                        <p class="card-text text-muted mb-3"><small>Gender: ${dog.gender}</small></p>
                        <a href="#" class="btn btn-dark w-100" style="background-color: var(--primary-color); border: none;">Adopt Me</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += dogCard;
    });
}

loadDogs();


// FORM LOGIC on contact-us.html

//first time owner

const prevOwner = document.getElementById("ownerNo")
const firstOwner = document.getElementById("ownerYes")
const currentOwner = document.getElementById("currOwner")
const previousPets = document.getElementById("prevPets")

prevOwner.addEventListener("change", () =>{
    if (prevOwner.checked) {
        currentOwner.style.display = "block";
        previousPets.style.display = "block";
    } else {
        currentOwner.style.display = "none";
        previousPets.style.display = "none";
    }
});

firstOwner.addEventListener("change", () =>{
    if (prevOwner.checked) {
        currentOwner.style.display = "block";
    } else {
        currentOwner.style.display = "none";
        previousPets.style.display = "none";
        currentPets.style.display = "none";
    }
});

// current pets
const currentPetsYes = document.getElementById("petsYes")
const currentPetsNo = document.getElementById("petsNo")
const currentPets = document.getElementById("currPets")

currentPetsYes.addEventListener("change", () =>{
    if (currentPetsYes.checked) {
       currentPets.style.display = "block";
    } else {
        currentPets.style.display = "none";
    }
});

currentPetsNo.addEventListener("change", () =>{
    if (currentPetsYes.checked) {
       currentPets.style.display = "block";
    } else {
        currentPets.style.display = "none";
    }
});


//current dog
const currDogCheckbox = document.getElementById("currDog");
const dogDetailsSection = document.getElementById("dogDetailsSection");

currDogCheckbox.addEventListener("change", () => {
	if (currDogCheckbox.checked) {
		dogDetailsSection.style.display = "block";
	} else {
		dogDetailsSection.style.display = "none";
	}
});
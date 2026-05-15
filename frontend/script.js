/* add logic for form:

1. input validation
2. hide "Do you currently have pets?" and "Which pets have you had before?" for first time owners
3. hide "Which pets do you currently have?" for users who don't currently have pets
4. add "other" text field that appears when other is clicked */


// FORM LOGIC

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
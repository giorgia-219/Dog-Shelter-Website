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

// INQUIRY FORM

const form = document.getElementById('adoption-form');

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Stop standard page reload
        
        // email address input validation + feedback
        const emailInput = document.getElementById('email');
        const emailFeedback = document.getElementById('email-feedback');
        
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // give feedback for empty or invalid email address
        if (emailInput.value.trim() === "") {
            emailInput.setCustomValidity("Empty");
            emailFeedback.textContent = "Please provide an email address.";
        } else if (!emailRegex.test(emailInput.value)) {
            emailInput.setCustomValidity("Invalid");
            emailFeedback.textContent = "Please look over your email format (e.g., name@domain.com).";
        } else {
            emailInput.setCustomValidity("");
        }

        // Form Validation Check
        if (!form.checkValidity()) {
            form.classList.add('was-validated'); // Bootstrap visual feedback
            return;
        }

        // Gather all data cleanly into a plain JavaScript Object
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            isFirstTimeOwner: document.getElementById('ownerYes').checked,
            preferredAge: form.querySelector('select:nth-of-type(1)').value,
        };

        try {
            const response = await fetch('http://localhost:3333/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result.success) {
                // Replace the form container with a success message
                document.querySelector('.form-container').innerHTML = `
                    <div class="text-center py-5">
                        <h2 style="color: var(--primary-color);">Grazie, ${formData.firstName}!</h2>
                        <p class="text-muted">Your inquiry has been successfully received. Our volunteers will get in touch soon.</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error("Submission failed:", error);
        }
    });
}


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
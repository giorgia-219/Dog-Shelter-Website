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
            hasCurrentPets: document.getElementById('petsYes').checked,

            previousPets: Array.from(document.querySelectorAll('input[name="previousPets"]:checked')).map(cb => cb.value).join(', '),
            currentPets: Array.from(document.querySelectorAll('input[name="currentPets"]:checked')).map(cb => cb.value).join(', '),
            
            dogBreed: document.getElementById('dogBreed')?.value || "",
            dogAge: document.getElementById('dogAge')?.value || "",
            dogGender: document.getElementById('dogGender')?.value || "",
            dogSterilized: document.getElementById('dogSterilized')?.value === "Yes" || false,

            preferredAge: document.getElementById('preferredDogAge')?.value || "",
            preferredGender: document.getElementById('preferredDogGender')?.value || "",
            preferredSize: document.getElementById('preferredDogSize')?.value || "",
            preferredActivityLevel: document.getElementById('preferredDogActivityLevel')?.value || "",

            dogSpace: document.getElementById('dogSpace')?.value || "",
            dogOwners: document.getElementById('dogOwners')?.value || "",
            dogTraining: document.getElementById('dogTraining')?.value || ""
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
                        <h2 style="color: var(--primary-color);">Thanks, ${formData.firstName}!</h2>
                        <p class="text-muted">We received your inquiry. Our volunteers will get in touch soon.</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error("Submission failed:", error);
        }
    });
}


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
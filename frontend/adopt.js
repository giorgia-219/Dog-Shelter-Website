let allDogs = [];

async function loadDogs() {
    try {
        const response = await fetch('http://localhost:3333/api/dogs');
        allDogs = await response.json();
        setupFilters();
        applyFilters();
    } catch (error) {
        console.error("Error fetching dogs:", error);
        document.getElementById('dogs-container').innerHTML = "<p>Sorry, we couldn't load the dogs at this time.</p>";
    }
}

function getAgeCategory(ageInYears) {
    if (ageInYears < 1) return 'puppy';
    if (ageInYears >= 1 && ageInYears <= 3) return 'young';
    if (ageInYears > 3 && ageInYears <= 8) return 'adult';
    return 'senior';
}

function setupFilters() {
    const inputs = document.querySelectorAll('.filter-gender, .filter-size, .filter-age');
    inputs.forEach(input => {
        input.addEventListener('change', applyFilters);
    });

    document.getElementById('clear-filters').addEventListener('click', () => {
        document.getElementById('genderAll').checked = true;
        document.querySelectorAll('.filter-size, .filter-age').forEach(cb => cb.checked = false);
        applyFilters();
    });
}

function applyFilters() {
    const selectedGender = document.querySelector('.filter-gender:checked').value;
    const selectedSizes = Array.from(document.querySelectorAll('.filter-size:checked')).map(cb => cb.value); 
    const selectedAges = Array.from(document.querySelectorAll('.filter-age:checked')).map(cb => cb.value);

    const filteredDogs = allDogs.filter(dog => {
        const matchesGender = (selectedGender === 'all') || (dog.gender === selectedGender);
        const matchesSize = (selectedSizes.length === 0) || selectedSizes.includes(dog.size);
        const targetAgeCategory = getAgeCategory(parseInt(dog.age));
        const matchesAge = (selectedAges.length === 0) || selectedAges.includes(targetAgeCategory);

        return matchesGender && matchesSize && matchesAge;
    });

    renderDogs(filteredDogs);
}

function renderDogs(dogsArray) {
    const container = document.getElementById('dogs-container');
    const noResults = document.getElementById('no-results');
    container.innerHTML = '';

    if (dogsArray.length === 0) {
        noResults.classList.remove('d-none');
        return;
    }
    noResults.classList.add('d-none');

    dogsArray.forEach(dog => {
        const dogCard = `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-sm border-0 position-relative transition-card" style="background-color: var(--light-bg); border-radius: 16px; overflow: hidden;">
                <img src="${dog.imageUrl || 'img/puppies_shelter.jpg'}" class="card-img-top" alt="${dog.name}" style="object-fit: cover; height: 240px;">
                    <div class="card-body p-4 d-flex flex-column justify-content-between">
                        <div>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h5 class="card-title my-0 fw-bold" style="color: var(--dark-primary-color);">${dog.name}</h5>
                                <span class="badge rounded-pill px-3 py-2 fw-medium" style="background-color: var(--light-bg); color: var(--text-color); font-size: 0.75rem;">
                                    ${dog.gender === 'M' ? 'Male' : 'Female'}
                                </span>
                            </div>
                            <div class="d-flex gap-2 text-muted mb-3" style="font-size: 0.85rem;">
                                <span><i class="bi bi-clock"></i> ${dog.age} </span>
                                <span>•</span>
                                <span>Size: ${dog.size} (${dog.weight || 'N/A'})</span>
                            </div>
                        </div>
                        <a href="contact-us.html" class="btn btn-dark w-100 mt-2 py-2 fw-semibold" style="background-color: var(--primary-color); border: none; border-radius: 10px;">Adopt Me</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += dogCard;
    });
}

loadDogs();


function applyFilters() {
    const selectedGender = document.querySelector('.filter-gender:checked').value;
    const selectedSizes = Array.from(document.querySelectorAll('.filter-size:checked')).map(cb => cb.value); 
    const selectedAges = Array.from(document.querySelectorAll('.filter-age:checked')).map(cb => cb.value);

    const filteredDogs = allDogs.filter(dog => {
        const matchesGender = (selectedGender === 'all') || (dog.gender === selectedGender);
        const matchesSize = (selectedSizes.length === 0) || selectedSizes.includes(dog.size);
        const targetAgeCategory = getAgeCategory(parseInt(dog.age));
        const matchesAge = (selectedAges.length === 0) || selectedAges.includes(targetAgeCategory);

        return matchesGender && matchesSize && matchesAge;
    });

    renderDogs(filteredDogs);
}
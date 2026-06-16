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
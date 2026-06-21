document.addEventListener('DOMContentLoaded', async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const dogId = urlParams.get('id');

    const loadingState = document.getElementById('loading-state');
    const dogProfile = document.getElementById('dog-profile');


    if (!dogId) {
        loadingState.innerHTML = `<div class="alert alert-danger">Error: No dog specified. Please return to the gallery.</div>`;
        return;
    }

    try {
        const response = await fetch(`http://localhost:3333/api/dogs/${dogId}`);
        
        if (!response.ok) {
            throw new Error('Dog profile not found or server error.');
        }

        const dogData = await response.json();

        
        document.getElementById('dog-name').textContent = dogData.name;
        document.getElementById('dog-age').textContent = dogData.age || 'Unknown';
        document.getElementById('dog-size').textContent = dogData.size || 'N/A';
        document.getElementById('dog-gender').textContent = dogData.gender || 'N/A';
        document.getElementById('dog-weight').textContent = dogData.weight ? `${dogData.weight}` : 'N/A';
        document.getElementById('dog-description').textContent = dogData.description || 'No description available yet.';
        
        
        const imgEl = document.getElementById('dog-image');
        imgEl.src = dogData.imageUrl || 'img/placeholder.jpg';


        loadingState.classList.add('d-none');
        dogProfile.classList.remove('d-none');

    } catch (error) {
        console.error("Failed loading target profile profile boundary:", error);
        loadingState.innerHTML = `
            <div class="alert alert-danger py-4">
                <h4>Profile Not Found</h4>
                <p class="mb-0">We couldn't load information for this dog. It may have already been adopted!</p>
            </div>`;
    }
});
document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
    fetchMoviePosters();
    
    // Add movie event listener
    const addMovieForm = document.getElementById('add-movie-form');
    addMovieForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addMovie();
    });
    
    // Update movie event listener
    const updateMovieForm = document.getElementById('update-movie-form');
    updateMovieForm.addEventListener('submit', function(event) {
        event.preventDefault();
        updateMovie();
    });

    // Get the modal
    const modal = document.getElementById("updateModal");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

// Fetch and display movies
function fetchMovies() {
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(movies => displayMovies(movies));
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = createMovieElement(movie);
        moviesContainer.appendChild(movieElement);
    });
}

function createMovieElement(movie) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const imageElement = document.createElement('img');
    imageElement.src = movie.poster;
    movieElement.appendChild(imageElement);

    const titleElement = document.createElement('h3');
    titleElement.textContent = movie.title;
    movieElement.appendChild(titleElement);

    const runtimeElement = document.createElement('p');
    runtimeElement.textContent = `Runtime: ${movie.runtime} minutes`;
    movieElement.appendChild(runtimeElement);

    const showtimeElement = document.createElement('p');
    showtimeElement.textContent = `Showtime: ${movie.showtime}`;
    movieElement.appendChild(showtimeElement);

    const ticketsSoldElement = document.createElement('p');
    ticketsSoldElement.textContent = `Tickets Sold: ${movie.tickets_sold}`;
    movieElement.appendChild(ticketsSoldElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = movie.description;
    movieElement.appendChild(descriptionElement);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this movie?')) {
            deleteMovie(movie.id);
        }
    });
    movieElement.appendChild(deleteButton);

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.classList.add('update-button');
    updateButton.addEventListener('click', () => {
        fetchMovieDetails(movie.id);
    });
    movieElement.appendChild(updateButton);

    return movieElement;
}

// Add movie
function addMovie() {
    const newMovie = {
        title: document.getElementById('title').value,
        runtime: document.getElementById('runtime').value,
        capacity: document.getElementById('capacity').value,
        showtime: document.getElementById('showtime').value,
        tickets_sold: document.getElementById('tickets_sold').value,
        description: document.getElementById('description').value,
        poster: document.getElementById('poster').value
    };

    fetch('http://localhost:3000/films', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    })
    .then(response => response.json())
    .then(() => {
        fetchMovies();
        document.getElementById('add-movie-form').reset();
    });
}

// Delete movie
function deleteMovie(id) {
    fetch(`http://localhost:3000/films/${id}`, {
        method: 'DELETE'
    })
    .then(() => fetchMovies());
}

// Fetch movie details and open update modal
function fetchMovieDetails(id) {
    fetch(`http://localhost:3000/films/${id}`)
        .then(response => response.json())
        .then(movie => {
            document.getElementById('update-movie-id').value = movie.id;
            document.getElementById('update-title').value = movie.title;
            document.getElementById('update-runtime').value = movie.runtime;
            document.getElementById('update-capacity').value = movie.capacity;
            document.getElementById('update-showtime').value = movie.showtime;
            document.getElementById('update-tickets_sold').value = movie.tickets_sold;
            document.getElementById('update-description').value = movie.description;
            document.getElementById('update-poster').value = movie.poster;

            const modal = document.getElementById("updateModal");
            modal.style.display = "block";
        });
}

// Update movie
function updateMovie() {
    const id = document.getElementById('update-movie-id').value;
    const updatedMovie = {
        title: document.getElementById('update-title').value,
        runtime: document.getElementById('update-runtime').value,
        capacity: document.getElementById('update-capacity').value,
        showtime: document.getElementById('update-showtime').value,
        tickets_sold: document.getElementById('update-tickets_sold').value,
        description: document.getElementById('update-description').value,
        poster: document.getElementById('update-poster').value
    };

    fetch(`http://localhost:3000/films/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedMovie)
    })
    .then(response => response.json())
    .then(() => {
        fetchMovies();
        const modal = document.getElementById("updateModal");
        modal.style.display = "none";
    });
}

// Fetch and display movie posters in slideshow
function fetchMoviePosters() {
    fetch('http://localhost:3000/films')
        .then(response => response.json())
        .then(movies => displayMoviePosters(movies));
}

function displayMoviePosters(movies) {
    const slideshowContainer = document.querySelector('.slideshow-container');
    movies.forEach((movie, index) => {
        const slide = document.createElement('div');
        slide.classList.add('mySlides');
        slide.innerHTML = `<img src="${movie.poster}" style="width:100%">`;
        slideshowContainer.appendChild(slide);
    });
    showSlides(1); // Start slideshow
}

// Slideshow functionality
let slideIndex = 0;

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    if (slides.length === 0) return;
    slideIndex += n;
    if (slideIndex > slides.length) slideIndex = 1;
    if (slideIndex < 1) slideIndex = slides.length;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(() => showSlides(n), 3000); // Change image every 3 seconds
}

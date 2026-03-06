const KEY = "29f6fc7b";
const API_URL = "http://www.omdbapi.com/";

const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

const movieDescription = document.getElementById("movieDescription");

const fetchMovieDetails = async (id) => {
    try {
        const response = await fetch(`${API_URL}?i=${id}&apikey=${KEY}`);
        if (!response.ok) {
            throw new Error("Error!");
        }
        const data = await response.json();
        displayMovieDetails(data);
    } catch (error) {
        movieDescription.innerHTML = `<p class="error-result">${error.message}</p>`;
    }
}

const displayMovieDetails = (data) => {
    if (data.Response === "False") {
        movieDescription.innerHTML = `<p class="error-result">${data.Error}</p>`;
        return;
    }
    movieDescription.innerHTML = `
        <div class="head-information">
            <div class="title-container">
                <p class="title">${data.Title} (${data.Year})</p>
                <p class="rating"><strong>Rating:</strong> ${data.imdbRating} / 10</p>
            </div>
            <img src="${data.Poster}" onerror="this.src='../placeholder_poster.png';" alt="${data.Title} Poster" class="movie-poster">
        </div>
        
        <div class="movie-details">
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
        </div>
    `;
}

if (imdbID) {
    fetchMovieDetails(imdbID);
} else {
    movieDescription.innerHTML = `<p class="error-result">No movie ID provided.</p>`;
}
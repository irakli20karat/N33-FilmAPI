const KEY = "29f6fc7b";
const API_URL = "http://www.omdbapi.com/";

const movieInput = document.getElementById("movieInput");
const getMovieBtn = document.getElementById("getMovieBtn");
const movieResult = document.getElementById("movieResult");

const fetchMovie = async (movie) => {
    try {
        const response = await fetch(`${API_URL}?s=${movie}&apikey=${KEY}`);
        if (!response.ok) {
            throw new Error("Error!");
        }
        const data = await response.json();
        displayMovie(data);
    } catch (error) {
        movieResult.innerHTML = `<p class="error-result">${error.message}</p>`;
    }
}

const displayMovie = (data) => {
    if (data.Response === "False") {
        movieResult.innerHTML = `<p class="error-result">${data.Error}</p>`;
        return;
    }
    movieResult.innerHTML = "";
    data.Search.forEach(e => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.addEventListener("click", () => {
            window.location.href = `../details/details.html?imdbID=${e.imdbID}`;
        });

        movieCard.innerHTML = `
            <img src="${e.Poster}" onerror="this.src='../placeholder_poster.png';" alt="${e.Title} Poster" class="movie-poster">
            <div class="movie-info">
                <h3>${e.Title}</h3>
                <p>Year: ${e.Year}</p>
                <p>Type: ${e.Type}</p>
            </div>
        `;
        movieResult.appendChild(movieCard);
    });
}

getMovieBtn.addEventListener("click", () => {
    const movie = movieInput.value.trim();
    if (movie) {
        movieResult.innerHTML = `
        <p class="default-result">
            Loading movie information for <strong>${movie}</strong>...
        </p>`;
        fetchMovie(movie);
    } else {
        movieResult.innerHTML = `
        <p class="default-result">
            Please enter a movie name and click "Get Movie" to see all the available movie information.
        </p>`;
    }
});
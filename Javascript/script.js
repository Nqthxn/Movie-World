import {api_key} from './key.js';
import { movieIds } from './randomData.js';

let movieContainers = document.querySelector('.movie-container');
const search = document.querySelector('.search-btn');


async function fetchMovieData(movieId){
    let url = `http://www.omdbapi.com/?i=${movieId}&apikey=${api_key}`;
    try{
        const res = await fetch(url);
        if(!res.ok){
            alert('Problem Found');
            return;
        }
        return await res.json();

    }catch(error){
        console.log(error);
        return;
    }
}
async function getData(){
    try{
        const fetchedMovies = [];
        let i = 0;
        while(i < 12){
            const movieId = movieIds[i];
            const movieData = await fetchMovieData(movieId);
            fetchedMovies.push(movieData);
            i++;
        }
        displayMovies(fetchedMovies);
    }catch(error){
        console.log(error);
    }
}
function displayMovies(movies){
    let movieIndex = 0;
    movieContainers.innerHTML = '';
    for(let i = 0; i < 2; i++){
        const rowDiv = document.createElement('div');
        rowDiv.classList.add(`row${i + 1}`);

        for(let j = 0; j < 6; j++){
            const movie = movies[movieIndex];
            movieIndex++;
            const img = document.createElement('img');
            img.src = movie.Poster;
            img.classList.add('posters');
            rowDiv.appendChild(img);
        }
        movieContainers.appendChild(rowDiv);
    }
}

async function fetchMovieQuery(query){
    let url = `http://www.omdbapi.com/?i=${movieIds}&apikey=${api_key}&s=${query}`;
    try{
        const res = await fetch(url);
        if(!res.ok){
            alert('Problem Found');
            return;
        }
        return await res.json();

    }catch(error){
        console.log(error);
        return;
    }
}
search.addEventListener('click', searchMovie)


async function searchMovie(){
    const userInput = document.querySelector('.search-box').value;
    const userSearch = await fetchMovieQuery(userInput);

    if(userSearch && userSearch.Search){
        displaySearchMovies(userSearch.Search);
    }else{
        movieContainers.innerHTML = 'No Movies Found';
    }
}
function displaySearchMovies(movies){
    movieContainers.innerHTML = '';
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('search-results');

    movies.forEach(movie => {
        const img = document.createElement('img');
        img.src = movie.Poster;
        img.classList.add('posters');
        rowDiv.appendChild(img);
    });
    movieContainers.appendChild(rowDiv);
}
document.querySelector('.search-box').addEventListener('keypress', function(e) {
    if(e.key === 'Enter'){
        searchMovie();
    }
});
getData();


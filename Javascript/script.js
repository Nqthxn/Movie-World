import {api_key} from './key.js';
import { movieIds } from './randomData.js';


let movieContainers = document.querySelector('.movie-container');


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
        while(fetchedMovies.length < 12){
            const random = Math.floor(Math.random() * movieIds.length);
            const movieId = movieIds[random];
            const movieData = await fetchMovieData(movieId);

            if(movieData && !fetchedMovies.some(movie => movie.imdbID === movieData.imdbID)){
                fetchedMovies.push(movieData);
            }
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
getData();


import {api_key} from './key.js';
import { movieIds } from './randomData.js';

const random = Math.floor(Math.random() * movieIds.length);


let url = `http://www.omdbapi.com/?i=${movieIds[random]}&apikey=${api_key}`;
//Fetching Data
async function getData(){
    try{
        const res = await fetch(url);
        if(!res.ok){
            alert('Problem Found');
            return;
        }
        const data = await res.json();
        displayMovies(data);
    }catch(error){
        console.log(error);
    }
}
function displayMovies(movies){
    console.log(movies.Poster);
}
getData();

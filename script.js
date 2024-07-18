import {api_key} from './key.js';

let url = `http://www.omdbapi.com/?i=tt3896198&apikey=${api_key}`;
//Fetching Data
async function getData(){
    try{
        const res = await fetch(url);
        if(!res.ok){
            alert('Problem Found');
            return;
        }
        const data = await res.json();
        console.log(data);
    }catch(error){
        console.log(error);
    }
}
getData();


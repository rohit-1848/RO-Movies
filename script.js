// https://www.omdbapi.com/?s=thor&page=1&apikey=ab0904f1
// https://www.omdbapi.com/?i=tt3896198&apikey=ab0904f1
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const yearBox= document.getElementById('yearBox');
const plotBox=document.getElementById('plotBox');
const typeBox=document.getElementById('typeBox');
// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=ab0904f1`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
     console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
    }
    
    function findMovies(){
        let titleValue=(movieSearchBox.value).trim();
        let yearValue=(yearBox.value);
        let plotValue=(plotBox.value);
        let typeValue=(typeBox.value);
        // console.log(titleValue);
        if(titleValue.length>0){
            searchList.classList.remove('hide-search-list');
            if(yearValue>0 ){
               let searchTerm=titleValue+"&y="+yearValue+"&plot="+plotValue+"&type="+typeValue;
               loadMovies(searchTerm);
            }
            else if(yearValue<=0 ){
                let searchTerm=titleValue+"&plot="+plotValue+"&type="+typeValue;
                loadMovies(searchTerm);
            }
        }
        else{
            searchList.classList.add('hide-search-list');
        }
    }
    function displayMovieList(movies){
        searchList.innerHTML="";
        for(let idx=0;idx<movies.length;idx++){
            let movieListItem=document.createElement('div');
            // console.log(movieListItem);
            movieListItem.dataset.id= movies[idx].imdbID; //setting movie id in data-id
            movieListItem.classList.add('search-list-item');
            if(movies[idx].Poster != "N/A")
                moviePoster=movies[idx].Poster;
            else
                moviePoster="Stuff/imgNotFound.jpg" ;
            movieListItem.innerHTML=`
            <div class="search-item-thumbnail">
                     <img src="${moviePoster}">
                </div>
                <div class="search-item-info ">
                    <h3>${movies[idx].Title}</h3>
                    <p>${movies[idx].Year}</p> 
                </div> 
            `;
            searchList.appendChild(movieListItem);
        }
        loadMovieDetails();
    }
function loadMovieDetails(){
    const searchListMovies=searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie =>{
        movie.addEventListener('click', async() =>{
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value="";
            const result= await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=ab0904f1`);
            const movieDetails=await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}
function displayMovieDetails(details){
    resultGrid.innerHTML=`
      <div class="movie-poster">
                        <img src="${(details.Poster!="N/A")? details.Poster : "Stuff/imgNotFound.jpg"}" alt="movie-poster">
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${details.Title}</h3>
                        <ul class="movie-misc-info">
                            <li class="year">Year:${details.Year}</li>
                            <li class="rated">Rating:${details.Rated}</li>
                            <li class="released">Released: ${details.Released}</li>
                        </ul>
                        <p class="genre"><b>Genre:</b>${details.Genre}</p>
                        <p class="writer"><b>Writer:</b>${details.Writer}</p>
                        <p class="actors"><b>Actors:</b>${details.Actors}</p>
                        <p class="plot"><b>Plot:</b>${details.Plot}</p>
                        <p class="language"><b>Language:</b>${details.Language}</p>
                        <p class="awards"><b><i  class="fas fa-award"></i></b>${details.Awards}</p>                    </div>
                </div> 
                `;
}

//to hide search list once movie is found
window.addEventListener('click',(event)=>{
    if(event.target.className != "form-control"){
    searchList.classList.add('hide-search-list');
    } 
}); 
//navBar 😊
function showAlert1(){
    alert('You are on wrong track!⚠️.In search of me you might lost→.')
}
function showAlert2(){
    alert('Loading🔃 since 1989,You will be soon directed to our APP:)')
}
function showAlert3(){
    alert('You are already Sign In💀')
}
import{getAnime,createCard} from './api.js'

const airing = document.getElementById("topCard");
const rated = document.getElementById("ratedCard");
const popular = document.getElementById("popularCard");
const upcoming = document.getElementById("upcomingCard");
const close = document.getElementById("close")
const modal = document.getElementById("modal");
const modalBackground = document.getElementById("modal-content")
const search = document.getElementById("search")
const form = document.getElementById("form")
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const searchResults = document.getElementById("search-Results");
const mainContent = document.querySelector(".main-content");

async function searchAnime() {
    const query = searchInput.value.trim();

    if (!query) return;

    const animeList = await getAnime(
        `https://api.jikan.moe/v4/anime?q=${query}&limit=5`
    );


    if (animeList === null) {
    // Server/network error
    }
    if (animeList.length === 0) {
    searchResults.innerHTML = `
       <div class="error-message">
            <h2>⚠️ Service temporarily unavailable</h2>
            <p>Anime data couldn't be loaded at the moment.</p>
            <p>Please try again in a minute.</p>
            <button onclick="location.reload()" id="tryBtn">Try Again</button>
        </div>
    `;
    return;
}
    searchResults.innerHTML = "";

    animeList.forEach(anime => {
        searchResults.appendChild(createCard(anime));
    });
    mainContent.style.display = "none";
    searchResults.style.display = "grid";
}
async function loadAiring() {
    const airingUrl = await getAnime(
    `https://api.jikan.moe/v4/top/anime?filter=airing&limit=3`
    );
    console.log(airingUrl)
    airingUrl.forEach(anime =>{
        airing.appendChild(createCard(anime))
    })
}

async function loadRated() {
    const ratedUrl = await getAnime(
        `https://api.jikan.moe/v4/top/anime?limit=3`
    )
    
    ratedUrl.forEach(anime =>{
        rated.appendChild(createCard(anime))
    })
}

async function loadPopular(){
    const popularUrl = await getAnime(
        `https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=3`    
    )

    popularUrl.forEach(anime =>{
        popular.appendChild(createCard(anime))

   })
}

async function loadUpcoming(){
    const upcomingUrl = await getAnime(
         `https://api.jikan.moe/v4/seasons/upcoming?limit=3`
    )
     if (upcomingUrl.length === 0) {
        upcoming.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Oops!</h3>
                <p>We couldn't load the anime list right now.</p>
                <p>Please try again in a few moments.</p>
            </div>
        `;
        return;
    }

    upcomingUrl.forEach(anime =>{
        upcoming.appendChild(createCard(anime))

   })
}

function delay(ms){
    return new Promise((resolve)=>
        setTimeout(resolve, ms))
}

async function loadAnime() {
    await loadAiring();
    await delay (1000);
    await  loadRated();
    await delay (1000);
    await  loadPopular();
    await delay (1000);
    await  loadUpcoming();
    
}

loadAnime()

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (searchInput.value.trim() === "") {
        searchResults.innerHTML = "";
    
    searchResults.innerHTML = "";
    searchResults.style.display = "none";
    mainContent.style.display = "block";

        return;
    }

    searchAnime();
});

close.addEventListener("click", function(){
        modal.classList.remove("show")
});


import { getAnime, createCard } from "./api.js";
const title = document.getElementById("title")
const top = document.getElementById("topCard")
const close =  document.getElementById("close")
const params = new URLSearchParams(window.location.search);
const category = params.get("category") || "airing";
const modal = document.getElementById("modal");
const load = document.getElementById("load")

let page = 1;

const urls = {
   
    airing: "https://api.jikan.moe/v4/top/anime?filter=airing&limit=15",
    rated: "https://api.jikan.moe/v4/top/anime?limit=15",
    popular: "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=15",
    upcoming: "https://api.jikan.moe/v4/seasons/upcoming?limit=15"

};

const url = urls[category];

async function animeCategory() {

    const animeList = await getAnime(url);

    
    animeList.forEach(anime => {
        top.appendChild(createCard(anime));
    });

    if (category === "rated"){
        title.textContent = "⭐ Top Rated"
    } else if (category === "popular"){
        title.textContent = "❤️ Most Popular"
    } else if (category === "upcoming"){
        title.textContent =  "📅 Upcoming"
    } 

}


animeCategory()




close.addEventListener("click", function(){
        modal.classList.remove("show")
    });

async function loadPage() {
    const animeList = await getAnime(`${urls[category]}&page=${page}`);

    if (animeList.length === 0) {
        load.disabled = true;
        load.textContent = "No more anime";
        return;
    }

    animeList.forEach(anime => {
        top.appendChild(createCard(anime));
    });
}

// Load the first page
loadPage();

// Load the next page
load.addEventListener("click", async () => {
    page++;
    await loadPage();
});
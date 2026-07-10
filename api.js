const title = document.getElementById("modalTitle")
const modalDescription = document.getElementById("modalDescription")
const modal = document.getElementById("modal")
const modalImage = document.getElementById("modalImage")
const top = document.getElementById("topCard")
const modalBackground = document.getElementById("modal-content")

 export async function getAnime(url) { //to get the url of the anime
    try{
        const response = await fetch(url)

        if(!response.ok){
            throw new Error (`HTTP error! Status: ${response.status}`);
        }  
        
        const data = await response.json();
        return  data.data;

        
        
    } catch(error){
        console.log(error)
        return null;
    }
}

  export function createCard(anime){ // i create card that can be used by each section.
    const card = document.createElement("div")
    card.classList.add("card")
    card.innerHTML = `
        <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
        <div class="card-body">
            <h2>${anime.title}</h2>
            <p id="rating">⭐ ${anime.score??"Not Found!"}</p>
            <p id="episode"> 📺 Episodes: ${anime.episodes??"Not Found!" } </p>
            <p> 🎭 Genre: ${anime.genres.map(genre => genre.name).join(" , ")} </p>
            <p> 📅 Year: ${anime.aired.string} </p>
            <p> 🏢 Studio: ${anime.studios.map( studios => studios.name).join(" , ")} </p>
            <p>  ⏱️ Duration: ${anime.duration} </p>
          <p>
            Synonyms:
                ${
                    anime.title_synonyms.length
                    ? anime.title_synonyms.join(", ")
                    : "Not Found!"
                }
            </p>
            <p> 🔞 Rating: ${anime.rating}  </p>
            <button class ="descriptionBtn"> See Description... </button>
            <p class="description"> ${anime.synopsis} </p>
            
           
        </div>
    `;

   
    
    const seeBtn = card.querySelector(".descriptionBtn")
    

    seeBtn.addEventListener("click",function(){
      
        modalImage.src = anime.images.jpg.large_image_url
        title.textContent = anime.title
        modalDescription.textContent = anime.synopsis
        modalBackground.style.setProperty(
        "--bg-image",
        `url(${anime.images.jpg.large_image_url})`);
        modal.classList.add("show");
       
    });

    

    return card
}


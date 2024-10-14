//fetch all movie titles
fetch("http://localhost:3000/films")
  .then((res) => res.json())
  .then((movies) => {
    movies.forEach((movie) => {
      const films = document.getElementById("films");
      const list = document.createElement("li");
      list.textContent = movie.title;
      list.classList.add("film", "item","movielist")
      if(movie.tickets_sold === movie.capacity){
        list.classList.add("sold-out")
      }

       const deleteButton = document.createElement("button")
       deleteButton.classList.add("col" ,"deletebtn")
       deleteButton.textContent = "delete";

       list.appendChild(deleteButton)
       
        deleteButton.addEventListener("click" ,(e) => {
          deleteButton.parentElement.remove()
          deleteFilm(movie);
        })
        films.appendChild(list)
    })
    }
  );
  
//showing info
const showing = document.getElementById("showing");
showing.addEventListener("click", (e) => {
  e.preventDefault();
});

fetch("http://localhost:3000/films/1")
  .then((res) => res.json())
  .then((movie) => {
    const poster = document.getElementById("poster");


    poster.src = movie.poster;

    showing.innerHTML = `
                  <div class="card">
            <div id="title" class="title">${movie.title}</div>
            <div id="runtime" class="meta">${movie.runtime} minutes</div>
            <div class="content">
              <div class="description">
                <div id="film-info">${movie.description}</div>
                <span id="showtime" class="ui label">${movie.showtime}</span>
                <span id="ticket-num">${
                  movie.capacity - movie.tickets_sold
                } remaining tickets</span>
              </div>
            </div>
            <div class="extra content">
              <button id="buy-ticket" class="ui orange button">
                ${movie.tickets_sold == movie.capacity ? "Sold out":"Buy ticket" }
              </button>
            </div>
          </div>
        </div>

        `;

        document.getElementById("buy-ticket").addEventListener("click", (e) => {
          e.preventDefault();
       
          buyButton(movie.id);
          postTicket(movie.id);

        })

  });

//buying tickets

function buyButton(id) {

  const buyTicket = document.getElementById("buy-ticket");
 
    fetch(`http://localhost:3000/films/${id}`)
      .then((response) => response.json())
      .then((movie) => {
        if (movie.tickets_sold < movie.capacity) {
          movie.tickets_sold += 1;

          fetch(`http://localhost:3000/films/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
              tickets_sold: movie.tickets_sold,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((res) => res.json())
            .then(() => {
              const numTickets = movie.capacity - movie.tickets_sold;
              if (movie.tickets_sold === movie.capacity) {
                buyTicket.textContent = "Sold out";
                buyTicket.disabled = true;
              }
            });
        }
      });
}
//delete film
function deleteFilm(movie){
  fetch(`http://localhost:3000/films/${movie.id}`, {
    method: "DELETE",
  })
  .then((res) => res.json())
  .then(() => {

    console.log("Movie deleted")
  }) 
}

//post film
function postTicket (movie_id) {
  fetch('http://localhost:3000/tickets', {

    method: 'POST',
    body: JSON.stringify({
      "film_id": movie_id,
      "number_of_tickets": 1
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
  
}

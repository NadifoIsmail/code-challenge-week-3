//fetch all movie titles
fetch("http://localhost:3000/films")
  .then((res) => res.json())
  .then((data) => {
    const films = document.getElementById("films");

    for (post of data) {
      films.innerHTML += `
        <ul class="list-group list-group-flush">

        <li class="list-group-item" >${post.title} </li> 

        </ul>`;
    }
  });

//showing info
const showing = document.getElementById("showing");
showing.addEventListener("click",(e) => {
e.preventDefault()

})

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
              <button onclick="buyButton(${
                movie.id
              })"id="buy-ticket" class="ui orange button">
                Buy Ticket
              </button>
            </div>
          </div>
        </div>

        `;

  });

//buying tickets

function buyButton(id) {

  const buyTicket = document.getElementById("buy-ticket");
  buyTicket.addEventListener("click",(e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/films/${id}`)
  .then((response) => response.json())
  .then((movie) => {


    if(movie.tickets_sold < movie.capacity){
      movie.tickets_sold += 1;
    }
    else{
      
    }

    fetch(`http://localhost:3000/films/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        tickets_sold: movie.tickets_sold 
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => {
        console.log("Ticket purchased successfully")
      });
  });

    
  })

  
  
}

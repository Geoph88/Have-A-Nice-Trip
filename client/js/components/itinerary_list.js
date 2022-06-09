function renderItineraryList(tripId) {
  state.tripId = tripId
  //getting the itineraries and putting them on the page:
  renderItinerary()
    .then((itineraries) => {
      document.querySelector('#page').innerHTML = `
        <section class="itinerary-list">
          <li onClick="renderAddItinerary()">Add itinerary</li>
          <section class="itineraries">
            ${itineraries}
          </section>
        </section>
      `
    })
}

function renderItinerary() {
  return state.itineraries.map(itinerary => `
    <section class='itinerary' data-id='${itinerary.id}'>
      <header>
        <h2>${itinerary.start_location}</h2>
      </header>
      <span>${itinerary.start_date}</span>
      <span>${itinerary.end_date}</span>
      <span>${itinerary.start_time}</span>
      <span>${itinerary.end_date}</span>
      <p>${itinerary.end_location}</p>
      <article>
        <p>${itinerary.activities}</p>
        <p>${itinerary.notes}</p>
        <p>${itinerary.checklist}</p>
      </article>
    </section>
  `).join('')
}

// function renderItinerary() {
//   return state.itineraries.map(itinerary => `
//     <section class='itinerary' data-id='${itinerary.id}'>
//       <header>
//         <h2>${itinerary.start_location}</h2>
//       </header>
//       <span>${itinerary.start_date}</span>
//       <span>${itinerary.end_date}</span>
//       <span>${itinerary.start_time}</span>
//       <span>${itinerary.end_date}</span>
//       <p>${itinerary.end_location}</p>
//       <article>
//         <p>${itinerary.activities}</p>
//         <p>${itinerary.notes}</p>
//         <p>${itinerary.checklist}</p>
//       </article>
//     </section>
//   `).join('')
// } 
  function renderItinerary() {
  return fetch(`/api/itineraries/${state.tripId}`)
    .then(res => res.json())
    .then(itineraries => {
      state.itinerariesForTrip = itineraries
    })
    .then(() => {
      return state.itinerariesForTrip.map(itinerary => `
      <section class='itinerary' data-id='${itinerary.id}'>
        <header>
          <h2>${itinerary.start_location}</h2>
        </header>
        <span>${itinerary.start_date}</span>
        <span>${itinerary.end_date}</span>
        <span>${itinerary.start_time}</span>
        <span>${itinerary.end_date}</span>
        <p>${itinerary.end_location}</p>
        <article>
          <p>${itinerary.activities}</p>
          <p>${itinerary.notes}</p>
          <p>${itinerary.checklist}</p>
        </article>
      </section>
    `).join('')
    })
}

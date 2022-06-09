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
  //getting the itinerary data for that trip
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
          <p>${itinerary.start_date} - ${itinerary.start_time}</p>
          <h2>${itinerary.end_location}</h2>
          <p>${itinerary.end_date} - ${itinerary.end_time}</p>
        </header>
        
        <article>
          <p><strong>Activities:</strong> ${itinerary.activities}</p>
          <p><strong>Remember to bring:</strong> ${itinerary.checklist}</p>
          <p><strong>Notes:</strong> ${itinerary.notes}</p>
        </article>
      </section>
    `).join('')
    })
}

function renderItineraryList(tripId) {
  document.querySelector('#page').innerHTML = `
    <section class="itinerary-list">
      <li onClick="renderAddItinerary(${tripId})">Add itinerary</li>
      ${renderItinerary()}
    </section>
  `
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
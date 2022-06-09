// function renderTripList(userId) {
//   state.loggedInUserName.userId = userId
//   console.log(userId)
//   document.querySelector('#page').innerHTML = `
//     <section class="trip-list">
//       ${renderTrips()}
//     </section>
//   `
// }
function renderTripList(userId) {
  userId = state.loggedInUserName.userId
  console.log(userId)
  renderTrips()
  .then((trips) => {
      if (state.loggedInUserName) {
      console.log(state)
      document.querySelector('#page').innerHTML = `
      <section class="trip-list">
        ${trips}
      </section>
    `
      } else {
        document.querySelector('#page').innerHTML = ''
      }
  })
}

function renderTrips() {
  userId = state.loggedInUserName.userId
  console.log(userId)
  return fetch(`api/trips/${userId}`)
  .then(res => res.json())
  .then(trips => {
    state.trips = trips
  })
  .then(() => {
    return state.trips.map(trip => `
    <section class='trip' data-id='${trip.id}'>
      <header>
      <h2 onClick="renderItineraryList(${trip.id})">${trip.name}</h2>
        <span onClick="deleteTrip(event)">delete</span>
        <span onClick="renderEditTrip()">edit</span>
      </header>
      <p>${trip.start_date}</p>
      <p>${trip.end_date}</p>
    </section>
    `).join('')
  })
}

function renderEditTrip() {
  return state.trips.map(trip =>
    document.querySelector('#page').innerHTML = `
  <section class='edit-trip' data-id='${trip.id}'>
    <form onSubmit="editTrip(event)">
      <h2>Edit Trip</h2>
      <fieldset>
        <label for="">Name: </label>
        <input type="name" name="name" placeholder="${trip.name}">
      </fieldset>

      <fieldset>
        <label for="">Start date: </label>
        <input type="date" name="start_date" value="${trip.start_date}">
      </fieldset>

      <fieldset>
        <label for="">End Date: </label>
        <input type="date" name="end_date" value="${trip.start_date}">
      </fieldset>
      <button>Edit Trip</button>
    </form>
  </section>
  `).join('')
}

function editTrip(event) {
  event.preventDefault()
  const form = event.target
  const data = Object.fromEntries(new FormData(form))
  fetch('/api/trips', {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(trip => {
      state.trips.push(trip)
      renderTripList(userId)
    })
}

function deleteTrip(event) {
  const deleteBtn = event.target
  const tripDOM = deleteBtn.closest('.trip')
  const tripId = tripDOM.dataset.id
  fetch(`/api/trips/${tripId}`, {
    method: 'DELETE'
  })
    .then(() => {
      state.trips = state.trips.filter(t => t.id != tripId)
      renderTrips()
    })
}


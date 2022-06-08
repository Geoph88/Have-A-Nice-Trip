function renderAddTrip() {
  document.querySelector('#page').innerHTML = `
  <section class='create-trip'>
    <form onSubmit="createTrip(event)">
      <h2>Add trip</h2>
      <fieldset>
        <label for="">Name: </label>
        <input type="name" name="name">
      </fieldset>

      <fieldset>
        <label for="">Start date: </label>
        <input type="date" name="start_date">
      </fieldset>

      <fieldset>
        <label for="">End Date: </label>
        <input type="date" name="end_date">
      </fieldset>
      <button>Add Trip</button>
    </form>
  </section>
  `
}

function createTrip(event) {
  event.preventDefault() 
  const form = event.target
  const data = Object.fromEntries(new FormData(form))
  const userId = state.sessionId
  fetch(`/api/trips/${userId}`, {
    method: 'POST',
    headers: { "Content-Type": "application/json"}, 
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(trip => {
    state.trips.push(trip)
    renderTripList()
  })
}

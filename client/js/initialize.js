const state = { 
  trips: [], 
  itinerariesForTrip: []
}

fetch('/api/trips')
  .then(res => res.json())
  .then(trips => {
    state.trips = trips
    header()

  })

fetch('/api/itineraries/:tripId') 
  .then(res => res.json())
  .then(itineraries => {
    state.itineraries = itineraries 
})


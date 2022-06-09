function header() {
    if (state.loggedInUserName) {
        document.querySelector('.header-nav').innerHTML = `
            <ul>
                <li onClick="renderTripList(${state.loggedInUserName.userId})">Show Trips</li>
                <li onClick="renderAddTrip()">Create Trip</li>
            </ul>
            <li onClick="logout(event)">Logout</li>
        `
    } else {
        document.querySelector('.header-nav').innerHTML = `
            <ul>
                <li onClick="renderSignUp()">Sign Up</li>
                <li onClick="renderLogin()">Log in</li>
            </ul>
        `
    }
}

function logout(event) {
    event.preventDefault()
    state.loggedInUserName = false
    header()
    renderTripList()
}
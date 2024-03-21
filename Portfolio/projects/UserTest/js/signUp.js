// firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


// link database
const appSettings = {
    databaseURL: "https://fir-test-a92b3-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

// ref for db -- users
const usersInDB = ref(database, "users")

// end of firebase setup-------------------------------------------------------

// grab and set elements
let newUsername = document.getElementById('newUsername')
let newPassword = document.getElementById('newPassword')
let verifyPassword = document.getElementById('verifyPassword')

let createBtn = document.getElementById('create-btn')

// new user class
class newUser {
    constructor(username, password) {
        this.username = username
        this.password = password
    }
}

// button clicks -- create account
createBtn.addEventListener('click', () => {
    let usernameValue = (newUsername.value).trim().toLowerCase()
    let passwordValue = (newPassword.value).trim().toLowerCase()
    let verifyPasswordValue = (verifyPassword.value).trim().toLowerCase()

    if (usernameValue == "" || passwordValue == "" || verifyPasswordValue == "") {
        alert('Please fill out all entries.')

    }
    else if (passwordValue != verifyPasswordValue) {
        alert('Passwords do not match.')

    }
    else if (usernameValue.length < 6 || passwordValue.length < 6) {
        alert('Username and password must be at least 6 characters long.')
    }
    else { // successful 
        // code here
        let addUser = new newUser(usernameValue, passwordValue)
        push(usersInDB, addUser)

        alert('Account created successfully!')
        window.location.href = './login.html'
    }


    // clear fields
    newUsername.value = ""
    newPassword.value = ""
    verifyPassword.value = ""

})
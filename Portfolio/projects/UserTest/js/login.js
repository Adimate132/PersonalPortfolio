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

// clear session storage 
sessionStorage.clear()

// grab and set elements
let usernameEl = document.getElementById('username')
let passwordEl = document.getElementById('password')
let loginBtn = document.getElementById('login-btn')

loginBtn.addEventListener('click', () => {

    let match = false
    // set input fields
    let usernameVal = (usernameEl.value).trim().toLowerCase()
    let passwordVal = (passwordEl.value).trim().toLowerCase()

    onValue(usersInDB, snapshot => {
        let info = Object.values(snapshot.val())
        let currentUser
        let currentPassword

        // itterate through database to match user credentials
        for (let i = 0; i < info.length; i++) {
            currentUser = info[i].username
            currentPassword = info[i].password

            if (currentUser == usernameVal && currentPassword == passwordVal) {
                match = true
                sessionStorage.setItem("username", usernameEl.value.trim())
                window.location.href = "./homePage.html"
                return
            }
        }
        if (match == false) {
            alert("Incorrect username or password.")
        }
    })
})
// firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// link database
const appSettings = {
    databaseURL: "https://fir-test-a92b3-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings) // pass in app settings
const database = getDatabase(app) // pass in app

// set up reference to database
// ref takes in 2 parameters (database, referenceName)
const adminUserCred = ref(database, "adminUsers")

//--------------------------------------------------------
// code here 
const usernameField = document.getElementById('username-field')
const passwordField = document.getElementById('password-field') 
const adminLoginBtn = document.getElementById('admin-login-btn')
const loginForm = document.getElementById('login-form') // for login form

// preloader 
const preloader = document.getElementById('preloader')
window.addEventListener('load', function() {
    preloader.classList.add('loaded')

    preloader.addEventListener('animationend', function() {
        preloader.style.display = "none"
    })
})

let loggedIn = false;
// on admin login click
adminLoginBtn.addEventListener('click', () => {
    let match = false // flag for if user/pass match

    onValue(adminUserCred, function(snapshot) {
        // store data in array
        let userList = Object.values(snapshot.val())
        
        // store input values for ease of use
        let usernameVal = usernameField.value.trim().toLowerCase()
        let passwordVal = passwordField.value.trim().toLowerCase()

        // if blank no blank fields
        if (usernameVal != "" && passwordVal != "") {
            
            // match input with existing admin credentials
            for (let i = 0; i < userList.length; i++) { // if match found in database vs user input
                if (usernameVal == userList[i].username && passwordVal == userList[i].password) {
                    match = true;
                }
            }

            if (match == true) {
                loggedIn = true;
                sessionStorage.setItem("username", usernameField.value) // store name
                sessionStorage.setItem("admin_in", loggedIn) // store logged in state
                window.location.href = "./adminHome.html"
            }
            else if (match == false) { // if incorrect credentials 
                alert("Incorrect username or password.")
                
            }
        }

    })

})

const form = document.querySelector(".login-form")
form.addEventListener('submit', (event) => {
    event.preventDefault();
})
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
const adminPosts = ref(database, "adminPosts")
// end of firebase setup-------------------------------------------------------

/*********** Admin Login Logic **********/
let loggedIn = false
let accountName = "User"
// if does not exist yet (initial page visit)
if (!sessionStorage.getItem("admin_in")) { 
    sessionStorage.setItem("admin_in", "")
}
// check if logged in 
if (sessionStorage.getItem("admin_in")) {
    loggedIn = true
    // if name dne 
    if (sessionStorage.getItem("username") == null)
        sessionStorage.setItem("username", "Admin")
    else
        accountName = sessionStorage.getItem("username")
    // greet user
    console.log("Welcome, " + accountName)
}

// page variable setup
const homepage = "../index.html";
const nameBtn = document.getElementById('name-btn');
const homeBtn = document.getElementById('home-btn');
const aboutBtn = document.getElementById('about-btn');
const projectsBtn = document.getElementById('projects-btn');
const contactBtn = document.getElementById('contact-btn');
const loginBtn = document.getElementById('login-btn');

// contact var 
const contactForm = document.getElementById('contact-form');
const emailField = document.getElementById('email-field');
const msgField = document.getElementById('msgField');
const submitBtn = document.getElementById('submit-btn');

// preloader 
const preloader = document.getElementById('preloader');
window.addEventListener('load', function() {
    preloader.classList.add('loaded')

    preloader.addEventListener('animationend', function() {
        preloader.style.display = "none"
    })
})

// name click -> home
nameBtn.addEventListener('click', function() {
    window.location.href = homepage;
})
// home click -> home page
homeBtn.addEventListener('click', function() {
    window.location.href = homepage;
})
// about click -> about page
aboutBtn.addEventListener('click', function() {
    window.location.href = "./about.html";
})
// projects click -> projects page
projectsBtn.addEventListener('click', function() {
    window.location.href = "./projects.html";
})
// contact click -> contact page
contactBtn.addEventListener('click', function() {
    window.location.href = "./contact.html";
})

// admin login
loginBtn.addEventListener('click', () => {
    window.location.href = "./adminLogin/adminLogin.html"
 })

// prevent form on contact page from refreshing page
if (window.location.href.includes("/contact")) {
    const form = document.querySelector(".login-form")
    form.addEventListener('submit', (event) => {    
        event.preventDefault();
    })
}
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
const homepage = window.location.href;
const nameBtn = document.getElementById('name-btn');
const skillsBtn = document.getElementById('skills-btn');
const aboutBtn = document.getElementById('about-btn');
const projectsBtn = document.getElementById('projects-btn');
const contactBtn = document.getElementById('contact-btn');
const resumeBtn = document.getElementById('resume-btn');
const loginBtn = document.getElementById('login-btn');

// preloader 
const preloader = document.getElementById('preloader');
window.addEventListener('load', function() {
    preloader.classList.add('loaded')

    preloader.addEventListener('animationend', function() {
        preloader.style.display = "none"
    })
})
// skills click -> skills section
skillsBtn.addEventListener('click', function() {
    document.querySelector('.skills-section').scrollIntoView({behavior: 'smooth'})
})

// name click -> home section
nameBtn.addEventListener('click', function() {
    window.location.href = homepage;
})
// about click -> about section
aboutBtn.addEventListener('click', function() {
    //window.location.href = "./sitePages/about.html";
    document.querySelector('.about-section').scrollIntoView({behavior: 'smooth'})
    
})
// projects click -> projects section
projectsBtn.addEventListener('click', function() {
    document.querySelector('.projects-section').scrollIntoView({behavior: 'smooth'})
})
// contact click -> contact section
contactBtn.addEventListener('click', function() {
    document.querySelector('.contact-section').scrollIntoView({behavior: 'smooth'})
})
// resume click -> resume section
resumeBtn.addEventListener('click', function() {
    alert("Please try again later.")
})

// admin login
loginBtn.addEventListener('click', () => {
    window.location.href = "./sitePages/adminLogin/adminLogin.html"
 })


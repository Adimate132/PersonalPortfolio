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

const projectsSpanBtn = document.getElementById('current-projects');
const aboutSpanBtn = document.getElementById('about-section');
const contactSpanBtn = document.getElementById('leave-a-message');

// preloader 
const preloader = document.getElementById('preloader');
window.addEventListener('load', function() {
    preloader.classList.add('loaded')

    preloader.addEventListener('animationend', function() {
        preloader.style.display = "none"
    })
})
// skills click -> skills section
skillsBtn.addEventListener('click', function() { // FIXME: optimize recycled code into function
    let headerHeight = document.querySelector('.submenu-wrap').offsetHeight
    let skillsOffset = document.querySelector('.skills-section').offsetTop
    let skillsPosition = skillsOffset - headerHeight; 
    window.scrollTo({
        top: skillsPosition,
        behavior: 'smooth'
    })
})

// name click -> home section
nameBtn.addEventListener('click', function() {
    window.location.href = homepage;
})
// about click -> about section
aboutBtn.addEventListener('click', function() {
    //document.querySelector('.about-section').scrollIntoView({behavior: 'smooth'})  
    let headerHeight = document.querySelector('.submenu-wrap').offsetHeight
    let aboutOffset = document.querySelector('.about-section').offsetTop
    let aboutPosition = aboutOffset - headerHeight; 
    window.scrollTo({
        top: aboutPosition,
        behavior: 'smooth'
    })
})
aboutSpanBtn.addEventListener('click', function() { // second btn
    let headerHeight = document.querySelector('.submenu-wrap').offsetHeight
    let aboutOffset = document.querySelector('.about-section').offsetTop
    let aboutPosition = aboutOffset - headerHeight; 
    window.scrollTo({
        top: aboutPosition,
        behavior: 'smooth'
    })
})
// projects click -> projects section
projectsBtn.addEventListener('click', function() {

    let headerHeight = document.querySelector('.submenu-wrap').offsetHeight
    let projectsOffset = document.querySelector('.projects-section').offsetTop
    let projectsPosition = projectsOffset - headerHeight; 
    window.scrollTo({
        top: projectsPosition,
        behavior: 'smooth'
    })
})
projectsSpanBtn.addEventListener('click', function() { // second btn
    let headerHeight = document.querySelector('.submenu-wrap').offsetHeight
    let projectsOffset = document.querySelector('.projects-section').offsetTop
    let projectsPosition = projectsOffset - headerHeight; 
    window.scrollTo({
        top: projectsPosition,
        behavior: 'smooth'
    })
})
// contact click -> contact section
contactBtn.addEventListener('click', function() {
    let headerHeight = document.querySelector('.submenu-wrap').offsetHeight
    let contactOffset = document.querySelector('.contact-section').offsetTop
    let contactPosition = contactOffset - headerHeight - 15; 
    window.scrollTo({
        top: contactPosition,
        behavior: 'smooth'
    })
})
contactSpanBtn.addEventListener('click', function() { // second btn
    let headerHeight = document.querySelector('.submenu-wrap').offsetHeight
    let contactOffset = document.querySelector('.contact-section').offsetTop
    let contactPosition = contactOffset - headerHeight - 15; 
    window.scrollTo({
        top: contactPosition,
        behavior: 'smooth'
    })
})

const backToTop = document.createElement('button'); // back to top of page 
backToTop.textContent = 'Back to top'
document.body.appendChild(backToTop);

backToTop.addEventListener('click', function() { // if clicked on, scroll to top
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
})
window.addEventListener('load', function() {
    if (backToTop.classList.contains('back-to-top')) {
        backToTop.classList.remove('back-to-top')
    }
})
window.addEventListener('scroll', function() {
    if (window.scrollY == 0 && backToTop.classList.contains('back-to-top')) { // at top of page 
        backToTop.classList.remove('back-to-top')
        backToTop.classList.add('fall')
        backToTop.addEventListener('animationend', function() {
            backToTop.classList.remove('fall')
        })
    }
    else {
        backToTop.style.display = 'block'
        backToTop.classList.add('back-to-top')
    }
        
})

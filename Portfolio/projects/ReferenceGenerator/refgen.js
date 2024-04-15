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



// preloader 
const preloader = document.getElementById('preloader');
window.addEventListener('load', function() {
    preloader.classList.add('loaded')

    preloader.addEventListener('animationend', function() {
        preloader.style.display = "none"
    })
})


const startForm = document.getElementById('form-box');
const imageGrid = document.getElementById('generated-images')
const chooseImgText = document.getElementById('choose-image-text')
const contentContainer = document.getElementById('container')
const gridWrap = document.getElementById('grid-wrap')
const formWrap = document.getElementById('form-wrap')

const uploadPopup = document.getElementById('upload-drawing-popup')
const closePopupBtn = document.getElementById('close-btn')
const pieceForm = document.getElementById('submit-piece-form')

const timer = document.getElementById('timer')
const maxPhotos = 12

startForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const startFormData = new FormData(startForm);
    const input = startFormData.get('tags-input').toLowerCase()

    fetchPhotos(input);
    async function fetchPhotos(input) {
        try {
            const response = await fetch(`https://api.unsplash.com/photos/random/?count=${maxPhotos}&query=${input}&client_id=RdaSuzcBBK6eJUeM_4r1jUDCZtrhLdkGAB8vtLW8XhI`, {
                method: 'GET'
            })
            if (!response.ok) 
                throw new Error("Could not fetch resource")

            const data = await response.json() // get data

            resetGrid() // clear grid

            // display choose image text
            fadein(chooseImgText)

             // append images to grid
            data.forEach(item => {
                let newImg = document.createElement('img')
                newImg.src = `${item.urls.regular}`
                appendToGrid(newImg)
                fadein(newImg)
                newImg.classList.add('grid-image')
            })
            
        }
        catch (error) {
            console.log('Error: ' + error)
            if(error.message.includes("Rate Limit Exceeded"))
                alert("Rate limit for api exceeded. Please try again later.")
            else
                alert(error)
        }
    }

    document.getElementById('tags-input').value = ""
})

function appendToGrid(image) {
    imageGrid.appendChild(image)
}
function resetGrid() {
    imageGrid.innerHTML = ""
}


// if grid image is clicked
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('grid-image')) {

        const chosenImg = document.createElement('img')
        chosenImg.src = event.target.src // store copy of image clicked
        chosenImg.id = 'chosen-image'

        fadeout(imageGrid) // remove image grid
        fadeout(chooseImgText) // remove image text
        fadeout(formWrap) // remove formwrap 

        fadein(chosenImg) // fade in chosen image
        gridWrap.appendChild(chosenImg)

        startCountdown()

        this.removeEventListener
    }
})

function fadeout(element) {
    element.classList.add('fadeout-animation')
    element.addEventListener('animationend', function() { 
        element.classList.remove('fadeout-animation')
        element.style.display = 'none'
    })
}

function fadein(element) {
    element.style.display = 'block'
    element.classList.add('fadein-animation')
    element.addEventListener('animationend', function() {
        element.classList.remove('fadein-animation')
    })
}

function startCountdown() {
    fadein(timer);
    let minutes = 5
    let seconds = 0

    setTimeout(() => { // ofset 3000ms for timer to display first

        const skipTimerBtn = document.createElement('button')
        skipTimerBtn.id = 'skip-timer-btn'
        skipTimerBtn.textContent = 'End Timer'
        contentContainer.appendChild(skipTimerBtn)
        fadein(skipTimerBtn)

        skipTimerBtn.addEventListener('click', function() {
            minutes = 0
            seconds = 0
        })

        const tick = setInterval(() => {

            if (seconds >= 10) {
                timer.textContent = `Time Left: ${minutes}:${seconds}`
            }
            else if (seconds < 10) {
                timer.textContent = `Time Left: ${minutes}:0${seconds}`
            }

            seconds-- // decrement seconds 
            if (seconds <= 0) { 

                if (minutes <= 0 && seconds <= 0) { // on time up
                    timer.textContent = `Time's Up!`
                    clearInterval(tick) // stop countdown
                    fadeout(timer) // remove timer 

                    // change skip button to upload image
                    setTimeout(() => {
                        fadein(skipTimerBtn)
                        skipTimerBtn.id = "upload-drawing-btn"
                        skipTimerBtn.textContent = "Upload Drawing"

                        addDrawingPopup(skipTimerBtn)
                    }, 1500)

                }
                else {
                    minutes-- // decrement minutes 
                    seconds = 59
                }
            }

        }, 1000)
    
    }, 1000)

}

/*
const uploadPopup = document.getElementById('upload-drawing-popup')
const closePopupBtn = document.getElementById('closeBtn')
const pieceForm = document.getElementById('submit-piece-form')
*/

// on upload piece btn click 
function addDrawingPopup(uploadBtn) {

    // upload btn click
    uploadBtn.addEventListener('click', function() {
        uploadPopup.style.display = 'flex'

        // close popup 
        closePopupBtn.addEventListener('click', function() {
            fadeout(uploadPopup)
        })
    })
}
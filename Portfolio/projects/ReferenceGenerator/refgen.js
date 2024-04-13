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
const gridWrap = document.getElementById('grid-wrap')
const formWrap = document.getElementById('form-wrap')
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

        gridWrap.appendChild(chosenImg)
        fadein(chosenImg) // fade in chosen image

        setTimeout(refreshPage, 5000) // refresh page after 3 minutes

    }
})

function fadeout(element) {
    element.classList.add('fadeout-animation')
    element.addEventListener('animationend', function() { 
        element.style.display = 'none'
        element.classList.remove('fadeout-animation')
    })
}

function fadein(element) {
    element.style.display = 'block'
    element.classList.add('fadein-animation')
    element.addEventListener('animationend', function() {
        element.classList.remove('fadein-animation')
    })
}

function refreshPage() {
    window.location.reload();
}
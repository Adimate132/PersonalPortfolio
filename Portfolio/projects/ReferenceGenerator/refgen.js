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

startForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const startFormData = new FormData(startForm);
    const input = startFormData.get('form-box').toLowerCase()

    fetchPhotos();
    async function fetchPhotos() {
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos/?query=${input}&client_id=RdaSuzcBBK6eJUeM_4r1jUDCZtrhLdkGAB8vtLW8XhI`)
            if (!response.ok) 
                throw new Error("Could not fetch resource")
            
            const data = await response.json()
            data.results.forEach(item => {
                let newImg = document.createElement('img')
                newImg.src = `${item.urls.regular}`
                appendToGrid(newImg) // append to grid
            })
        }
        catch (error) {
            console.log('Error: ' + error)
        }
    }

})

function appendToGrid(image) {
    imageGrid.appendChild(image)
}

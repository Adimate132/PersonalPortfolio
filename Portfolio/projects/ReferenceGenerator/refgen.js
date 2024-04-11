// preloader 
const preloader = document.getElementById('preloader');
window.addEventListener('load', function() {
    preloader.classList.add('loaded')

    preloader.addEventListener('animationend', function() {
        preloader.style.display = "none"
    })
})


const startForm = document.getElementById('form-box');


startForm.addEventListener('click', function(e) {
    e.preventDefault();

    const startFormData = new FormData(startForm);


})
// preloader 
const preloader = document.getElementById('preloader');
window.addEventListener('load', function() {
    preloader.classList.add('loaded')

    preloader.addEventListener('animationend', function() {
        preloader.style.display = "none"
    })
})


const startForm = document.getElementById('form-box');


startForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const startFormData = new FormData(startForm);
    const input = startFormData.get('form-box').trim().toLowerCase()

    // api call test

    fetchData();
    async function fetchData() {
        try {
            const response = await  fetch(`https://pokeapi.co/api/v2/pokemon/${input}`, {method: 'GET'});
            if (!response.ok)
                throw new Error("Could not fetch resource")

                const data = await response.json();
                alert(`${data.name} is a pokemon :D`)
        }
        catch(error) {
            console.log(error)
            alert(`${input} is not a pokemon :(`)
        }
    }
})

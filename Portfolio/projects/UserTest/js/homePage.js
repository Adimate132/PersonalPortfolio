import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// link database
const appSettings = {
    databaseURL: "https://fir-test-a92b3-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

// end of firebase setup-------------------------------------------------------

// set username
const user = sessionStorage.getItem("username")

// vars
const homepageWrap = document.querySelector('.homepage-wrap')
const contentWrap = document.querySelector('.content-wrap')
const usersList = document.getElementById('users')
const sidenav = document.getElementById('nav-list');
const posts = document.getElementById('posts')
const welcomeMsg = document.getElementById('welcome-msg')
const userLoggedIn = document.createElement('span')
userLoggedIn.innerHTML = `${user}`
let popupExists = false

// append user logged in as first user on messages
welcomeMsg.appendChild(userLoggedIn)

// 'Create' setup 
const createBtn = document.getElementById('create-btn')

createBtn.addEventListener('click', function(event) {
    event.stopPropagation(); // prevent pop up check on first click

    if (popupExists == false){
        homepageWrap.classList.add('blur');
        const createPost = document.createElement('div')
        createPost.id = 'popup'
        createPost.classList.add('create-post')
        createPost.innerHTML = `
        <h1> Create Post </h1>
        <form id='create-post-form'>
            <div class='post-fields'>
                <input required type='text' placeholder='Subject'>
                <textarea required
                    type='text' 
                    placeholder='Enter Text' 
                    rows='10'
                ></textarea>
                <p> Add Image: </p>
                <input id='uploaded-img' type='file' accept="image/png, image/gif, image/jpeg">

                <button type='submit'>Post!</button>
            </div>
        </form>
        `
        document.body.appendChild(createPost);
        popupExists = true
    }
    
})

// close popup
document.addEventListener('click', function(event) {
    if (popupExists == true) {
        const createPost = document.querySelector('.create-post')
        // if clicked is not popup, close popup, remove blur 
        if (event.target !== createPost && !createPost.contains(event.target)) {
            if (createPost) {
                console.log('potato')
                
                popup.remove();
                popupExists = false
                homepageWrap.classList.remove('blur')
            }
        }
        
    }
    
})




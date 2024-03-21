// firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// link database
const appSettings = {
    databaseURL: "https://fir-test-a92b3-default-rtdb.firebaseio.com/"
}

// setup
// initialize app using app settings, store in app,
// then pass app settings into database
const app = initializeApp(appSettings) // pass in app settings
const database = getDatabase(app) // pass in app

// set up reference in database called text
const infoInDB = ref(database, "text")

// snapshot - render anything that is in db
// -------------------------------------------
onValue(infoInDB, function (snapshot) {
    let textArray = Object.values(snapshot.val())

    // clear what is there so not doubled on new item
    tableContent.innerHTML = ""

    for (let count = 0; count < textArray.length; count++) {
        
        // display current db data
        let currentText = textArray[count]
        tableContent.innerHTML += `<p id='tableData'>${currentText}</p>`
    

    }
    // clear input field
    input.value = ""
    //nameInput.value = ""
    console.log(textArray)
})


// variables
const submitBtn = document.getElementById('submit-btn')
let input = document.getElementById('input-field')
//let nameInput = document.getElementById('inputName')
let tableContent = document.getElementById('tableContent')

// on submit click
submitBtn.addEventListener('click', function() {

    //let nameValue = nameInput.value // store user name
    let inputValue = input.value // store user input


    // do nothing 
    /*
    if (!nameValue || !inputValue) {
        alert("Please fill in both.")
        return
    }
    */

    if (!inputValue) {
        alert('Please enter text.')
        return
    }
    
    // push data to database
    push(infoInDB, inputValue)
    //push(infoInDB, nameValue)
    
    let tableData = document.createElement('p')
    tableData.id = 'tableData'

    tableData.innerHTML = `<p>${inputValue}</p>`
    //`<td>${inputValue} ~ ${nameValue}</td>`
   


})

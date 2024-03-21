let calendar = document.getElementById('calendarTable')
let january = []
for (let count = 1; count <= 31; count++) {
    january[count] = count;
}

let notes = []
for (let count = 0; count < january.length; count++) {
    notes[count] = count;
}

let userInput = document.getElementById('userInput')
let submitBtn = document.getElementById('submitBtn')

let newRow
let newItem
let store 
let runs = 0

// sets days on calendar
function addDays() {
    for (let count = 1; count <= 31; count++) {
        if (count % 5 == 0 || count == 1) {
            newRow = document.createElement('tr')
            calendar.appendChild(newRow)
            newItem = document.createElement('td')
            newRow.appendChild(newItem)
            newItem.textContent = january[count]
        }
        else {
        newItem = document.createElement('td')
        newRow.appendChild(newItem)
        newItem.textContent = january[count]
        }

        
    }
}
addDays(); // call function

// stores user input
/*
submitBtn.addEventListener('click', function() {

    for (runs; runs <= 31;) {
        january[count] = ""
    }


    store = userInput.value
    
    newItem = document.createElement('td')
    if (count == 0 || count % 5 == 0) {
        newRow = document.createElement('tr')
        calendar.appendChild(newRow)
        newRow.appendChild(newItem)
    }
    
    newItem.innerHTML = `
    <td>${store}</td>`

    newRow.appendChild(newItem)
    count++

    userInput.value = ""
})
*/
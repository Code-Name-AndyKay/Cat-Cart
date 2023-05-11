// Database API

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://playground-ee40d-default-rtdb.europe-west1.firebasedatabase.app/"
}
// variables containing database API

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const DocObj = {
  inputFieldEl: document.getElementById("input-field"),
  addButtonEl: document.getElementById("add-button"),
  ulEl: document.getElementById("ul-El")
}

function renderInput(item){

  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")
  newEl.textContent = itemValue

  // function for deleting data from the database

  newEl.addEventListener("dblclick", function(){
    let locationOfIteminDB = ref(database, `shoppingList/${itemID}`)
    remove(locationOfIteminDB)
  })
  
  DocObj.ulEl.append(newEl)
}


onValue(shoppingListInDB, function(snapshot){

  if (snapshot.exists()){
    
  let itemsArray = Object.entries(snapshot.val())
  
  console.log(Object.entries(snapshot.val()))

  clearList()

  for(let i = 0; i < itemsArray.length; i++ ){
    
    let currentItem = itemsArray[i]
    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]

    renderInput(currentItem)
  }
  }

  else clearList()

})

//function for clearing the input element

function clearInput (){
  DocObj.inputFieldEl.value = ""
}

// function for clearing the list of items

function clearList(){
  DocObj.ulEl.innerHTML = ""
}

// function for adding data from the input element to the database

DocObj.addButtonEl.addEventListener("click", function() {
  let item = DocObj.inputFieldEl.value
    
    if (item.length === 0){
      return
    }
    else 
      push(shoppingListInDB, item)
      clearInput()
})





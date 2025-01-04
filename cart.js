import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push ,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://real-time-database-59f7c-default-rtdb.firebaseio.com/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl=document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue);
    
    clearInputFieldEl()
    
});

onValue(shoppingListInDB,function(snapshot){

    if(snapshot.exists()){
        
    let itemsArray=Object.entries(snapshot.val())

    clearShoppingLListEl();

    for(let i=0;i<itemsArray.length;i++)
    {
        let currentItem=itemsArray[i]
        let currentItemId=currentItem[0]
        let currentItemValue=currentItem[1]
        appendItemToShoppingList(currentItem)
    }
    }
    else{
        shoppingListEl.innerHTML = "No Items here....."
    }
})
function clearShoppingLListEl(){
    shoppingListEl.innerHTML=""
}

function clearInputFieldEl(){
    inputFieldEl.value = ""
}
function appendItemToShoppingList(item){
    let itemId = item[0]
    let itemValue=item[1]
    let newEl=document.createElement("li")

    newEl.addEventListener("click",function(){
        let exactLocationOfItemId = ref(database , `shoppingList/${itemId}`)

        remove(exactLocationOfItemId)
    })

    newEl.textContent = itemValue
    shoppingListEl.append(newEl)
}
import * as storage from "./storage.js"
let items = ["???!!!"];

const showItems = () => {
  let list = document.querySelector("ol");

  if (items.length == 0) {
    list.innerHTML = "Nothing Yet"
    return
  }

  list.innerHTML = items.map((item) => { return `<li>${item}</li>` }).join("");
};

const addItem = str => {

  items.push(str);

  storage.writeToLocalStorage("items", items);
};

const onload = () => {
  items = storage.readFromLocalStorage("items") || [];

  showItems();

  document.querySelector("#btn-add").addEventListener("click", () => {
    let inputElement = document.querySelector("#thing-text");
    if (inputElement.value)
      addItem(inputElement.value.trim());
    
    inputElement.value = "";

    storage.writeToLocalStorage("items", items);

    showItems();
  });

  document.querySelector("#btn-clear").addEventListener("click", clearList);
};

// Got it working? 
// - Add a "Clear List" button that empties the items array
const clearList = () => {
  items = [];

  storage.writeToLocalStorage("items", items);
  
  showItems();
};

onload();
'use strict';

import { toDo } from './toDo.js'

let toDoList = new Array()
toDoList.push(new toDo())

//on load grab the array and insert it into the page
// window.addEventListener("load", () => {
//     showToDoList();
// });

window.addEventListener("submit", () => {
    console.log("submitted");
    toDoList.push(new toDo(document.getElementById("name"), document.getElementById("completeDate")))
    showToDoList();
});

function showToDoList() {
    const toDoListElement = document.getElementById("toDo");
    toDoListElement.innerHTML = "";
    renderToDoList(toDoList, toDoListElement);
}

function renderToDoList(toDo, parent) {
    toDo.forEach(toDo => {
        parent.appendChild(toDo.renderToDo());
    });
}
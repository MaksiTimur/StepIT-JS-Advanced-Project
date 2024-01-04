import TaskList from "../../modules/tasklist.js";

const link = document.location.href;
const url = new URL(link);
const queryParams = url.searchParams;
const taskID = queryParams.get('edit');

TaskList.requestTask(taskID);
const task = JSON.parse(localStorage.getItem('currentTask'));

const name = document.querySelector('.edit-name');
const description = document.querySelector('.edit-description');

name.value = task.name;
description.value = task.description;

const submitButton = document.querySelector('.edit-confirm');
const backButton = document.querySelector('.back-button');

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    task.name = name.value;
    task.description = description.value;

    TaskList.updateTask(task);
    window.location.href = "/index.html";
});

backButton.addEventListener('click', () => {
    window.location.href = "/index.html";
});
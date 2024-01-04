import TaskList from "../../modules/tasklist.js";

const link = document.location.href;
const url = new URL(link);
const queryParams = url.searchParams;
const taskID = queryParams.get('details');

TaskList.requestTask(taskID);
const task = JSON.parse(localStorage.getItem('currentTask'));

const wrapper = document.querySelector('.main-wrapper');

const backButton = document.querySelector('.details-back');
backButton.addEventListener('click', () => {
    window.location.href = "/index.html";
});

const detailsHTML = `
<div class="details-id details">Task ID: <span>${taskID}</span></div>
<div class="details-name details">Name: <span>${task.name}</span></div>
<div class="details-description details">Description: <span>${task.description}</span></div>
<div class="details-date details">Creation date: <span>${task.date}</span></div>
<div class="details-status details">Status: <span>${task.status}</span></div>
`;

wrapper.insertAdjacentHTML('afterbegin', detailsHTML)
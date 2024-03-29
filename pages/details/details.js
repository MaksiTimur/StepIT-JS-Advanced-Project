import TaskList from "../../modules/tasklist.js";

const link = document.location.href;
const url = new URL(link);
const queryParams = url.searchParams;
const taskID = queryParams.get('details');

const wrapper = document.querySelector('.main-wrapper');

const task = TaskList.requestTask(taskID);

if (task === undefined) {
    const notFoundElement = document.createElement('div');
    notFoundElement.textContent = '404 NOT FOUND';
    notFoundElement.classList.add('not-found');

    wrapper.insertAdjacentElement('afterbegin', notFoundElement);
} else {
    viewDetails();
}

const backButton = document.querySelector('.back-button');
backButton.addEventListener('click', () => {
    window.location.href = "/index.html";
});

function viewDetails() {
    const detailsHTML = `
    <div class="details-id details">Task ID: <span>${task.id}</span></div>
    <div class="details-name details">Name: <span>${task.name}</span></div>
    <div class="details-description details">Description: <span>${task.description}</span></div>
    <div class="details-date details">Creation date: <span>${task.date}</span></div>
    <div class="details-status details">Status: <span>${task.status}</span></div>
    `;

    wrapper.insertAdjacentHTML('afterbegin', detailsHTML)
}
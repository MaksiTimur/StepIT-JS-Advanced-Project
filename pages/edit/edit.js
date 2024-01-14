import TaskList from "../../modules/tasklist.js";

const link = document.location.href;
const url = new URL(link);
const queryParams = url.searchParams;
const taskID = queryParams.get('edit');

const submitButton = document.querySelector('.edit-confirm');
const backButton = document.querySelector('.back-button');

const task = TaskList.requestTask(taskID);;

if (task === undefined) {
    const wrapperForm = document.querySelector('.main-wrapper form');
    wrapperForm.innerHTML = '';

    const notFoundElement = document.createElement('div');
    notFoundElement.textContent = '404 NOT FOUND';
    notFoundElement.classList.add('not-found');

    wrapperForm.append(notFoundElement);
} else {
    edit();
}

backButton.addEventListener('click', () => {
    window.location.href = "/index.html";
});

function edit() {
    const name = document.querySelector('.edit-name');
    const description = document.querySelector('.edit-description');
    const status = document.querySelector('.edit-status');

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
    
        task.name = name.value;
        task.description = description.value;
        task.status = status.checked;
    
        TaskList.updateTask(task);
        window.location.href = "/index.html";
    });

    name.value = task.name;
    description.value = task.description;
    status.checked = task.status;
}
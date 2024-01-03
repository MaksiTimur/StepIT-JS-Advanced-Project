import Task from './modules/task.js';
import TaskList from './modules/tasklist.js';

const createButton = document.querySelector('#create-button');

const newTaskConfirm = document.querySelector('#new-task .dialog-confirm');
const newTaskCancel = document.querySelector('#new-task .dialog-cancel');
const newTaskDialog = document.querySelector('#new-task');
const newTaskName = document.querySelector('#dialog-name')
const newTaskDescription = document.querySelector('#dialog-description');

const tasks = document.querySelector('.tasks');
const taskList = new TaskList();

createButton.addEventListener('click', () => {
    newTaskName.value = '';
    newTaskDescription.value = '';
    newTaskDialog.showModal();
});

newTaskCancel.addEventListener('click', () => {
    closeDialog(newTaskDialog);
});

newTaskConfirm.addEventListener('click', createTask);
tasks.addEventListener('click', taskAction);

function closeDialog(dialog) {
    dialog.close();
}

function createTask() {
    const task = new Task(newTaskName.value, newTaskDescription.value);
    // taskList.add(task);

    const taskHTML = `
    <ul id="${task.id}" class="task">
    <li class="checkbox"><input class="task-checkbox" type="checkbox" name="task-checkbox">
    <li class="name">
        <a href="/pages/details/details.html?edit=${task.id}">${task.name}</a>
    </li>
    <li class="description">${task.description}</li>
    <li class="date">${task.date}</li>
    <ul class="tools">
        <li class="tool">
            <svg class="edit" width="20" height="20" fill="none" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path class="edit"
                    d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z"
                    fill="currentColor" />
            </svg>
        </li>
        <li class="tool">
            <svg class="delete" width="20" height="20" fill="none" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path class="delete"
                    d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z"
                    fill="currentColor" />
            </svg>
        </li>
    </ul>
    `;

    tasks.insertAdjacentHTML('beforeend', taskHTML);
    closeDialog(newTaskDialog);
}

function taskAction(e) {
    const target = e.target;
    const taskID = target.closest('.task').id;

    switch (target.classList[0]) {
        case 'checkbox':
            // Set task status
            break;
        case 'name':
            // Open details page
            break;
        case 'edit':
            // Open details page
            break;
        case 'delete':
            // Delete task from TaskList
            break;
    }
}
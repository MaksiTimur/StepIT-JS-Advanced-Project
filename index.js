import Task from './modules/task.js';
import TaskList from './modules/tasklist.js';

const createButton = document.querySelector('#create-button');

const newTaskConfirm = document.querySelector('#new-task .dialog-confirm');
const newTaskCancel = document.querySelector('#new-task .dialog-cancel');
const newTaskDialog = document.querySelector('#new-task');
const newTaskName = document.querySelector('#dialog-name')
const newTaskDescription = document.querySelector('#dialog-description');

const tasks = document.querySelector('.tasks');
document.onload = TaskList.load();

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
    TaskList.add(task);

    closeDialog(newTaskDialog);
}

function taskAction(e) {
    const target = e.target;
    const taskID = target.closest('.task').id;

    switch (target.classList[0]) {
        case 'checkbox':
            // Set task status
            break;
        case 'edit':
            // Open details page
            break;
        case 'delete':
            TaskList.remove(taskID)
            break;
    }
}
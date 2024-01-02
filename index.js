import Task from './modules/task.js';
import TaskList from './modules/tasklist.js';

const createButton = document.querySelector('#create-button');
const newTaskConfirm = document.querySelector('#new-task .dialog-confirm');
const newTaskCancel = document.querySelector('#new-task .dialog-cancel');
const newTaskDialog = document.querySelector('#new-task');
const newTaskName = document.querySelector('#dialog-name')
const newTaskDescription = document.querySelector('#dialog-description');

const taskList = new TaskList();

createButton.addEventListener('click', () => {
    newTaskName.value = '';
    newTaskDescription.value = '';
    newTaskDialog.showModal();
});

newTaskConfirm.addEventListener('click', () => {
    const task = new Task(newTaskName.value, newTaskDescription.value);
});

newTaskCancel.addEventListener('click', () => {
    newTaskDialog.close();
});
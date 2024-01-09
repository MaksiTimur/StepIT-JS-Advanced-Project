import Task from './modules/task.js';
import TaskList from './modules/tasklist.js';

const createButton = document.querySelector('#create-button');

const newTaskConfirm = document.querySelector('#new-task .dialog-confirm');
const newTaskCancel = document.querySelector('#new-task .dialog-cancel');
const newTaskDialog = document.querySelector('#new-task');
const newTaskName = document.querySelector('#dialog-name')
const newTaskDescription = document.querySelector('#dialog-description');

const tasks = document.querySelector('.tasks');
window.addEventListener('load', () => {
    TaskList.load();
    TaskList.update();
});

createButton.addEventListener('click', (e) => {
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

function createTask(e) {
    e.preventDefault();

    const task = new Task(newTaskName.value, newTaskDescription.value);
    TaskList.add(task);

    closeDialog(newTaskDialog);
}

function taskAction(e) {
    const target = e.target;

    if (target.closest('.task') === null) return;
    const taskID = target.closest('.task').id;

    switch (target.classList[0]) {
        case 'task-checkbox':
            const task = TaskList.requestTask(taskID);;

            task.status = target.checked;
            TaskList.updateTask(task);
            break;
        case 'name':
            window.location.href = `/pages/details/details.html?details=${taskID}`;
            break;
        case 'edit':
            window.location.href = `/pages/edit/edit.html?edit=${taskID}`;
            break;
        case 'editpath':
            window.location.href = `/pages/edit/edit.html?edit=${taskID}`;
            break;
        case 'delete':
            TaskList.remove(taskID)
            break;
        case 'deletepath':
            TaskList.remove(taskID)
            break;
    }
}
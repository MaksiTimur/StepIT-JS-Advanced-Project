export default class TaskList {
    static #tasks = [];
    static #options = {
        filter: 'all',
        sort: 'alphabet'
    };

    constructor() {
        if (new.target) throw new Error("Can't create instance of TaskList");
    }

    static save() {
        localStorage.setItem('tasks', JSON.stringify(this.#tasks));
        localStorage.setItem('options', JSON.stringify(this.#options));
    }

    static load() {
        const JSONTasks = localStorage.getItem('tasks');
        const options = localStorage.getItem('options');

        if (JSONTasks === null) return;
        this.#tasks = JSON.parse(JSONTasks);

        if (options === null) return;
        this.#options = JSON.parse(options);
    }

    static update() {
        // Set tasks
        if (this.#tasks.length === 0) return;

        const tasksElement = document.querySelector('.tasks');
        tasksElement.innerHTML = '';

        let selectedTasks = this.#filter(this.#tasks);
        selectedTasks = this.#sort(selectedTasks);

        selectedTasks.forEach(task => {
            const taskHTML = `
            <ul id="${task.id}" class="task">
            <li class="checkbox"><input class="task-checkbox" type="checkbox" name="task-checkbox">
            <li class="name">${task.name}</li>
            <ul class="tools">
                <li class="tool">
                    <svg class="edit" width="20" height="20" fill="none" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path class="editpath"
                            d="M13.94 5 19 10.06 9.062 20a2.25 2.25 0 0 1-.999.58l-5.116 1.395a.75.75 0 0 1-.92-.921l1.395-5.116a2.25 2.25 0 0 1 .58-.999L13.938 5Zm7.09-2.03a3.578 3.578 0 0 1 0 5.06l-.97.97L15 3.94l.97-.97a3.578 3.578 0 0 1 5.06 0Z"
                            fill="currentColor" />
                    </svg>
                </li>
                <li class="tool">
                    <svg class="delete" width="20" height="20" fill="none" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path class="deletepath"
                            d="M21.5 6a1 1 0 0 1-.883.993L20.5 7h-.845l-1.231 12.52A2.75 2.75 0 0 1 15.687 22H8.313a2.75 2.75 0 0 1-2.737-2.48L4.345 7H3.5a1 1 0 0 1 0-2h5a3.5 3.5 0 1 1 7 0h5a1 1 0 0 1 1 1Zm-7.25 3.25a.75.75 0 0 0-.743.648L13.5 10v7l.007.102a.75.75 0 0 0 1.486 0L15 17v-7l-.007-.102a.75.75 0 0 0-.743-.648Zm-4.5 0a.75.75 0 0 0-.743.648L9 10v7l.007.102a.75.75 0 0 0 1.486 0L10.5 17v-7l-.007-.102a.75.75 0 0 0-.743-.648ZM12 3.5A1.5 1.5 0 0 0 10.5 5h3A1.5 1.5 0 0 0 12 3.5Z"
                            fill="currentColor" />
                    </svg>
                </li>
            </ul>
            `;

            tasksElement.insertAdjacentHTML('beforeend', taskHTML);

            // Set checkbox status
            const taskCheckbox = document.querySelector(`#${task.id} .task-checkbox`);
            taskCheckbox.checked = task.status;

            // Set options
            const filter = document.querySelector('#filter');
            const sort = document.querySelector('#sort');

            filter.value = this.#options.filter;
            sort.value = this.#options.sort;
        });
    }

    static add(task) {
        this.#tasks.push(task);
        this.save();
        this.update();
    }

    static remove(taskID) {
        for (let i = 0; i < this.#tasks.length; i++) {
            const task = this.#tasks[i];

            if (task.id !== taskID) continue;

            this.#tasks.splice(i, 1);
            break;
        }

        this.save();
        this.update();
    }

    static requestTask(taskID) {
        this.load();

        for (const task of this.#tasks) {
            if (task.id !== taskID) continue;
            console.log(task);
            return task;
        }
    }

    static updateTask(changedTask) {
        this.load();

        for (let i = 0; i < this.#tasks.length; i++) {
            const task = this.#tasks[i];

            if (task.id !== changedTask.id) continue;

            task.name = changedTask.name;
            task.description = changedTask.description;
            task.status = changedTask.status;
        }

        this.save();
    }

    static updateOptions(changedOptions) {
        this.load();

        this.#options.filter = changedOptions.filter;
        this.#options.sort = changedOptions.sort;

        this.save();
    }

    static #filter(tasks) {
        let filteredTasks = tasks;

        switch (this.#options.filter) {
            case 'done':
                filteredTasks = filteredTasks.filter((task) => {
                    return task.status;
                });
                break;

            case 'undone':
                filteredTasks = filteredTasks.filter((task) => {
                    return !task.status;
                });
                break;
        }

        return filteredTasks;
    }

    static #sort(tasks) {
        let sortedTasks = tasks;

        switch (this.#options.sort) {
            case 'alphabet':
                return sortedTasks.sort(function (a, b) {
                    const name1 = a.name;
                    const name2 = b.name;

                    const name1InLowerCase = name1.toLowerCase();
                    const name2InLowerCase = name2.toLowerCase();

                    if (name1InLowerCase > name2InLowerCase) return 1;
                    if (name1InLowerCase < name2InLowerCase) return -1;

                    if (name1 > name2) return 1;
                    if (name1 < name2) return -1;

                    return 0;
                });

            case 'date':
                return sortedTasks.sort(function (a, b) {
                    const dateA = dateFromString(a.date);
                    const dateB = dateFromString(b.date);

                    function dateFromString(str) {
                        let splittedStr = str.split(' ');

                        let date = splittedStr[0];
                        let time = splittedStr[1];

                        let splittedDate = date.split('.');
                        let splittedTime = time.split(':');

                        let day = splittedDate[0];
                        let month = splittedDate[1];
                        let year = splittedDate[2];

                        let hours = splittedTime[0];
                        let minutes = splittedTime[1];
                        let seconds = splittedTime[2];

                        return new Date(year, month - 1, day, hours, minutes, seconds);
                    }

                    return dateB.getTime() - dateA.getTime();
                });
        }

        return sortedTasks;
    }
}
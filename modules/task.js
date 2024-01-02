export default class Task {
    #status = false;
    #id;
    #date;
    #name;
    #description;

    constructor(name, description) {
        this.#id = Math.random().toString(16).slice(2);
        this.#date = Task.#getDate();

        this.#name = name;
        this.#description = description;
    }

    static #getDate() {
        const date = new Date().toLocaleString();
        const splittedDate = date.split(', ');

        return `${splittedDate[0]} ${splittedDate[1]}`;
    }
}
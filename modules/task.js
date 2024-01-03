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

    get status() {
        return this.#status;
    }

    get id() {
        return this.#id;
    }

    get date() {
        return this.#date;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    set status(newStatus) {
        this.#status = newStatus;
    }

    set name(newName) {
        // RegExp check

        this.#name = newName;
    }

    set description(newDesc) {
        // RegExp check

        this.#description = newDesc;
    }

    toJSON() {
        return {
            status: this.#status,
            id: this.#id,
            date: this.#date,
            name: this.#name,
            description: this.#description
        }
    }
}
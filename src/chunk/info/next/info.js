export default class Info {
    /**
     * @param {HTMLElement} prev
     * @param {HTMLElement} current
     */
    constructor({prev, current}) {
        this.prev = prev;
        this.current = current;
    }

    /**
     * @return {number}
     */
    getSiblingDistance() {
        throw new Error("Not implemented");
    }

    /**
     * @return {HTMLElement}
     */
    getCurrent() {
        return this.current;
    }
}

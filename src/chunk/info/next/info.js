export default class Info {
    /**
     * @param {HTMLElement} prev
     * @param {HTMLElement} current
     * @param {boolean} reverse
     */
    constructor({prev, current, reverse}) {
        this.prev = prev;
        this.current = current;
        this.reverse = reverse;
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

    /**
     * @return {boolean}
     */
    isReverse() {
        return this.reverse === true;
    }
}

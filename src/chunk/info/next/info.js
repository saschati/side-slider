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
     * Get the distance between the current element and the element that will be replaced by the current element
     *
     * @return {number}
     */
    getSiblingDistance() {
        throw new Error("Not implemented");
    }

    /**
     * Get the current neighbor element
     *
     * @return {HTMLElement}
     */
    getCurrent() {
        return this.current;
    }

    /**
     * Is this operation hide/unhidden
     *
     * @return {boolean}
     */
    isReverse() {
        return this.reverse === true;
    }
}

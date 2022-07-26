export default class Info {
    constructor({ prev, current, reverse }) {
        this.prev = prev;
        this.current = current;
        this.reverse = reverse;
    }
    /**
     * Get the current neighbor element.
     */
    getCurrent() {
        return this.current;
    }
    /**
     * Get the current neighbor element.
     */
    getPrev() {
        return this.current;
    }
    /**
     * Is this operation hide/unhidden.
     */
    isReverse() {
        return this.reverse === true;
    }
}

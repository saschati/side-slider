export default class Info {
    constructor({ current, shift, windowWidth, reverse, }) {
        this.current = current;
        this.shift = shift;
        this.windowWidth = windowWidth;
        this.reverse = reverse;
    }
    /**
     * Get the current parent element.
     */
    getCurrent() {
        return this.current;
    }
    /**
     * Get the neighboring element that will shift to the main one.
     */
    getShift() {
        return this.shift;
    }
    /**
     * Is this operation hide/unhidden.
     */
    isReverse() {
        return this.reverse === true;
    }
}

export default class Info {
    /**
     * @param {HTMLElement} current
     * @param {HTMLElement} shift
     * @param {number} distance
     * @param {number} windowWidth
     * @param {boolean} reverse
     */
    constructor({current, shift, distance, windowWidth, reverse}) {
        this.current = current;
        this.shift = shift;
        this.distance = distance;
        this.windowWidth = windowWidth;
        this.reverse = reverse;
    }

    /**
     * Get the full distance from the first element to the last
     *
     * @return {number}
     */
    getDistance() {
        throw new Error("Not implemented");
    }

    /**
     * Get the distance from the first element to the beginning of the horizon
     *
     * @return {number}
     */
    getHorizon() {
        throw new Error("Not implemented");
    }

    /**
     * Get the distance between the horizon and the hidden part to the main element
     *
     * @return {number}
     */
    getHorizonHideDistance() {
        throw new Error("Not implemented");
    }

    /**
     * Get the final position to manifest in place of the main element
     *
     * @return {number}
     */
    getReverseFinishedPosition() {
        throw new Error("Not implemented");
    }

    /**
     * Get the current parent element
     *
     * @return {HTMLElement}
     */
    getCurrent() {
        return this.current;
    }

    /**
     * Get the neighboring element that will shift to the main one
     *
     * @return {HTMLElement}
     */
    getShift() {
        return this.shift;
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

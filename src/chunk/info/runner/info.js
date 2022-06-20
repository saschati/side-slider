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
     * @return {number}
     */
    getDistance() {
        throw new Error("Not implemented");
    }

    /**
     * @return {number}
     */
    getHorizon() {
        throw new Error("Not implemented");
    }

    /**
     * @return {number}
     */
    getHorizonHideDistance() {
        throw new Error("Not implemented");
    }

    /**
     * @return {number}
     */
    getReverseFinishedPosition() {
        throw new Error("Not implemented");
    }

    /**
     * @return {HTMLElement}
     */
    getCurrent() {
        return this.current;
    }

    /**
     * @return {HTMLElement}
     */
    getShift() {
        return this.shift;
    }

    /**
     * @return {boolean}
     */
    isReverse() {
        return this.reverse === true;
    }
}

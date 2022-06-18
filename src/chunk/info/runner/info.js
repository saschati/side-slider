export default class Info {
    /**
     * @param {HTMLElement} current
     * @param {number} distance
     */
    constructor({current, distance}) {
        this.current = current;
        this.distance = distance;
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
     * @return {HTMLElement}
     */
    getCurrent() {
        return this.current;
    }
}

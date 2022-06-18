import NextInfo from "../info/next/info"
import RunnerInfo from "../info/runner/info"

export default class Side {
    /**
     * @param {HTMLElement} wrapper
     */
    constructor({wrapper}) {
        this.wrapper = wrapper;
    }

    /**
     * @param {HTMLElement} current
     * @param {number} distance
     *
     * @return {RunnerInfo}
     */
    getRunnerInfo({current, distance}) {
        throw new Error('Not implemented');
    }

    /**
     * @param {HTMLElement} prev
     * @param {HTMLElement} current
     *
     * @return {NextInfo}
     */
    getNextInfo({prev, current}) {
        throw new Error('Not implemented');
    }

    /**
     * @return {number}
     */
    getDistance() {
        throw new Error('Not implemented');
    }

    /**
     * @return {HTMLElement}
     */
    getFirstCurrent() {
        throw new Error('Not implemented');
    }

    /**
     * @return {HTMLElement}
     */
    getNextSibling(item) {
        throw new Error('Not implemented');
    }

    /**
     * @param {HTMLElement} item
     *
     * @return {void}
     */
    append(item) {
        throw new Error('Not implemented');
    }

    /**
     * @return {HTMLElement[]}
     */
    getItems() {
        throw new Error('Not implemented');
    }
}
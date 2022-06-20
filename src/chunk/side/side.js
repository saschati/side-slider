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
     * @param {boolean} reverse
     *
     * @return {void}
     */
    setReverse(reverse) {
        this.reverse = reverse;
    }

    /**
     * @param {HTMLElement} current
     * @param {HTMLElement} shift
     * @param {number} windowWidth
     *
     * @return {RunnerInfo}
     */
    getRunnerInfo({current, shift, windowWidth}) {
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
     * @return {HTMLElement}
     */
    getShift() {
        throw new Error('Not implemented');
    }

    /**
     * @return {HTMLElement}
     */
    getFirstCurrent() {
        throw new Error('Not implemented');
    }

    /**
     * @param {HTMLElement} item
     *
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
    insert(item) {
        throw new Error('Not implemented');
    }

    /**
     * @return {HTMLElement[]}
     */
    getItems() {
        throw new Error('Not implemented');
    }
}
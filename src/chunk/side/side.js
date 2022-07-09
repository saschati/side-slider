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
     * Set direction to hide or show
     *
     * @param {boolean} reverse
     *
     * @return {void}
     */
    setReverse(reverse) {
        this.reverse = reverse;
    }

    /**
     * Get information on the main element
     *
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
     * Get information about neighboring elements from the parent
     *
     * @param {HTMLElement} prev
     * @param {HTMLElement} current
     *
     * @return {NextInfo}
     */
    getNextInfo({prev, current}) {
        throw new Error('Not implemented');
    }

    /**
     * Get the item to be moved
     *
     * @return {HTMLElement}
     */
    getShift() {
        throw new Error('Not implemented');
    }

    /**
     * The element from which to start the slider
     *
     * @return {HTMLElement}
     */
    getFirstCurrent() {
        throw new Error('Not implemented');
    }

    /**
     * Get the next element in the list that will be the main one after switching the slide
     *
     * @param {HTMLElement} item
     *
     * @return {HTMLElement}
     */
    getNextSibling(item) {
        throw new Error('Not implemented');
    }

    /**
     * Add a slide to the end/beginning of the collection
     *
     * @param {HTMLElement} item
     *
     * @return {void}
     */
    insert(item) {
        throw new Error('Not implemented');
    }

    /**
     * Get a list of items sorted by playback order
     *
     * @return {HTMLElement[]}
     */
    getItems() {
        throw new Error('Not implemented');
    }
}

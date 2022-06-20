import Side from "./side";

import NextInfo from "../info/next/left-info"
import RunnerInfo from "../info/runner/left-info"

export default class Left extends Side {
    /**
     * @param {HTMLElement} wrapper
     */
    constructor({wrapper}) {
        super({wrapper});
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
        return new RunnerInfo({current, shift, windowWidth, reverse: this.reverse});
    }

    /**
     * @param {HTMLElement} prev
     * @param {HTMLElement} current
     *
     * @return {NextInfo}
     */
    getNextInfo({prev, current}) {
        return new NextInfo({prev, current, reverse: this.reverse});
    }

    /**
     * @return {HTMLElement}
     */
    getShift() {
        if (this.reverse === true) {
            return this.wrapper.lastElementChild;
        }

        return this.wrapper.firstElementChild;
    }

    /**
     * @return {HTMLElement}
     */
    getFirstCurrent() {
        if (this.reverse === true) {
            return this.wrapper.firstElementChild;
        }

        return this.wrapper.lastElementChild;
    }

    /**
     * @param {HTMLElement} item
     *
     * @return {HTMLElement}
     */
    getNextSibling(item) {
        if (this.reverse === true) {
            return item.nextElementSibling;
        }

        return item.previousElementSibling;
    }

    /**
     * @param {HTMLElement} item
     *
     * @return {void}
     */
    insert(item) {
        if (this.reverse === true) {
            this.wrapper.append(item);

            return;
        }

        this.wrapper.prepend(item);
    }

    /**
     * @return {HTMLElement[]}
     */
    getItems() {
        if (this.reverse === true) {
            return Array.from(this.wrapper.children);
        }

        return Array.from(this.wrapper.children).reverse();
    }
}
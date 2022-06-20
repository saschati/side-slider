import Side from "./side";

import NextInfo from "../info/next/right-info"
import RunnerInfo from "../info/runner/right-info"

export default class Right extends Side {
    /**
     * @param {HTMLElement} wrapper
     */
    constructor({wrapper}) {
        super({wrapper});
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
            return this.wrapper.firstElementChild;
        }

        return this.wrapper.lastElementChild;
    }

    /**
     * @return {HTMLElement}
     */
    getFirstCurrent() {
        if (this.reverse === true) {
            return this.wrapper.lastElementChild;
        }

        return this.wrapper.firstElementChild;
    }

    /**
     * @param {HTMLElement} item
     *
     * @return {HTMLElement}
     */
    getNextSibling(item) {
        if (this.reverse === true) {
            return item.previousElementSibling;
        }

        return item.nextElementSibling;
    }

    /**
     * @param {HTMLElement} item
     *
     * @return {void}
     */
    insert(item) {
        if (this.reverse === true) {
            this.wrapper.prepend(item);

            return;
        }

        this.wrapper.append(item);
    }

    /**
     * @return {HTMLElement[]}
     */
    getItems() {
        let items = Array.from(this.wrapper.children);

        if (this.reverse === true) {
            items = items.reverse();
        }

        return items;
    }
}
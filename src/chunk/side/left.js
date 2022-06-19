import Side from "./side";

import NextInfo from "../info/next/left-info"
import RunnerInfo from "../info/runner/left-info"

export default class Left extends Side {
    constructor({wrapper}) {
        super({wrapper});
    }

    /**
     * @return {RightInfo}
     */
    getRunnerInfo({current, distance}) {
        return new RunnerInfo({current, distance});
    }

    /**
     * @param {HTMLElement} prev
     * @param {HTMLElement} current
     *
     * @return {NextInfo}
     */
    getNextInfo({prev, current}) {
        return new NextInfo({prev, current});
    }

    /**
     * @return {number}
     */
    getDistance() {
        const last = this.wrapper.lastElementChild;
        const fist = this.wrapper.firstElementChild;

        return (last.offsetLeft - fist.offsetLeft);
    }

    /**
     * @return {HTMLElement}
     */
    getFirstCurrent() {
        return this.wrapper.lastElementChild;
    }

    /**
     * @return {HTMLElement}
     */
    getNextSibling(item) {
        return item.previousElementSibling;
    }

    /**
     * @param {HTMLElement} item
     *
     * @return {void}
     */
    inEnd(item) {
        this.wrapper.prepend(item);
    }

    /**
     * @param {HTMLElement} item
     *
     * @return {void}
     */
    atBeginning(item) {
        this.wrapper.append(item);
    }

    /**
     * @return {HTMLElement[]}
     */
    getItems() {
        return Array.from(this.wrapper.children).reverse();
    }
}
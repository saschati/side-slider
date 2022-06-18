import Side from "./side";

import NextInfo from "../info/next/right-info"
import RunnerInfo from "../info/runner/right-info"

export default class Right extends Side {
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
        return this.wrapper.lastElementChild.offsetLeft;
    }

    /**
     * @return {HTMLElement}
     */
    getFirstCurrent() {
        return this.wrapper.firstElementChild;
    }

    /**
     * @return {HTMLElement}
     */
    getNextSibling(item) {
        return item.nextElementSibling;
    }

    /**
     * @param {HTMLElement} item
     *
     * @return {void}
     */
    append(item) {
        this.wrapper.append(item);
    }

    /**
     * @return {HTMLElement[]}
     */
    getItems() {
        return Array.from(this.wrapper.children);
    }
}
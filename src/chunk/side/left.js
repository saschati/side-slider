import Side from "./side";
import NextInfo from "../info/next/left-info";
import RunnerInfo from "../info/runner/left-info";
export default class Left extends Side {
    getRunnerInfo({ current, shift, windowWidth, }) {
        return new RunnerInfo({ current, shift, windowWidth, reverse: this.reverse });
    }
    getNextInfo({ prev, current }) {
        return new NextInfo({ prev, current, reverse: this.reverse });
    }
    getShift() {
        if (this.reverse === true) {
            return this.wrapper.lastElementChild;
        }
        return this.wrapper.firstElementChild;
    }
    getFirstCurrent() {
        if (this.reverse === true) {
            return this.wrapper.firstElementChild;
        }
        return this.wrapper.lastElementChild;
    }
    getNextSibling(item) {
        if (this.reverse === true) {
            return item.nextElementSibling;
        }
        return item.previousElementSibling;
    }
    insert(item) {
        if (this.reverse === true) {
            this.wrapper.append(item);
            return;
        }
        this.wrapper.prepend(item);
    }
    getItems() {
        const items = Array.from(this.wrapper.children);
        if (this.reverse === true) {
            return items;
        }
        return items.reverse();
    }
}

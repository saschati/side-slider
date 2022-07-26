import Side from "./side";
import NextInfo from "../info/next/right-info";
import RunnerInfo from "../info/runner/right-info";
export default class Right extends Side {
    getRunnerInfo({ current, shift, windowWidth, }) {
        return new RunnerInfo({ current, shift, windowWidth, reverse: this.reverse });
    }
    getNextInfo({ prev, current }) {
        return new NextInfo({ prev, current, reverse: this.reverse });
    }
    getShift() {
        if (this.reverse === true) {
            return this.wrapper.firstElementChild;
        }
        return this.wrapper.lastElementChild;
    }
    getFirstCurrent() {
        if (this.reverse === true) {
            return this.wrapper.lastElementChild;
        }
        return this.wrapper.firstElementChild;
    }
    getNextSibling(item) {
        if (this.reverse === true) {
            return item.previousElementSibling;
        }
        return item.nextElementSibling;
    }
    insert(item) {
        if (this.reverse === true) {
            this.wrapper.prepend(item);
            return;
        }
        this.wrapper.append(item);
    }
    getItems() {
        let items = Array.from(this.wrapper.children);
        if (this.reverse === true) {
            items = items.reverse();
        }
        return items;
    }
}

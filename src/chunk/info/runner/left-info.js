import Info from "./info";
export default class LeftInfo extends Info {
    constructor({ current, shift, windowWidth, reverse, }) {
        super({ current, shift, windowWidth, reverse });
        this.horizonHideDistance = 0;
        this.reverseFinishedPosition = 0;
        if (this.reverse === true) {
            this.horizon = shift.getBoundingClientRect().right;
            this.distance = shift.offsetLeft + shift.offsetWidth - (current.offsetLeft + current.offsetWidth);
            this.horizonHideDistance = current.getBoundingClientRect().right;
            this.reverseFinishedPosition = this.distance;
        }
        else {
            this.horizon = current.getBoundingClientRect().right;
            this.distance = current.offsetLeft + current.offsetWidth - (shift.offsetLeft + shift.offsetWidth);
        }
    }
    getDistance() {
        return this.distance;
    }
    getHorizon() {
        return this.horizon;
    }
    getHorizonHideDistance() {
        return this.horizonHideDistance;
    }
    getReverseFinishedPosition() {
        return this.reverseFinishedPosition;
    }
}

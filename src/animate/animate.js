var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Animate {
    constructor({ duration, timing, draw, next = null, }) {
        this.prevTF = 0;
        this.accelerate = 0;
        this.start = 0;
        this.timeFraction = 0;
        this.isFinished = false;
        this.isStarted = false;
        this.isStop = false;
        this.rafId = null;
        this.duration = duration;
        this.timing = timing;
        this.draw = draw;
        this.next = next;
    }
    /**
     * Launch the animation at the start of the tape.
     */
    begin(info) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isStop = false;
            this.start = performance.now();
            this.rafId = requestAnimationFrame(this.animation.bind(this, info));
        });
    }
    /**
     * Pause animation.
     */
    wait() {
        if (this.isStop === true) {
            throw new Error("The animation is currently paused.");
        }
        this.isStop = true;
    }
    /**
     * Continue the animation from the moment the pause was made.
     */
    continue(info) {
        if (this.isStop === false) {
            throw new Error("The animation is not paused.");
        }
        this.isStop = false;
        this.start = performance.now();
        this.prevTF = this.timeFraction;
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
        }
        this.rafId = requestAnimationFrame(this.animation.bind(this, info));
    }
    /**
     * Speed up animation by percent times.
     */
    speedUp(percent) {
        this.accelerate = percent;
    }
    /**
     * Has this animation finished.
     */
    isFinish() {
        return this.isFinished === true;
    }
    /**
     * Has this animation started.
     */
    isStart() {
        return this.isStarted === true;
    }
    /**
     * Return the next animation that will be launched after this one.
     */
    getNext() {
        return this.next;
    }
    /**
     * Private element animation calculation function.
     */
    animation(info, time) {
        this.isStarted = true;
        if (this.isStop === true) {
            return;
        }
        this.timeFraction = this.prevTF + (time - this.start) / this.duration;
        if (this.accelerate > 0) {
            this.timeFraction += this.timeFraction * this.accelerate;
        }
        if (this.timeFraction > 1) {
            this.timeFraction = 1;
        }
        let progress = this.timing(this.timeFraction);
        this.draw(info, progress);
        if (this.timeFraction < 1) {
            this.rafId = requestAnimationFrame(this.animation.bind(this, info));
        }
        else {
            this.isFinished = true;
            if (this.next !== null) {
                this.next.speedUp(this.accelerate);
                this.next.begin(info);
            }
        }
    }
}

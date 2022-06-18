export default class Animate {
    /**
     * @param {number} duration
     * @param {function} timing
     * @param {function} draw
     * @param {Animate|null} next
     */
    constructor({duration, timing, draw, next = null}) {
        this.duration = duration;
        this.timing = timing;
        this.draw = draw;
        this.next = next;

        this.prevTF = 0;
    }

    /**
     * Launch the animation at the start of the tape
     * @return {void}
     */
    async begin(info) {
        this.stop = false;
        this.start = performance.now();

        requestAnimationFrame(this.animation.bind(this, info));
    }

    /**
     * Pause animation
     *
     * @return {void}
     */
    wait() {
        if (this.stop === true) {
            throw new Error('The animation is currently paused.');
        }

        this.stop = true;
    }

    /**
     * Continue the animation from the moment the pause was made
     *
     * @return {void}
     */
    continue(info) {
        if (this.stop === false) {
            throw new Error('The animation is not paused.');
        }

        this.stop = false;

        this.start = performance.now();
        this.prevTF = this.timeFraction;

        requestAnimationFrame(this.animation.bind(this, info));
    }

    /**
     * Private element animation calculation function
     *
     * @param {Info|Info} info
     * @param {number} time
     *
     * @return {void}
     */
    animation(info, time) {
        if (this.stop === true) {
            return;
        }

        this.time = time;
        this.timeFraction = (this.prevTF + ((this.time - this.start) / this.duration));

        if (this.timeFraction > 1) {
            this.timeFraction = 1;
        }

        let progress =  this.timing(this.timeFraction);

        this.draw(info, progress);

        if (this.timeFraction < 1) {
            requestAnimationFrame(this.animation.bind(this, info));
        } else {
            this.next?.begin(info);
        }
    }
}
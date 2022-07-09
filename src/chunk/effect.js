export default class Effect {
    /**
     * @param {Animate} animation
     * @param {number} timeout
     * @param {number} timeoutId
     * @param {function} func
     */
    constructor(animation, timeout, timeoutId, func) {
        this.animation = animation;
        this.timeout = timeout;
        this.timeoutId = timeoutId;
        this.func = func;
        this.time = performance.now();
    }

    /**
     * Return added animation
     *
     * @return {Animate}
     */
    getAnimation() {
        return this.animation;
    }

    /**
     * Does this have a time delay effect
     *
     * @return {boolean}
     */
    hasTimeout() {
        return this.timeout > 0;
    }

    /**
     * Return the new delay for the animation
     *
     * @param {number} accelerate
     *
     * @return {number}
     */
    getTimeout(accelerate) {
        const passed = (performance.now() - this.time);

        return ((this.timeout - passed) / accelerate)
    }

    /**
     * Return the setTimeout ID
     *
     * @return {number}
     */
    getTimeoutId() {
        return this.timeoutId;
    }

    /**
     * Return effect function
     *
     * @return {Function}
     */
    getFunc() {
        return this.func;
    }
}
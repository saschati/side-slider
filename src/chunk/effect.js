export default class Effect {
    constructor(animation, timeout, timeoutId, func) {
        this.animation = animation;
        this.timeout = timeout;
        this.timeoutId = timeoutId;
        this.func = func;
        this.time = performance.now();
    }
    /**
     * Return added animation.
     */
    getAnimation() {
        return this.animation;
    }
    /**
     * Does this have a time delay effect.
     */
    hasTimeout() {
        return this.timeout > 0;
    }
    /**
     * Return the new delay for the animation.
     */
    getTimeout(accelerate) {
        const passed = performance.now() - this.time;
        return (this.timeout - passed) / accelerate;
    }
    /**
     * Return the setTimeout ID.
     */
    getTimeoutId() {
        return this.timeoutId;
    }
    /**
     * Return effect function.
     */
    getFunc() {
        return this.func;
    }
}

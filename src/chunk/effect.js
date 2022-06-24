
export default class Effect {
    constructor(animation, timeout, timeoutId, func) {
        this.animation = animation;
        this.timeout = timeout;
        this.timeoutId = timeoutId;
        this.func = func;
        this.time = performance.now();
    }

    getAnimation() {
        return this.animation;
    }

    hasTimeout() {
        return this.timeout > 0;
    }

    getTimeout(accelerate) {
        const passed = (performance.now() - this.time);

        return ((this.timeout - passed) / accelerate)
    }

    getTimeoutId() {
        return this.timeoutId;
    }

    getFunc() {
        return this.func;
    }
}
import uniq from "lodash/uniq";
import orderBy from "lodash/orderBy";
import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";
import isInteger from "lodash/isInteger";
import isEmpty from "lodash/isEmpty";

import Animate from "./animate/animate";
import linage from "./animate/timing/linage";
import reverse from "./animate/timing/reverse";
import runnerHide from "./animate/animation/runner/hide";
import nextRun from "./animate/animation/next/run";

import Right from "./chunk/side/right";

export default class SideSlider {
    /**
     * @param {{
     *     duration: number,
     *     runner: {
     *         wait: number,
     *         animates: [
     *             {progress: number, timing: function|null, draw: function}
     *         ]| function
     *     },
     *     next: {
     *         visible: null|number
     *         delay: 0,
     *         chain: boolean,
     *         animates: [
     *             {progress: number, timing: function, draw: function}
     *         ]| function
     *     }
     * }} options
     */
    options = {
        autoplay: {
            reverse: false,
            duration: 5000,
            delay: 0,
            active: true,
            chain: true,
            delayedStart: {
                disabled: false,
                delay: 10000,
            },
        },
        runner: {
            wait: 50,
            animates: runnerHide,
        },
        next: {
            visible: null,
            animates: nextRun,
        },
        client: {
            duration: 750,
            minDuration: 250,
            delay: 0,
            chain: true,
            flexibleClick: true,
            button: {
                prev: null,
                next: null,
            },
        },
        mutation: {
            onRun: null,
            onDone: null,
            onActive: null,
            onUnActive: null,
            onVisible: null,
            onUnVisible: null,
        },
        timing: linage,
        reverse: reverse,
        animate: Animate,
    }

    current = null;
    next = null;

    isReverse = false;

    autoplay = {
        isFlushed: false,

        delayedStart: {
            id: null,
        },

        nextDuration: 0,
        runnerDuration: 0,

        runnerAnimations: [],
        nextAnimations: [],
    };

    client = {
        isFlushed: false,

        click: {
            prevent: false,
            bug: [],

            prevTime: null,
            delayPercent: 0,

            reverse: false,
        },

        runnerAnimations: [],
        nextAnimations: [],
    };

    /**
     * @param {HTMLElement} wrapper
     * @param {Right} direction
     * @param {{
     *     duration: number,
     *     runner: {
     *         wait: number,
     *         animates: [
     *             {progress: number, timing: function|null, draw: function}
     *         ]| function
     *     },
     *     next: {
     *         visible: null|number
     *         delay: 0,
     *         chain: boolean,
     *         animates: [
     *             {progress: number, timing: function, draw: function}
     *         ]| function
     *     }
     * }} options
     */
    constructor({wrapper, direction = Right, options = {}}) {
        this.direction = new direction({wrapper});

        merge(this.options, options || {});
    }

    async run() {
        this.windowWidth = (global.pageXOffset + document.documentElement.clientWidth);

        const {next, autoplay: autoplayOptions, client: clientOptions} = this.options;

        this.attachMutation();

        if (autoplayOptions.chain === true || clientOptions.chain === true) {
            if (isEmpty(next.visible) === true) {
                next.visible = this.direction.getItems().reduce((accumulator, item) => {
                    return accumulator + (this.isVisible(item) ? 1 : 0);
                }, 0);
            }

            if (isInteger(next.visible) === false) {
                throw new Error('З видними елементами щось нетак.');
            }
        }

        if (clientOptions.delay > 0 && clientOptions.flexibleClick === true) {
            this.client.click.delayPercent = (1 - ((clientOptions.duration - clientOptions.delay) / clientOptions.duration));
        }

        if (autoplayOptions.active === false && (clientOptions.button.prev === null && clientOptions.button.next)) {
            throw new Error('Стрічка не працююча, автопрограх виключений і не передано жодного обробника руху.');
        }

        if (autoplayOptions.active === true) {
            this.runAutoplay();
        }

        if (clientOptions.button.next !== null) {
            clientOptions.button.next.addEventListener('click', (evt) => {
                this.runClientClick();
            });
        }
        if (clientOptions.button.prev !== null) {
            clientOptions.button.prev.addEventListener('click', (evt) => {
                this.runClientClick(true);
            });
        }
    }

    async runClientClick(reverse = false) {
        this.delayedAutoplay();

        const {client: options} = this.options
        const {click} = this.client;

        if (reverse !== click.reverse && click.bug.length !== 0) {
            click.prevent = true;
        }

        let duration = click.duration;
        let delay = options.delay;

        click.reverse = reverse;

        if (options.flexibleClick === true) {
            let nowTime = performance.now();

            if (click.prevTime === null || ((nowTime - click.prevTime) > options.duration)) {
                click.prevTime = (performance.now() - options.duration);
            }

            duration = (nowTime - click.prevTime);

            click.prevTime = nowTime;
            if (duration < options.minDuration) {
                duration = options.minDuration;
            }

            delay = (duration * this.client.click.delayPercent);
        }

        this.client.click.bug.push([duration, delay]);

        this.flushClientClick();
    }

    async runAutoplay() {
        const {runner, next, autoplay: options} = this.options;

        options.active = true;

        this.autoplay.nextDuration = (options.duration - options.delay);
        this.autoplay.runnerDuration = options.duration;

        this.autoplay.runnerAnimations = [];
        this.autoplay.nextAnimations = [];

        if (this.autoplay.nextDuration <= 0) {
            throw new Error('Очікування не моеже бути більше/дорівнювати часу анімації');
        }

        if (options.chain === true) {
            this.autoplay.nextDuration = (this.autoplay.nextDuration / next.visible);
        }

        this.parseAnimation(runner, this.autoplay.runnerAnimations, this.autoplay.runnerDuration, options.reverse);
        this.parseAnimation(next, this.autoplay.nextAnimations, this.autoplay.nextDuration);

        this.flushAutoplay();
    }

    stopAutoplay() {
        const options = this.options.autoplay;

        options.active = false;

        if (this.autoplay.delayedStart.id !== null) {
            clearTimeout(this.autoplay.delayedStart.id);
        }
    }

    async delayedAutoplay() {
        const options = this.options.autoplay;

        if (this.autoplay.delayedStart.id !== null || options.active === true) {
            this.stopAutoplay();

            if (options.delayedStart.disabled === true) {
                return;
            }

            this.autoplay.delayedStart.id = setTimeout(() => {
                this.autoplay.delayedStart.id = null;
                options.active = true;

                this.flushAutoplay();
            }, options.delayedStart.delay);
        }
    }

    async nextSlide({runnerAnimations, nextAnimations, runnerDuration, nextDuration, delay, chain, isReverse = false}) {
        if (isReverse !== this.isReverse) {
            this.isReverse = isReverse;

            this.current = null;
        }

        this.direction.setReverse(this.isReverse);

        this.current ??= this.direction.getFirstCurrent();
        this.next = this.direction.getNextSibling(this.current);

        if (this.isReverse === false) {
            this.options.mutation.onUnActive(this.current);
        }

        let timeout = 0;
        let count = 0;
        if (this.isReverse === false) {
            timeout += delay;
        }
        this.direction.getItems().forEach(item => {
            const next = this.direction.getNextSibling(item);
            if (next === null) {
                if (this.isReverse === true) {
                    this.options.mutation.onUnActive(item);
                }

                return;
            }

            if ((this.isReverse === true && this.isVisible(next) === false) || this.isVisible(item) === false) {
                this.options.mutation.onUnVisible(next);

                return;
            }

            this.options.mutation.onVisible(next);

            const info = this.direction.getNextInfo({prev: item, current: next});
            const [animation] = nextAnimations;

            const _animation = cloneDeep(animation);

            const nextAnimation = () => {
                if (this.isReverse === false && this.next === next) {
                    this.options.mutation.onActive(this.next)
                }

                _animation.begin(info);
            }

            if (chain === false) {
                setTimeout(nextAnimation, timeout);

                return;
            }

            setTimeout(nextAnimation, timeout);

            timeout = (++count * nextDuration);

            if (this.isReverse === false) {
                timeout += delay;
            }
        });

        const [animation] = runnerAnimations;
        const _animation = cloneDeep(animation);
        const info = this.direction.getRunnerInfo({
            current: this.current,
            shift: this.direction.getShift(),
            windowWidth: this.windowWidth
        });

        setTimeout(() => {
            this.options.mutation.onRun(this.current);

            _animation.begin(info)
        }, (this.isReverse === true ? delay : 0));

        if (this.isReverse === true) {
            runnerDuration += delay;
        }

        setTimeout(
            () => this.slideItem(),
            (runnerDuration + (this.options.runner.wait * 2))
        );
    }

    slideItem() {
        this.direction.insert(this.current);

        this.options.mutation.onDone(this.current);
        if (this.isReverse === true) {
            this.options.mutation.onActive(this.current);
            this.options.mutation.onVisible(this.current);
        } else {
            this.options.mutation.onUnVisible(this.current);
        }

        this.direction.getItems().forEach(item => {
            item.removeAttribute('style');
        });

        this.client.isFlushed = false;
        this.autoplay.isFlushed = false;

        this.current = this.next;

        this.flushAutoplay();
        this.flushClientClick();
    }

    async flushClientClick() {
        const {click} = this.client;
        const {next, runner, client: options} = this.options;

        if (click.bug.length === 0 || this.client.isFlushed === true || this.autoplay.isFlushed === true) {
            return;
        }

        if (click.prevent === true) {
            click.bug = [];
            click.prevent = false;

            return;
        }

        this.client.isFlushed = true;

        this.client.runnerAnimations = [];
        this.client.nextAnimations = [];

        const [duration, delay] = click.bug.shift();

        let runnerDuration = duration;
        let nextDuration = (duration - delay);

        if (options.chain === true) {
            nextDuration = (nextDuration / next.visible);
        }

        this.parseAnimation(runner, this.client.runnerAnimations, runnerDuration, click.reverse);
        this.parseAnimation(next, this.client.nextAnimations, nextDuration);

        this.nextSlide({
            runnerAnimations: this.client.runnerAnimations,
            nextAnimations: this.client.nextAnimations,
            runnerDuration: runnerDuration,
            nextDuration: nextDuration,
            delay: delay,
            chain: options.chain,
            isReverse: click.reverse,
        });
    }

    async flushAutoplay() {
        const options = this.options.autoplay;

        if (options.active === false || this.autoplay.isFlushed === true || this.client.isFlushed === true) {
            return;
        }

        this.autoplay.isFlushed = true;

        this.nextSlide({
            runnerAnimations: this.autoplay.runnerAnimations,
            nextAnimations: this.autoplay.nextAnimations,
            runnerDuration: this.autoplay.runnerDuration,
            nextDuration: this.autoplay.nextDuration,
            delay: options.delay,
            chain: options.chain,
            isReverse: options.reverse
        });
    }

    isVisible(item) {
        const coords = item.getBoundingClientRect();

        const itemPosition = {
                top: global.pageYOffset + coords.top,
                left: global.pageXOffset + coords.left,
                right: global.pageXOffset + coords.right,
                bottom: global.pageYOffset + coords.bottom
            },
            windowPosition = {
                top: global.pageYOffset,
                left: global.pageXOffset,
                right: global.pageXOffset + document.documentElement.clientWidth,
                bottom: global.pageYOffset + document.documentElement.clientHeight
            };

        return itemPosition.bottom > windowPosition.top &&
            itemPosition.top < windowPosition.bottom &&
            itemPosition.right > windowPosition.left &&
            itemPosition.left < windowPosition.right;
    }

    parseAnimation(subject, collection, duration, isReverse = false) {
        if (subject.animates instanceof Function) {
            const timing = isReverse === true ? this.options.reverse(this.options.timing) : this.options.timing;

            const animation = new this.options.animate({
                duration: duration,
                timing: timing,
                draw: subject.animates,
            });

            collection.unshift(animation);

            return;
        }

        const progress = subject.animates.map(item => {
            if (item.progress > 100) {
                throw new Error('Прогрес не може бути більше 100%.');
            }

            return item.progress;
        });

        if (uniq(progress).length < progress.length) {
            throw new Error('Прогрес повинен бути унікальним на кожну анімацію.');
        }

        let prevDuration = 0;
        const progressDuration = progress.map(item => {
            const _duration = (((duration / 100) * item) - prevDuration);

            prevDuration = ((duration / 100) * item);
            return {progress: item, duration: _duration};
        });

        let nextAnimation = null;
        const order = (isReverse === true) ? 'asc' : 'desc';
        orderBy(subject.animates, ['progress'], [order]).forEach(item => {
            const animateConf = progressDuration.find(conf => conf.progress === item.progress);

            let timing = item.timing || this.options.timing;
            if (isReverse === true) {
                timing = this.options.reverse(timing)
            }

            const animation = new this.options.animate({
                duration: animateConf.duration,
                timing: timing,
                draw: item.draw,
                next: nextAnimation
            });

            collection.unshift(animation);

            nextAnimation = animation;
        });
    }

    attachMutation() {
        const {mutation} = this.options;

        mutation.onRun ??= function (item) {
            item.classList.add('is-runner');
        }

        mutation.onDone ??= function (item) {
            item.classList.remove('is-runner');
        }

        mutation.onActive ??= function (item) {
            item.classList.add('is-active');
        }

        mutation.onUnActive ??= function (item) {
            item.classList.remove('is-active');
        }

        mutation.onVisible ??= function (item) {
            item.classList.add('is-visible');
        }

        mutation.onUnVisible ??= function (item) {
            item.classList.remove('is-visible');
        }

        if (!Object.getOwnPropertyNames(mutation).every(item => mutation[item] instanceof Function)) {
            throw new Error('Примісі повині бути функціями.');
        }
    }
}
import uniq from "lodash/uniq";
import orderBy from "lodash/orderBy";
import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";
import isInteger from "lodash/isInteger";
import isEmpty from "lodash/isEmpty";

import Animate from "./animate/animate";
import linage from "./animate/timing/linage";
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
        duration: 5000,
        runner: {
            wait: 50,
            animates: runnerHide,
            mutation: {
                active: function (item) {
                    item.classList.remove('is-active');
                    item.classList.remove('is-visible');

                    item.classList.add('is-runner');
                },
                hide: function (item) {
                    item.classList.remove('is-runner');
                }
            }
        },
        next: {
            delay: 0,
            visible: null,
            chain: true,
            animates: nextRun,
            mutation: {
                active: function (item) {
                    item.classList.add('is-active');
                },
                visible: function (item) {
                    item.classList.add('is-visible');
                }
            }
        },
        timing: linage,
        animate: Animate,
    }

    current = null;
    next = null;

    runnerAnimations = [];
    nextAnimations = [];

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
        this.distance = this.direction.getDistance();
        this.current = this.direction.getFirstCurrent();

        const {runner, next, duration} = this.options;

        if (!(runner.mutation.active instanceof Function)) {
            throw new Error('Примісі повині бути функціями.');
        }

        if (!(next.mutation.active instanceof Function) || !(next.mutation.visible instanceof Function)) {
            throw new Error('Примісі повині бути функціями.');
        }

        this.nextDuration = (duration - next.delay);
        this.runnerDuration = duration;

        if (this.nextDuration <= 0) {
            throw new Error('Очікування не моеже бути більше/дорівнювати часу анімації');
        }

        if (next.chain === true) {
            if (isEmpty(next.visible) === true) {
                let visible = 0;
                for (const item of this.direction.getItems()) {
                    visible += this.isVisible(item) ? 1 : 0 ;
                }

                next.visible = visible;
            }

            if (isInteger(next.visible) === false) {
                throw new Error('З видними елементами щось нетак.');
            }

            this.nextDuration = (this.nextDuration / next.visible);
        }

        this.parseAnimation(runner, this.runnerAnimations, this.runnerDuration);
        this.parseAnimation(next, this.nextAnimations, this.nextDuration);

        this.nextSlide();
    }

    async nextSlide() {
        this.next = this.direction.getNextSibling(this.current);

        this.options.runner.mutation.active(this.current);
        this.options.next.mutation.active(this.next);

        let timeout = this.options.next.delay;
        let count = 0;
        for (const item of this.direction.getItems()) {
            const next = this.direction.getNextSibling(item);
            if (this.isVisible(item) === false || next === null) {
                continue;
            }

            this.options.next.mutation.visible(next);

            const info = this.direction.getNextInfo({prev: item, current: next});
            const [animation] = this.nextAnimations;

            const _animation = cloneDeep(animation);

            if (this.options.next.chain === false) {
                setTimeout(() => {
                    _animation.begin(info);
                }, timeout);

                continue;
            }

            setTimeout(() => {
                _animation.begin(info);
            }, timeout);

            timeout = ((++count * this.nextDuration) + this.options.next.delay);
        }

        const [animation] = this.runnerAnimations;
        const _animation = cloneDeep(animation);
        const info = this.direction.getRunnerInfo({current: this.current, distance: this.distance});

        _animation.begin(info);

        setTimeout(() => this.slideItem(), (this.runnerDuration + (this.options.runner.wait * 2)));
    }

    slideItem() {
        this.direction.append(this.current);
        this.options.runner.mutation.hide(this.current);

        for (const item of this.direction.getItems()) {
            item.removeAttribute('style');
        }

        this.current = this.next;

        this.nextSlide();
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

    parseAnimation(subject, collection, duration) {
        if (subject.animates instanceof Function) {
            const animation = new this.options.animate({
                duration: duration,
                timing: this.options.timing,
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
        orderBy(subject.animates, ['progress'], ['desc']).forEach(item => {
            const animateConf = progressDuration.find(conf => conf.progress === item.progress);

            const animation = new this.options.animate({
                duration: animateConf.duration,
                timing: item.timing || this.options.timing,
                draw: item.draw,
                next: nextAnimation
            });

            collection.unshift(animation);

            nextAnimation = animation;
        });
    }
}
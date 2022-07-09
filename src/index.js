import uniq from "lodash/uniq";
import orderBy from "lodash/orderBy";
import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";
import isInteger from "lodash/isInteger";

import Animate from "./animate/animate";
import linage from "./animate/timing/linage";
import reverse from "./animate/timing/reverse";
import runnerHide from "./animate/animation/runner/hide";
import nextRun from "./animate/animation/next/run";

import Effect from "./chunk/effect";

import Right from "./chunk/side/right";

export default class SideSlider {
    /**
     * Plugin options
     *
     * @param {{
     *     autoplay: {
     *         reverse: boolean,
     *         duration: number,
     *         delay: number,
     *         calculateDelayFromOther: boolean,
     *         active: boolean,
     *         chain: boolean,
     *         delayedStart: {
     *             disabled: boolean,
     *             delay: number,
     *         }
     *     },
     *     runner: {
     *         wait: number,
     *         animates: [
     *             {progress: number, timing: function|null, draw: function}
     *         ]| function
     *     },
     *     next: {
     *         visible: null|number,
     *         optimize: boolean,
     *         animates: [
     *             {progress: number, timing: function, draw: function}
     *         ]| function
     *     },
     *     client: {
     *         duration: number,
     *         minDuration: number,
     *         delay: number,
     *         calculateDelayFromOther: boolean,
     *         chain: number,
     *         flexibleClick: boolean,
     *         prevent: boolean,
     *         speedUp: {
     *             active: boolean,
     *             forceNext: boolean,
     *         },
     *         button: {
     *             prev: HTMLElement|null,
     *             next: HTMLElement|null,
     *         },
     *     },
     *     mutation: {
     *         onRun: function,
     *         onDone: function,
     *         onActive: function,
     *         onUnActive: function,
     *         onVisible: function,
     *         onUnVisible: function,
     *         onSwitched: function,
     *
     *         onClickStart: function,
     *         onClickFlushed: function,
     *     },
     *     timing: linage,
     *     reverse: reverse,
     *     animate: Animate,
     * }} options
     */
    options = {
        /**
         * Autoplay field
         */
        autoplay: {
            /**
             * Determines whether to start autoplay when the plugin is loaded
             */
            active: true,
            /**
             * Defines the direction in which autoplay should act by default from the first element to the end
             */
            reverse: false,
            /**
             * Determines the speed of change of the element in autoplay
             */
            duration: 3000,
            /**
             * Delay for neighboring elements before taking the place of the change element
             */
            delay: 0,
            /**
             * Determines whether to count the delay from the user's click option
             */
            calculateDelayFromOther: false,
            /**
             * As the elements should shift by default each element separately,
             * the time after the delay is divided between
             */
            chain: true,
            /**
             * Option to pause autoplay after last click
             */
            delayedStart: {
                /**
                 * Whether to stop forever when one of the buttons was clicked
                 */
                disabled: false,
                /**
                 * Timeout for a new autoplay start after the last click
                 */
                delay: 10000,
            },
        },
        /**
         * Options for the element that should be hidden and placed at the end/beginning according to the direction
         */
        runner: {
            /**
             * A delay for the entire loop so that the animation ends before the parent element changes loop
             */
            wait: 100,
            /**
             * Animation of hiding an element
             */
            animates: runnerHide,
        },
        /**
         * Options of adjacent elements that make the ribbon move
         */
        next: {
            /**
             * The number of visible elements of the tape to divide the time between them if the option chain=true,
             * calculated automatically by default
             */
            visible: null,
            /**
             * Optimize the switching process by performing it only when the user sees it
             */
            optimize: true,
            /**
             * Animation of displacement of adjacent elements for the movement of the tape
             */
            animates: nextRun,
        },
        /**
         * Client click options
         */
        client: {
            /**
             * Determines the speed of change of the element in autoplay
             */
            duration: 750,
            /**
             * Defines the minimum speed at which autoplay can work
             */
            minDuration: 250,
            /**
             * Delay for neighboring elements before taking the place of the change element
             */
            delay: 0,
            /**
             * Determines whether to calculate delay from the autoplay option
             */
            calculateDelayFromOther: false,
            /**
             * As the elements should shift by default each element separately,
             * the time after the delay is divided between prominent elements
             */
            chain: true,
            /**
             * This field determines whether the playback speed will be calculated according to the speed
             * of pressing the buttons
             */
            flexibleClick: true,
            /**
             * Indicates that there can be only one animation per click, otherwise clicks will accumulate,
             * and release until the pressure is stopped or the other side of the change is chosen
             */
            prevent: true,
            /**
             * Specifies whether to speed up the animation
             */
            speedUp: {
                /**
                 * If the value is active, then when you click,
                 * the autoplay animation will accelerate to the speed of the click, otherwise,
                 * the click will start only after the autoplay animation ends
                 */
                active: true,
                /**
                 * Specifies whether, when clicking on the scroll button,
                 * autoplay should also perform a click after acceleration is complete
                 * otherwise, the first click will simply accelerate the autoplay animation itself to its completion
                 */
                forceNext: true,
            },
            /**
             * Ribbon controls object from the client
             */
            button: {
                /**
                 * Control button for reverse change
                 */
                prev: null,
                /**
                 * Control button for scrolling
                 */
                next: null,
            },
        },
        /**
         * A mutation object that is responsible for customizing an element on pseudo events
         */
        mutation: {
            /**
             * Mutation when moving an element to/from the end
             */
            onRun: null,
            /**
             * Mutation at the end of the movement of the element to/from the end
             */
            onDone: null,
            /**
             * A mutation for an existing active element that is considered the first in the list
             */
            onActive: null,
            /**
             * Mutation when the element ceases to be the first and goes to the onRun mutation
             */
            onUnActive: null,
            /**
             * Mutation when the element appears in the user's field of view
             */
            onVisible: null,
            /**
             * Mutation when the element disappears from the user's field of view
             */
            onUnVisible: null,
            /**
             * Mutation when a path was traversed by one element and it switched
             */
            onSwitched: null,

            /**
             * Mutation for the control element when pressed and starting the animation
             */
            onClickStart: null,
            /**
             * Mutation for a control element when a path has been traversed by one element and it has switched
             */
            onClickFlushed: null,
        },
        /**
         * Time function
         */
        timing: linage,
        /**
         * Reversible time function
         */
        reverse: reverse,
        /**
         * A class for working with animations
         */
        animate: Animate,
    }

    /**
     * The current element that should be hidden or revealed
     *
     * @type {HTMLElement}
     *
     * @private
     */
    current = null;

    /**
     * The next element after the current one that should be shown or hidden
     *
     * @type {HTMLElement}
     *
     * @private
     */
    next = null;

    /**
     * Specifies whether the element will be shown or hidden
     *
     * @type {boolean}
     *
     * @private
     */
    isReverse = false;

    /**
     * Internal property that controls autoplay behavior
     *
     * @type {
     *    {
     *        runnerAnimations: [],
     *        runnerDuration: number,
     *        isFlushed: boolean,
     *        delayedStart: {
     *          id: number
     *        },
     *        delayPercent: number,
     *        nextDuration: number,
     *        reverse: boolean,
     *        nextAnimations: []
     *    }
     * }
     *
     * @private
     */
    autoplay = {
        /**
         * Determines whether autoplay has completed its work on this circuit
         */
        isFlushed: false,
        /**
         * Specifies whether the element is shown or hidden in autoplay
         */
        reverse: false,
        /**
         * Delayed loading object
         */
        delayedStart: {
            /**
             * The ID of the delayed start
             */
            id: null,
        },
        /**
         * Percentage of total autoplay lap loss time to determine latency
         */
        delayPercent: 0,
        /**
         * The animation time of the main element
         */
        runnerDuration: 0,
        /**
         * The animation time of the ribbon of neighboring elements from the main element
         */
        nextDuration: 0,
        /**
         * List of main element animations
         */
        runnerAnimations: [],
        /**
         * List of animations of neighboring elements
         */
        nextAnimations: [],
    };

    /**
     * An internal property that controls the interaction between the client and the slider
     *
     * @type {
     *    {
     *        runnerAnimations: [],
     *        isFlushed: boolean,
     *        nextAnimations: [],
     *        click: {
     *            prevent: boolean,
     *            bug: [],
     *            prevTime: number,
     *            delayPercent: number,
     *            reverse: boolean
     *        }
     *    }
     * }
     *
     * @private
     */
    client = {
        /**
         * Determines whether the work of clicks to the client has been completed
         */
        isFlushed: false,
        /**
         * Обєкт даних про клік
         */
        click: {
            /**
             * A click data object
             */
            prevent: false,
            /**
             * List of animation times by clicks
             */
            bug: [],
            /**
             * The time when the previous click was made, required to accelerate clicks
             */
            prevTime: null,
            /**
             * A percentage of the total time of the click cycle loss to determine the delay
             */
            delayPercent: 0,
            /**
             * In which direction the click was made
             */
            reverse: false,
        },
        /**
         * List of main element animations
         */
        runnerAnimations: [],
        /**
         * List of animations of neighboring elements
         */
        nextAnimations: [],
    };

    /**
     * A collection of animations by elements that use them
     *
     * @type {Map<HTMLElement, Effect>}
     *
     * @private
     */
    animations = new Map();

    /**
     * An object to trigger animations to change the next element
     *
     * @type {
     *     {
     *         id: number,
     *         duration: number,
     *         isForced: boolean,
     *         startTime: number
     *     }
     * }
     *
     * @private
     */
    nextSlideItem = {
        /**
         * The ID of the running process to change the next slide
         */
        id: null,
        /**
         * The time for which the current slide should change and go to the next one
         */
        duration: 0,
        /**
         * Has there been a change between slide
         */
        isForced: false,
        /**
         * The time when the slide change process started
         */
        startTime: 0,
    }

    /**
     * @param {HTMLElement} wrapper
     * @param {Right} direction
     * @param {Object} options
     */
    constructor({wrapper, direction = Right, options = {}}) {
        this.direction = new direction({wrapper});

        merge(this.options, options || {});
    }

    /**
     * Downloading the configuration and preparing the plug-in to work
     *
     * @return {Promise<void>}
     */
    async boot() {
        this.windowWidth = (global.pageXOffset + document.documentElement.clientWidth);

        const {next, autoplay: autoplayOptions, client: clientOptions} = this.options;

        this.attachMutation();

        if (!next.visible) {
            next.visible = this.direction.getItems().reduce((accumulator, item) => {
                const coords = item.getBoundingClientRect();

                return accumulator + ((coords.left < this.windowWidth && coords.right > 0) ? 1 : 0);
            }, 0);
        }

        if (isInteger(next.visible) === false) {
            throw new Error('There is something wrong with the visible elements.');
        }

        if (autoplayOptions.active === false && (clientOptions.button.prev === null && clientOptions.button.next === null)) {
            throw new Error('The tape is not working, autoplay is disabled and no motion handler is passed.');
        }

        if (clientOptions.delay > 0 && clientOptions.flexibleClick === true) {
            this.client.click.delayPercent = (1 - ((clientOptions.duration - clientOptions.delay) / clientOptions.duration));
        }

        if (clientOptions.calculateDelayFromOther === true) {
            this.client.click.delayPercent = this.calculateDelayFromOther(autoplayOptions);
        }

        if (autoplayOptions.calculateDelayFromOther === true) {
            this.autoplay.delayPercent = this.calculateDelayFromOther(clientOptions);
        }

        if (autoplayOptions.active === true) {
            this.triggerAutoplay(autoplayOptions.reverse);
        }

        if (clientOptions.button.next !== null) {
            clientOptions.button.next.addEventListener('click', () => {
                this.triggerClientClick();
            });
        }
        if (clientOptions.button.prev !== null) {
            clientOptions.button.prev.addEventListener('click', () => {
                this.triggerClientClick(true);
            });
        }
    }

    /**
     * Change the slide change according to the client click settings
     *
     * @param {boolean} reverse The direction of concealment or manifestation
     *
     * @return {Promise<void>}
     */
    async triggerClientClick(reverse = false) {
        const {client: options} = this.options
        const {click} = this.client;

        if (click.bug.length !== 0 && options.prevent === true) {
            return;
        }

        if (reverse !== click.reverse && click.bug.length !== 0) {
            click.prevent = true;
        }

        let duration = options.duration;
        let delay = options.delay;

        if (options.calculateDelayFromOther === true) {
            delay = (duration * this.client.click.delayPercent);
        }

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

            delay = (duration * click.delayPercent);
        }

        this.client.click.bug.push([duration, delay]);

        this.flushClientClick();
    }

    /**
     * Start autoplay accordingly
     *
     * @param {boolean} reverse The direction of concealment or manifestation
     *
     * @return {Promise<void>}
     */
    async triggerAutoplay(reverse = false) {
        const {runner, next, autoplay: options} = this.options;

        options.active = true;
        options.reverse = reverse;

        if (options.calculateDelayFromOther === true) {
            options.delay = (options.duration * this.autoplay.delayPercent);
        }

        this.autoplay.nextDuration = (options.duration - options.delay);
        this.autoplay.runnerDuration = options.duration;

        this.autoplay.runnerAnimations = [];
        this.autoplay.nextAnimations = [];

        if (this.autoplay.nextDuration <= 0) {
            throw new Error('The wait cannot be greater than/equal to the animation time.');
        }

        if (options.chain === true) {
            this.autoplay.nextDuration = (this.autoplay.nextDuration / next.visible);
        }

        this.parseAnimation(runner, this.autoplay.runnerAnimations, this.autoplay.runnerDuration, options.reverse);
        this.parseAnimation(next, this.autoplay.nextAnimations, this.autoplay.nextDuration);

        this.flushAutoplay();
    }

    /**
     * Stop autoplay
     *
     * @return {void}
     */
    stopAutoplay() {
        const options = this.options.autoplay;

        options.active = false;

        if (this.autoplay.delayedStart.id !== null) {
            clearTimeout(this.autoplay.delayedStart.id);
        }
    }

    /**
     * Delay autoplay according to autoplay settings
     *
     * @return {Promise<void>}
     */
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

    /**
     * Start the process of changing the next slide
     *
     * @param {Array<number, Animate>} runnerAnimations
     * @param {Array<number, Animate>} nextAnimations
     * @param {number} runnerDuration
     * @param {number} nextDuration
     * @param {number} delay
     * @param {boolean} chain
     * @param {boolean} isReverse
     *
     * @return {Promise<void>}
     *
     * @private
     */
    async nextSlide({runnerAnimations, nextAnimations, runnerDuration, nextDuration, delay, chain, isReverse = false}) {
        if (isReverse !== this.isReverse) {
            this.isReverse = isReverse;

            this.current = null;
        }

        if (this.client.isFlushed === true) {
            const button = this.options.client.button;

            this.options.mutation.onClickStart((this.client.click.reverse === true) ? button.prev : button.next);
        }

        this.direction.setReverse(this.isReverse);

        this.current ??= this.direction.getFirstCurrent();
        this.next = this.direction.getNextSibling(this.current);

        if (this.isReverse === false) {
            this.options.mutation.onUnActive(this.current);
        }

        let count = 0;
        let timeout = 0;
        let total = this.options.next.visible;
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

            if (total === 0 || (this.options.next.optimize === true && this.isVisible((this.isReverse === true ? next : item)) === false)) {
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

            const animate = () => {
                this.animations.set(
                    next,
                    new Effect(_animation, timeout, setTimeout(nextAnimation, timeout), nextAnimation)
                );
            }

            total--;

            if (chain === false) {
                animate();

                return;
            }

            animate();

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

        timeout = (this.isReverse === true ? delay : 0);
        const currentAnimation = () => {
            this.options.mutation.onRun(this.current);

            _animation.begin(info)
        }

        this.animations.set(
            this.current,
            new Effect(_animation, timeout, setTimeout(currentAnimation, timeout), currentAnimation)
        );

        if (this.isReverse === true) {
            runnerDuration += delay;
        }

        this.nextSlideItem.startTime = performance.now();
        this.nextSlideItem.id = setTimeout(
            () => this.slideItem(),
            this.nextSlideItem.duration = (runnerDuration + this.options.runner.wait)
        );
    }

    /**
     * Change slide
     *
     * @return {void}
     *
     * @private
     */
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
            this.options.mutation.onSwitched(item);
        });

        if (this.client.isFlushed === true) {
            const button = this.options.client.button;

            this.options.mutation.onClickFlushed((this.client.click.reverse === true) ? button.prev : button.next);
        }

        this.client.isFlushed = false;
        this.autoplay.isFlushed = false;

        this.animations = new Map();
        this.nextSlideItem.isForced = false;

        this.current = this.next;

        this.flushClientClick();
        this.flushAutoplay();
    }

    /**
     * Start the user click processing process
     *
     * @return {Promise<void>}
     *
     * @private
     */
    async flushClientClick() {
        const {click} = this.client;
        const {next, runner, client: options} = this.options;

        if (click.bug.length === 0 || this.client.isFlushed === true || this.autoplay.isFlushed === true) {
            if (options.speedUp.active === true && this.autoplay.isFlushed === true && this.nextSlideItem.isForced === false) {
                this.nextSlideItem.isForced = true;

                const accelerate = (this.options.autoplay.duration / options.duration);

                const speedUpRecursive = next => {
                    if (next === null) {
                        return;
                    }

                    next.speedUp(accelerate);

                    return speedUpRecursive(next.getNext());
                }

                const speedUp = async effect => {
                    const animation = effect.getAnimation();

                    if (animation.isFinish() === true) {
                        return speedUpRecursive(animation.getNext());
                    }

                    animation.speedUp(accelerate);
                    if (animation.isStart() === true) {
                        return speedUpRecursive(animation.getNext());
                    }

                    if (effect.hasTimeout() === true) {
                        clearTimeout(effect.getTimeoutId());
                        setTimeout(effect.getFunc(), effect.getTimeout(accelerate));
                    }

                    return speedUpRecursive(animation.getNext());
                }

                Array.from(this.animations.values()).forEach(speedUp);

                clearTimeout(this.nextSlideItem.id);

                const passed = (performance.now() - this.nextSlideItem.startTime);

                this.nextSlideItem.id = setTimeout(
                    () => this.slideItem(),
                    (((this.nextSlideItem.duration - passed) / accelerate) + 100)
                );

                if (options.speedUp.forceNext === false) {
                    this.delayedAutoplay();

                    click.bug = [];
                }
            }

            return;
        }

        this.delayedAutoplay();

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

    /**
     * Start the autoplay processing
     *
     * @return {Promise<void>}
     *
     * @private
     */
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

    /**
     * Check whether the user can see this element.
     * It is used for optimization so as not to start the animation again if the user does not see it
     *
     * @param {HTMLElement} item
     *
     * @return {boolean}
     *
     * @private
     */
    isVisible(item) {
        const coords = item.getBoundingClientRect();

        const position = {
            item: {
                top: global.pageYOffset + coords.top,
                left: global.pageXOffset + coords.left,
                right: global.pageXOffset + coords.right,
                bottom: global.pageYOffset + coords.bottom
            },
            window: {
                top: global.pageYOffset,
                left: global.pageXOffset,
                right: global.pageXOffset + document.documentElement.clientWidth,
                bottom: global.pageYOffset + document.documentElement.clientHeight
            }
        };

        return position.item.bottom > position.window.top &&
            position.item.top < position.window.bottom &&
            position.item.right > position.window.left &&
            position.item.left < position.window.right;
    }

    /**
     * Animation parsing
     *
     * @param {
     *    {
     *        animates: [
     *            {
     *                progress: number,
     *                draw: function,
     *                timing: function
     *            }
     *        ]|function
     *    }
     * } subject
     * @param {Array<number, Animate>} collection
     * @param {number} duration
     * @param {boolean} isReverse
     *
     * @return {void}
     *
     * @private
     */
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
                throw new Error('Progress cannot be more than 100%.');
            }

            return item.progress;
        });

        if (uniq(progress).length < progress.length) {
            throw new Error('Progress must be unique for each animation.');
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

    /**
     * Calculates the delay percentage according to neighboring options
     *
     * @param {
     *     {
     *        calculateDelayFromOther: boolean,
     *        delay: number,
     *        duration: number
     *     }
     * } options
     *
     * @return {number}
     *
     * @private
     */
    calculateDelayFromOther(options) {
        if (options.calculateDelayFromOther === true) {
            throw new Error('It is not possible to automatically determine the delay for a click because the autoplay data is click dependent.');
        }

        if (!options.delay || !options.duration) {
            throw new Error('It is not possible to automatically determine the click delay due to lack of data.');
        }

        return (1 - ((options.duration - options.delay) / options.duration));
    }

    /**
     * Create default or add custom mutations for elements
     *
     * @return {void}
     *
     * @private
     */
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

        mutation.onSwitched ??= function (item) {
            item.removeAttribute('style');
        }

        mutation.onClickStart ??= function (item) {
            item.classList.add('is-click');
        }

        mutation.onClickFlushed ??= function (item) {
            item.classList.remove('is-click');
        }

        if (!Object.getOwnPropertyNames(mutation).every(item => mutation[item] instanceof Function)) {
            throw new Error('Mutations must be functions.');
        }
    }
}
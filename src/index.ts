import Options from "./chunk/vo/options/options";
import Side from "./chunk/side/side";
import Autoplay from "./chunk/vo/autoplay";
import Client from "./chunk/vo/client/client";
import NextSlideItem from "./chunk/vo/next-slide-item";
import CalculateDelay from "./chunk/vo/options/calculate-delay";
import {
  AnimationFunction,
  AnimationNextArrayObject,
  AnimationRunnerArrayObject,
  type AnimationNext,
  type AnimationRunner,
} from "./types/side-slider";

import uniq from "lodash/uniq";
import orderBy from "lodash/orderBy";
import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";
import isInteger from "lodash/isInteger";

import isVisible from "./utils/is-visible";

import Animate from "./animate/animate";
import linage from "./animate/timing/linage";
import reverse from "./animate/timing/reverse";
import runnerHide from "./animate/animation/runner/hide";
import nextRun from "./animate/animation/next/run";

import Effect from "./chunk/effect";

import Right from "./chunk/side/right";
import Animates from "./chunk/vo/options/animates";

export default class SideSlider {
  /**
   * Plugin options.
   */
  options: Options = {
    autoplay: {
      active: true,

      reverse: false,

      duration: 3000,

      delay: 1500,

      calculateDelayFromOther: false,

      chain: true,

      delayedStart: {
        disabled: false,

        delay: 10000,
      },
    },

    runner: {
      wait: 100,
      animates: runnerHide,
    },

    next: {
      visible: null,

      optimize: false,

      animates: nextRun,
    },

    client: {
      duration: 750,

      minDuration: 250,

      delay: 325,

      calculateDelayFromOther: false,

      chain: true,

      flexibleClick: true,

      prevent: true,

      speedUp: {
        active: true,

        forceNext: true,
      },

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

      onSwitched: null,

      onClickStart: null,

      onClickFlushed: null,
    },

    timing: linage,

    reverse: reverse,

    animate: Animate,

    optimize: true,
  };

  /**
   * The current element that should be hidden or revealed.
   */
  protected current: HTMLElement | null = null;

  /**
   * The next element after the current one that should be shown or hidden.
   */
  protected next: HTMLElement | null = null;

  /**
   * Specifies whether the element will be shown or hidden.
   */
  protected isReverse: boolean = false;

  /**
   * Internal property that controls autoplay behavior.
   */
  protected autoplay: Autoplay = {
    isFlushed: false,

    reverse: false,

    delayedStart: {
      id: null,
    },

    delayPercent: 0,
    runnerDuration: 0,
    nextDuration: 0,
    runnerAnimations: [],
    nextAnimations: [],
  };

  /**
   * An internal property that controls the interaction between the client and the slider.
   */
  client: Client = {
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
   * A collection of animations by elements that use them.
   */
  protected animations: Map<HTMLElement, Effect> = new Map();

  /**
   * An object to trigger animations to change the next element.
   */
  protected nextSlideItem: NextSlideItem = {
    id: null,

    duration: 0,

    isForced: false,

    startTime: 0,
  };

  /**
   * The direction of the tape movement, depending on the side from which the slider is located.
   */
  protected direction: Side;

  protected windowWidth: number;

  constructor({
    wrapper,
    direction = Right,
    options = undefined,
  }: {
    wrapper: HTMLElement;
    direction: typeof Side;
    options?: Options;
  }) {
    this.direction = new (direction as any)({ wrapper });
    this.windowWidth = globalThis.scrollX + document.documentElement.clientWidth;

    merge(this.options, options || {});
  }

  /**
   * Downloading the configuration and preparing the plugin to work.
   */
  public async boot(): Promise<void> {
    const { next, autoplay: autoplayOptions, client: clientOptions, optimize } = this.options;

    this.attachMutation();

    if (!next.visible) {
      next.visible = this.direction.getItems().reduce((accumulator, item) => {
        const coords = item.getBoundingClientRect();

        return accumulator + (coords.left < this.windowWidth && coords.right > 0 ? 1 : 0);
      }, 0);
    }

    if (isInteger(next.visible) === false) {
      throw new Error("There is something wrong with the visible elements.");
    }

    if (autoplayOptions.active === false && clientOptions.button.prev === null && clientOptions.button.next === null) {
      throw new Error("The tape is not working, autoplay is disabled and no motion handler is passed.");
    }

    if (clientOptions.delay > 0 && clientOptions.flexibleClick === true) {
      this.client.click.delayPercent = 1 - (clientOptions.duration - clientOptions.delay) / clientOptions.duration;
    }

    if (clientOptions.calculateDelayFromOther === true) {
      this.client.click.delayPercent = this.calculateDelayFromOther(autoplayOptions);
    }

    if (autoplayOptions.calculateDelayFromOther === true) {
      this.autoplay.delayPercent = this.calculateDelayFromOther(clientOptions);
    }

    if (autoplayOptions.active === true) {
      if (optimize === true && isVisible(this.direction.getWrapper()) === false) {
        const optimizeAutoplay = () => {
          if (isVisible(this.direction.getWrapper()) === false) {
            setTimeout(optimizeAutoplay, autoplayOptions.duration);

            return;
          }

          this.triggerAutoplay(autoplayOptions.reverse);
        };

        setTimeout(optimizeAutoplay, autoplayOptions.duration);
      } else {
        this.triggerAutoplay(autoplayOptions.reverse);
      }
    }

    if (clientOptions.button.next !== null) {
      clientOptions.button.next.addEventListener("click", () => {
        this.triggerClientClick();
      });
    }
    if (clientOptions.button.prev !== null) {
      clientOptions.button.prev.addEventListener("click", () => {
        this.triggerClientClick(true);
      });
    }
  }

  /**
   * Change the slide change according to the client click settings.
   *
   * @param {boolean} reverse The direction of concealment or manifestation.
   */
  public async triggerClientClick(reverse: boolean = false): Promise<void> {
    const { client: options } = this.options;
    const { click } = this.client;

    if (click.bug.length !== 0 && options.prevent === true) {
      return;
    }

    if (reverse !== click.reverse && click.bug.length !== 0) {
      click.prevent = true;
    }

    let duration = options.duration;
    let delay = options.delay;

    if (options.calculateDelayFromOther === true) {
      delay = duration * this.client.click.delayPercent;
    }

    click.reverse = reverse;

    if (options.flexibleClick === true) {
      let nowTime = performance.now();

      if (click.prevTime === null || nowTime - click.prevTime > options.duration) {
        click.prevTime = performance.now() - options.duration;
      }

      duration = nowTime - click.prevTime;

      click.prevTime = nowTime;
      if (duration < options.minDuration) {
        duration = options.minDuration;
      }

      delay = duration * click.delayPercent;
    }

    this.client.click.bug.push([duration, delay]);

    this.flushClientClick();
  }

  /**
   * Start autoplay accordingly.
   *
   * @param {boolean} reverse The direction of concealment or manifestation.
   */
  public async triggerAutoplay(reverse: boolean = false): Promise<void> {
    const { runner, next, autoplay: options } = this.options;

    options.active = true;
    options.reverse = reverse;

    if (options.calculateDelayFromOther === true) {
      options.delay = options.duration * this.autoplay.delayPercent;
    }

    this.autoplay.nextDuration = options.duration - options.delay;
    this.autoplay.runnerDuration = options.duration;

    this.autoplay.runnerAnimations = [];
    this.autoplay.nextAnimations = [];

    if (this.autoplay.nextDuration <= 0) {
      throw new Error("The wait cannot be greater than/equal to the animation time.");
    }

    if (options.chain === true) {
      this.autoplay.nextDuration = this.autoplay.nextDuration / next.visible!;
    }

    this.parseAnimation(runner, this.autoplay.runnerAnimations, this.autoplay.runnerDuration, options.reverse);
    this.parseAnimation(next, this.autoplay.nextAnimations, this.autoplay.nextDuration);

    this.flushAutoplay();
  }

  /**
   * Stop autoplay.
   */
  public stopAutoplay(): void {
    const options = this.options.autoplay;

    options.active = false;

    if (this.autoplay.delayedStart.id !== null) {
      clearTimeout(this.autoplay.delayedStart.id);
    }
  }

  /**
   * Delay autoplay according to autoplay settings.
   */
  public async delayedAutoplay(): Promise<void> {
    const options = this.options.autoplay;

    if (this.autoplay.delayedStart.id !== null || options.active === true) {
      this.stopAutoplay();

      if (options.delayedStart.disabled === true) {
        return;
      }

      this.autoplay.delayedStart.id = Number(
        setTimeout(() => {
          this.autoplay.delayedStart.id = null;
          options.active = true;

          this.flushAutoplay();
        }, options.delayedStart.delay)
      );
    }
  }

  /**
   * Start the process of changing the next slide.
   */
  protected async nextSlide({
    runnerAnimations,
    nextAnimations,
    runnerDuration,
    nextDuration,
    delay,
    chain,
    isReverse = false,
  }: {
    runnerAnimations: Array<Animate>;
    nextAnimations: Array<Animate>;
    runnerDuration: number;
    nextDuration: number;
    delay: number;
    chain: boolean;
    isReverse: boolean;
  }): Promise<void> {
    if (isReverse !== this.isReverse) {
      this.isReverse = isReverse;

      this.current = null;
    }

    if (this.client.isFlushed === true) {
      const button = this.options.client.button;

      this.options.mutation.onClickStart!(this.client.click.reverse === true ? button.prev! : button.next!);
    }

    this.direction.setReverse(this.isReverse);

    this.current ??= this.direction.getFirstCurrent();
    this.next = this.direction.getNextSibling(this.current);

    if (this.isReverse === false) {
      this.options.mutation.onUnActive!(this.current);
    }

    const items = this.direction.getItems();

    let count = 0;
    let timeout = 0;
    let actives = this.options.next.visible!;
    let total = items.length;
    let unVisibleItems;

    if (this.isReverse === false) {
      timeout += delay;
      unVisibleItems = items.splice(actives, total - actives);
    } else {
      unVisibleItems = items.splice(0, total - actives - 1);
    }

    unVisibleItems.forEach(this.options.mutation.onUnVisible!);

    items.forEach((item) => {
      const next = this.direction.getNextSibling(item);
      if (next === null) {
        if (this.isReverse === true) {
          this.options.mutation.onUnActive!(item);
        }

        return;
      }

      if (this.options.next.optimize === true && isVisible(this.isReverse === true ? next : item) === false) {
        this.options.mutation.onUnVisible!(next);

        return;
      }

      this.options.mutation.onVisible!(next);

      const info = this.direction.getNextInfo({ prev: item, current: next });
      const [animation] = nextAnimations;

      const _animation = <Animate>cloneDeep(animation);

      const nextAnimation = () => {
        if (this.isReverse === false && this.next === next) {
          this.options.mutation.onActive!(this.next);
        }

        _animation.begin(info);
      };

      const animate = () => {
        this.animations.set(
          next,
          new Effect(_animation, timeout, Number(setTimeout(nextAnimation, timeout)), nextAnimation)
        );
      };

      if (chain === false) {
        animate();

        return;
      }

      animate();

      timeout = ++count * nextDuration;

      if (this.isReverse === false) {
        timeout += delay;
      }
    });

    const [animation] = runnerAnimations;
    const _animation = <Animate>cloneDeep(animation);
    const info = this.direction.getRunnerInfo({
      current: this.current,
      shift: this.direction.getShift(),
      windowWidth: this.windowWidth,
    });

    timeout = this.isReverse === true ? delay : 0;
    const currentAnimation = () => {
      this.options.mutation.onRun!(this.current!);

      _animation.begin(info);
    };

    this.animations.set(
      this.current,
      new Effect(_animation, timeout, Number(setTimeout(currentAnimation, timeout)), currentAnimation)
    );

    if (this.isReverse === true) {
      runnerDuration += delay;
    }

    this.nextSlideItem.startTime = performance.now();
    this.nextSlideItem.id = Number(
      setTimeout(() => this.slideItem(), (this.nextSlideItem.duration = runnerDuration + this.options.runner.wait))
    );
  }

  /**
   * Change slide.
   */
  protected slideItem(): void {
    if (this.current === null) {
      throw new Error("There is no current slide to change.");
    }

    this.direction.insert(this.current);

    this.options.mutation.onDone!(this.current);
    if (this.isReverse === true) {
      this.options.mutation.onActive!(this.current);
      this.options.mutation.onVisible!(this.current);
    } else {
      this.options.mutation.onUnVisible!(this.current);
    }

    this.direction.getItems().forEach((item) => {
      this.options.mutation.onSwitched!(item);
    });

    if (this.client.isFlushed === true) {
      const button = this.options.client.button;

      this.options.mutation.onClickFlushed!(this.client.click.reverse === true ? button.prev! : button.next!);
    }

    this.client.isFlushed = false;
    this.autoplay.isFlushed = false;

    this.animations = new Map();
    this.nextSlideItem.isForced = false;

    this.current = this.next;

    this.flushClientClick();
    if (this.options.optimize === true && isVisible(this.direction.getWrapper()) === false) {
      const optimizeAutoplay = () => {
        if (isVisible(this.direction.getWrapper()) === false) {
          setTimeout(optimizeAutoplay, this.options.autoplay.duration);

          return;
        }

        this.flushAutoplay();
      };

      setTimeout(optimizeAutoplay, this.options.autoplay.duration);

      return;
    }
    this.flushAutoplay();
  }

  /**
   * Start the user click processing process.
   */
  protected async flushClientClick(): Promise<void> {
    const { click } = this.client;
    const { next, runner, client: options } = this.options;

    if (click.bug.length === 0 || this.client.isFlushed === true || this.autoplay.isFlushed === true) {
      if (
        options.speedUp.active === true &&
        this.autoplay.isFlushed === true &&
        this.nextSlideItem.isForced === false
      ) {
        this.nextSlideItem.isForced = true;

        const accelerate = this.options.autoplay.duration / options.duration;

        const speedUpRecursive = (next: Animate | null): void => {
          if (next === null) {
            return;
          }

          next.speedUp(accelerate);

          return speedUpRecursive(next.getNext());
        };

        const speedUp = async (effect: Effect) => {
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
        };

        Array.from(this.animations.values()).forEach(speedUp);

        clearTimeout(this.nextSlideItem.id!);

        const passed = performance.now() - this.nextSlideItem.startTime;

        this.nextSlideItem.id = Number(
          setTimeout(() => this.slideItem(), (this.nextSlideItem.duration - passed) / accelerate + 100)
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

    const [duration, delay] = click.bug.shift()!;

    let runnerDuration = duration;
    let nextDuration = duration - delay;

    if (options.chain === true) {
      nextDuration = nextDuration / next.visible!;
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
   * Start the autoplay processing.
   */
  protected async flushAutoplay(): Promise<void> {
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
      isReverse: options.reverse,
    });
  }

  /**
   * Animation parsing.
   */
  parseAnimation(
    subject: Animates<AnimationRunner | AnimationNext>,
    collection: Array<Animate>,
    duration: number,
    isReverse: boolean = false
  ): void {
    if (subject.animates instanceof Function) {
      const timing = isReverse === true ? this.options.reverse(this.options.timing) : this.options.timing;

      const animation = new (this.options.animate as any)({
        duration: duration,
        timing: timing,
        draw: subject.animates,
      });

      collection.unshift(animation);

      return;
    }

    let hasHundred = false;
    const progress = subject.animates.map((item): number => {
      if (item.progress > 100 || item.progress < 0) {
        throw new Error("Progress cannot exceed 100% and be below 0%.");
      }

      if (item.progress === 100) {
        hasHundred = true;
      }

      return item.progress;
    });

    if (hasHundred === false) {
      throw new Error("The animation is not performed 100 percent.");
    }

    if (uniq(progress).length < progress.length) {
      throw new Error("Progress must be unique for each animation.");
    }

    let prevDuration = 0;
    const progressDuration = progress.map((item) => {
      const _duration = (duration / 100) * item - prevDuration;

      prevDuration = (duration / 100) * item;
      return { progress: item, duration: _duration };
    });

    let nextAnimation: Animate | null = null;
    const ordered = <Array<AnimationRunnerArrayObject | AnimationNextArrayObject>>(
      orderBy(subject.animates, ["progress"], [isReverse === true ? "asc" : "desc"])
    );
    ordered.forEach((item): void => {
      const animateConf = progressDuration.find((conf) => conf.progress === item.progress);

      let timing = item.timing || this.options.timing;
      if (isReverse === true) {
        timing = this.options.reverse(timing);
      }

      const animation = new this.options.animate({
        duration: animateConf!.duration,
        timing: timing,
        draw: <AnimationFunction>item.draw,
        next: nextAnimation,
      });

      collection.unshift(animation);

      nextAnimation = animation;
    });
  }

  /**
   * Calculates the delay percentage according to neighboring options.
   */
  protected calculateDelayFromOther(options: CalculateDelay): number {
    if (options.calculateDelayFromOther === true) {
      throw new Error(
        "It is not possible to automatically determine the delay for a click because the autoplay data is click dependent."
      );
    }

    if (!options.delay || !options.duration) {
      throw new Error("It is not possible to automatically determine the click delay due to lack of data.");
    }

    return 1 - (options.duration - options.delay) / options.duration;
  }

  /**
   * Create default or add custom mutations for elements.
   */
  protected attachMutation(): void {
    const { mutation } = this.options;

    mutation.onRun ??= function (item) {
      item.classList.add("is-runner");
    };

    mutation.onDone ??= function (item) {
      item.classList.remove("is-runner");
    };

    mutation.onActive ??= function (item) {
      item.classList.add("is-active");
    };

    mutation.onUnActive ??= function (item) {
      item.classList.remove("is-active");
    };

    mutation.onVisible ??= function (item) {
      item.classList.add("is-visible");
    };

    mutation.onUnVisible ??= function (item) {
      item.classList.remove("is-visible");
    };

    mutation.onSwitched ??= function (item) {
      item.removeAttribute("style");
    };

    mutation.onClickStart ??= function (item) {
      item.classList.add("is-click");
    };

    mutation.onClickFlushed ??= function (item) {
      item.classList.remove("is-click");
    };

    const keys = Object.getOwnPropertyNames(mutation);

    if (keys!.every((item) => mutation[item as keyof typeof mutation] instanceof Function)) {
      throw new Error("Mutations must be functions.");
    }
  }
}

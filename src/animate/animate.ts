import { type AnimationFunction, type TimingFunction } from "../types/side-slider";
import RunnerInfo from "../chunk/info/runner/info";
import NextInfo from "../chunk/info/next/info";

export default class Animate {
  protected duration: number;
  protected timing: TimingFunction;
  protected draw: AnimationFunction;
  protected next: Animate | null;

  protected prevTF: number = 0;
  protected accelerate: number = 0;
  protected start: number = 0;
  protected timeFraction: number = 0;

  protected isFinished: boolean = false;
  protected isStarted: boolean = false;
  protected isStop: boolean = false;

  protected rafId: number | null = null;

  constructor({
    duration,
    timing,
    draw,
    next = null,
  }: {
    duration: number;
    timing: TimingFunction;
    draw: AnimationFunction;
    next?: Animate | null;
  }) {
    this.duration = duration;
    this.timing = timing;
    this.draw = draw;
    this.next = next;
  }

  /**
   * Launch the animation at the start of the tape.
   */
  public async begin(info: RunnerInfo | NextInfo): Promise<void> {
    this.isStop = false;
    this.start = performance.now();

    this.rafId = requestAnimationFrame(this.animation.bind(this, info));
  }

  /**
   * Pause animation.
   */
  public wait(): void {
    if (this.isStop === true) {
      throw new Error("The animation is currently paused.");
    }

    this.isStop = true;
  }

  /**
   * Continue the animation from the moment the pause was made.
   */
  public continue(info: RunnerInfo | NextInfo): void {
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
  public speedUp(percent: number): void {
    this.accelerate = percent;
  }

  /**
   * Has this animation finished.
   */
  public isFinish(): boolean {
    return this.isFinished === true;
  }

  /**
   * Has this animation started.
   */
  public isStart(): boolean {
    return this.isStarted === true;
  }

  /**
   * Return the next animation that will be launched after this one.
   */
  public getNext(): Animate | null {
    return this.next;
  }

  /**
   * Private element animation calculation function.
   */
  animation(info: RunnerInfo | NextInfo, time: number): void {
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
    } else {
      this.isFinished = true;

      if (this.next !== null) {
        this.next.speedUp(this.accelerate);
        this.next.begin(info);
      }
    }
  }
}

import { type SimpleFunction } from "../types/side-slider";
import Animate from "../animate/animate";

export default class Effect {
  protected time: number;

  constructor(
    protected animation: Animate,
    protected timeout: number,
    protected timeoutId: number,
    protected func: SimpleFunction
  ) {
    this.time = performance.now();
  }

  /**
   * Return added animation.
   */
  public getAnimation(): Animate {
    return this.animation;
  }

  /**
   * Does this have a time delay effect.
   */
  public hasTimeout(): boolean {
    return this.timeout > 0;
  }

  /**
   * Return the new delay for the animation.
   */
  public getTimeout(accelerate: number): number {
    const passed = performance.now() - this.time;

    return (this.timeout - passed) / accelerate;
  }

  /**
   * Return the setTimeout ID.
   */
  public getTimeoutId(): number {
    return this.timeoutId;
  }

  /**
   * Return effect function.
   */
  public getFunc(): SimpleFunction {
    return this.func;
  }
}

import Animate from "../../animate/animate";

export default interface Autoplay {
  /**
   * Determines whether autoplay has completed its work on this circuit
   */
  isFlushed: boolean;
  /**
   * Specifies whether the element is shown or hidden in autoplay
   */
  reverse: boolean;
  /**
   * Percentage of total autoplay lap loss time to determine latency
   */
  delayPercent: number;
  /**
   * Delayed loading object
   */
  delayedStart: {
    /**
     * The ID of the delayed start
     */
    id: number | null;
  };
  /**
   * The animation time of the main element
   */
  runnerDuration: number;
  /**
   * List of main element animations
   */
  runnerAnimations: Array<Animate>;
  /**
   * The animation time of the ribbon of neighboring elements from the main element
   */
  nextDuration: number;
  /**
   * List of animations of neighboring elements
   */
  nextAnimations: Array<Animate>;
}

export default interface Click {
  /**
   * A click data object.
   */
  prevent: boolean;
  /**
   * List of animation times by clicks.
   */
  bug: Array<[number, number]>;
  /**
   * The time when the previous click was made, required to accelerate clicks.
   */
  prevTime: number | null;
  /**
   * A percentage of the total time of the click cycle loss to determine the delay.
   */
  delayPercent: number;
  /**
   * In which direction the click was made.
   */
  reverse: boolean;
}

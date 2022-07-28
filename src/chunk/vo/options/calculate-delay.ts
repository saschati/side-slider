export default interface CalculateDelay {
  /**
   * Determines whether to count the delay from the user's click option.
   */
  readonly calculateDelayFromOther: boolean;
  /**
   * Determines the speed of change of the element in autoplay.
   */
  readonly duration: number;
  /**
   * Delay for neighboring elements before taking the place of the change element.
   */
  readonly delay: number;
}

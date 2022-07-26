import CalculateDelay from "./calculate-delay";

export default interface Autoplay extends CalculateDelay {
  /**
   * Determines whether to start autoplay when the plugin is loaded
   */
  active: boolean;
  /**
   * Defines the direction in which autoplay should act by default from the first element to the end
   */
  reverse: boolean;
  /**
   * Determines the speed of change of the element in autoplay
   */
  duration: number;
  /**
   * Delay for neighboring elements before taking the place of the change element
   */
  delay: number;
  /**
   * As the elements should shift by default each element separately,
   * the time after the delay is divided between
   */
  chain: boolean;
  /**
   * Option to pause autoplay after last click
   */
  delayedStart: {
    /**
     * Whether to stop forever when one of the buttons was clicked
     */
    disabled: boolean;
    /**
     * Timeout for a new autoplay start after the last click
     */
    delay: number;
  };
}

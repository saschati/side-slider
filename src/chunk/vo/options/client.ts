import CalculateDelay from "./calculate-delay";

export default interface Client extends CalculateDelay {
  /**
   * Determines the speed of change of the element in click
   */
  duration: number;
  /**
   * Defines the minimum speed at which autoplay can work
   */
  minDuration: number;
  /**
   * Delay for neighboring elements before taking the place of the change element
   */
  delay: number;
  /**
   * As the elements should shift by default each element separately,
   * the time after the delay is divided between prominent elements
   */
  chain: boolean;
  /**
   * This field determines whether the playback speed will be calculated according to the speed
   * of pressing the buttons
   */
  flexibleClick: boolean;
  /**
   * Indicates that there can be only one animation per click, otherwise clicks will accumulate,
   * and release until the pressure is stopped or the other side of the change is chosen
   */
  prevent: boolean;
  /**
   * Specifies whether to speed up the animation
   */
  speedUp: {
    /**
     * If the value is active, then when you click,
     * the autoplay animation will accelerate to the speed of the click, otherwise,
     * the click will start only after the autoplay animation ends
     */
    active: boolean;
    /**
     * Specifies whether, when clicking on the scroll button,
     * autoplay should also perform a click after acceleration is complete
     * otherwise, the first click will simply accelerate the autoplay animation itself to its completion
     */
    forceNext: boolean;
  };
  /**
   * Ribbon controls object from the client
   */
  button: {
    /**
     * Control button for reverse change
     */
    prev: HTMLElement | null;
    /**
     * Control button for scrolling
     */
    next: HTMLElement | null;
  };
}

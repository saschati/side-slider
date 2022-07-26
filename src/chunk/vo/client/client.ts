import Click from "./click";
import Animate from "../../../animate/animate";

export default interface Client {
  /**
   * Determines whether the work of clicks to the client has been completed
   */
  isFlushed: boolean;
  /**
   * A click data object
   */
  click: Click;
  /**
   * List of main element animations
   */
  runnerAnimations: Array<Animate>;
  /**
   * List of animations of neighboring elements
   */
  nextAnimations: Array<Animate>;
}

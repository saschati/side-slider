import Animates from "./animates";
import { type AnimationRunner } from "../../../types/side-slider";

export default interface Runner extends Animates<AnimationRunner> {
  /**
   * A delay for the entire loop so that the animation ends before the parent element changes loop.
   */
  readonly wait: number;
}

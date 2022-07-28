import Animates from "./animates";
import { type AnimationNext } from "../../../types/side-slider";

export default interface Next extends Animates<AnimationNext> {
  /**
   * The number of visible elements of the tape to divide the time between them if the option chain=true,
   * calculated automatically by default.
   */
  visible: null | number;
  /**
   * Optimize the switching process by performing it only when the user sees it, only for next items.
   */
  readonly optimize: boolean;
}

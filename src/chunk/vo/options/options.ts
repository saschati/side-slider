import { type TimingFunction } from "../../../types/side-slider";
import Autoplay from "./autoplay";
import Client from "./client";
import Next from "./next";
import Runner from "./runner";
import Mutation from "./mutation";
import Animate from "../../../animate/animate";

export default interface Options {
  /**
   * Autoplay field.
   */
  autoplay: Autoplay;
  /**
   * Options for the element that should be hidden and placed at the end/beginning according to the direction.
   */
  runner: Runner;
  /**
   * Options of adjacent elements that make the ribbon move.
   */
  next: Next;
  /**
   * Client click options.
   */
  client: Client;
  /**
   * A mutation object that is responsible for customizing an element on pseudo events.
   */
  mutation: Mutation;
  /**
   * Time function.
   */
  timing: TimingFunction;
  /**
   * Reversible time function.
   */
  reverse: (timing: TimingFunction) => TimingFunction;
  /**
   * A class for working with animations.
   */
  animate: typeof Animate;
  /**
   * Optimize the switching process by performing it only when the user sees it.
   */
  optimize: boolean;
}

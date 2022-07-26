import { type MutationFunction } from "../../../types/side-slider";

export default interface Mutation {
  /**
   * Mutation when moving an element to/from the end
   */
  onRun: MutationFunction | null;
  /**
   * Mutation at the end of the movement of the element to/from the end
   */
  onDone: MutationFunction | null;
  /**
   * A mutation for an existing active element that is considered the first in the list
   */
  onActive: MutationFunction | null;
  /**
   * Mutation when the element ceases to be the first and goes to the onRun mutation
   */
  onUnActive: MutationFunction | null;
  /**
   * Mutation when the element appears in the user's field of view
   */
  onVisible: MutationFunction | null;
  /**
   * Mutation when the element disappears from the user's field of view
   */
  onUnVisible: MutationFunction | null;
  /**
   * Mutation when a path was traversed by one element and it switched
   */
  onSwitched: MutationFunction | null;

  /**
   * Mutation for the control element when pressed and starting the animation
   */
  onClickStart: MutationFunction | null;
  /**
   * Mutation for a control element when a path has been traversed by one element and it has switched
   */
  onClickFlushed: MutationFunction | null;
}

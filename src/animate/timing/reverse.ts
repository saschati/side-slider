import { TimingFunction } from "../../types/side-slider.d";

/**
 * Reverses the passed time function.
 */
export default function reverse(timing: TimingFunction): TimingFunction {
  return function (timeFraction) {
    return timing(1 - timeFraction);
  };
}

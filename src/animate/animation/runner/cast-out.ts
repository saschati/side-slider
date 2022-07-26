import { type AnimationRunnerFunction } from "../../../types/side-slider";

import round from "lodash/round";
import percent from "../../helpers/percent";

import Info from "../../../chunk/info/runner/info";

/**
 * @param {boolean} right The direction in which to throw the element.
 */
export default function (right: boolean = true): AnimationRunnerFunction {
  let minus = right ? "" : "-";

  /**
   * Element throwing animation.
   */
  return function castOut(info: Info, progress: number): void {
    const rotate = round(progress * (360 * 4));
    const y = progress * info.getHorizon();
    let x = progress * info.getHorizon();

    if (info.isReverse() === true) {
      x += Math.abs(info.getReverseFinishedPosition());
    }

    info.getCurrent().style.transform = `translate(${minus}${x}px, ${y}px) rotate(${minus}${rotate}deg) `;
    info.getCurrent().style.opacity = `${percent(progress, 3)}`;
  };
}

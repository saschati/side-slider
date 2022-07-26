import Info from "../../../chunk/info/runner/info";

import percent from "../../helpers/percent";

/**
 * Right shift animation.
 */
export default function right(info: Info, progress: number): void {
  let x = progress * info.getHorizon();

  x += info.getReverseFinishedPosition();

  info.getCurrent().style.transform = `translate(${x}px, 0)`;
  info.getCurrent().style.opacity = `${percent(progress, 3)}`;
}

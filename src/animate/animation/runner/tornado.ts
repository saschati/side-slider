import Info from "../../../chunk/info/runner/info";

import round from "lodash/round";
import percent from "../../helpers/percent";

/**
 * Tornado effect animation for element.
 */
export default function tornado(info: Info, progress: number): void {
  const rotate = round(progress * (360 * (progress * 15)));

  info.getCurrent().style.transform = `translate(${info.getReverseFinishedPosition()}px, 0) rotateY(-${rotate}deg) `;

  if (progress > 0.5) {
    info.getCurrent().style.opacity = `${percent(progress, 3)}`;
  } else if (progress > 0.2) {
    info.getCurrent().style.opacity = `${percent(progress - 0.2, 3)}`;
  }
}

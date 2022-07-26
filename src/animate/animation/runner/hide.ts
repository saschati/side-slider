import Info from "../../../chunk/info/runner/info";

import percent from "../../helpers/percent";

/**
 * Animation of hiding an element.
 */
export default function hide(info: Info, progress: number): void {
  info.getCurrent().style.opacity = `${percent(progress, 3)}`;
  info.getCurrent().style.transform = `translate(${info.getReverseFinishedPosition()}px, 0)`;
}

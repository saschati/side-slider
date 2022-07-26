import percent from "../../helpers/percent";

import Info from "../../../chunk/info/runner/info";

/**
 * Animation of lowering an element to the bottom.
 */
export default function down(info: Info, progress: number): void {
  const y = progress * info.getHorizon();
  const x = info.getReverseFinishedPosition();

  info.getCurrent().style.transform = `translate(${x}px, ${y}px)`;
  info.getCurrent().style.opacity = `${percent(progress, 3)}`;
}

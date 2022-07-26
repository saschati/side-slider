import percent from "../../helpers/percent";

import run from "./run";

import linage from "../../timing/linage";
import reverse from "../../timing/reverse";

import Info from "../../../chunk/info/next/info";

/**
 * Animation of hiding an element
 */
function hide(info: Info, progress: number): void {
  info.getCurrent().style.opacity = `${percent(progress)}`;
}

export default [
  {
    progress: 40,
    draw: hide,
  },
  {
    progress: 50,
    draw: run,
  },
  {
    progress: 100,
    timing: reverse(linage),
    draw: hide,
  },
];

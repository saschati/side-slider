import percent from "../../helpers/percent";

import linage from "../../timing/linage";
import reverse from "../../timing/reverse";

import Info from "../../../chunk/info/next/info";

export default [
  {
    progress: 50,
    /**
     * Element reduction animation.
     */
    draw: function (info: Info, progress: number): void {
      info.getCurrent().style.transform = `scale(-${percent(progress)})`;
    },
  },
  {
    progress: 100,
    timing: reverse(linage),
    /**
     * Animation of increasing the element at the end point.
     */
    draw: function (info: Info, progress: number): void {
      info.getCurrent().style.transform = `translate(${info.getSiblingDistance()}px, 0) scale(-${percent(progress)})`;
    },
  },
];

import round from "lodash/round";
import hide from "./hide";

/**
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default function tornado(info, progress) {
    const rotate = round((progress * (360 * (progress * 15))));

    info.getCurrent().style.transform = `rotateY(-${rotate}deg) `;

    if (progress > .5) {
        hide(info, progress);
    } else if (progress > .2) {
        hide(info, (progress - .2));
    }
}
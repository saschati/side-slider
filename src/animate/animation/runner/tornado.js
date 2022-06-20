import round from "lodash/round";
import percent from "../../helpers/percent";

/**
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default function tornado(info, progress) {
    const rotate = round((progress * (360 * (progress * 15))));

    info.getCurrent().style.transform = `translate(${info.getReverseFinishedPosition()}px, 0) rotateY(-${rotate}deg) `;

    if (progress > .5) {
        info.getCurrent().style.opacity = percent(progress, 3);
    } else if (progress > .2) {
        info.getCurrent().style.opacity = percent((progress - .2), 3);
    }
}
import percent from "../../helpers/percent";

/**
 * Animation of hiding an element
 *
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default function hide(info, progress) {
    info.getCurrent().style.opacity = percent(progress, 3);
    info.getCurrent().style.transform = `translate(${info.getReverseFinishedPosition()}px, 0)`;
}
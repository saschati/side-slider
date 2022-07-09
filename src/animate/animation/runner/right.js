import percent from "../../helpers/percent";

/**
 * Right shift animation
 *
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default function right(info, progress) {
    let x = (progress * info.getHorizon());

    x += info.getReverseFinishedPosition();

    info.getCurrent().style.transform = `translate(${x}px, 0)`;
    info.getCurrent().style.opacity = percent(progress, 3);
}
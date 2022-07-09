import percent from "../../helpers/percent";

/**
 * Uphill animation
 *
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default function up(info, progress) {
    const y = (progress * info.getHorizon());
    const x = info.getReverseFinishedPosition();

    info.getCurrent().style.transform = `translate(${x}px, -${y}px)`;
    info.getCurrent().style.opacity = percent(progress, 3);
}
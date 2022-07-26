import percent from "../../helpers/percent";
/**
 * Element reduction animation.
 */
export default function scale(info, progress) {
    info.getCurrent().style.transform = `translate(${info.getReverseFinishedPosition()}px, 0) scale(-${percent(progress, 3)})`;
}

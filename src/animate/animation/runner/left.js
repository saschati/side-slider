import percent from "../../helpers/percent";
/**
 * Left shift animation.
 */
export default function left(info, progress) {
    let x = -(progress * info.getHorizon());
    x += info.getReverseFinishedPosition();
    info.getCurrent().style.transform = `translate(${x}px, 0)`;
    info.getCurrent().style.opacity = `${percent(progress, 3)}`;
}

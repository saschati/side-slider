import percent from "../../helpers/percent";
/**
 * Animation of lowering an element to the bottom.
 */
export default function down(info, progress) {
    const y = progress * info.getHorizon();
    const x = info.getReverseFinishedPosition();
    info.getCurrent().style.transform = `translate(${x}px, ${y}px)`;
    info.getCurrent().style.opacity = `${percent(progress, 3)}`;
}

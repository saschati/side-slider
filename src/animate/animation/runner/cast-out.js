import round from "lodash/round";
import percent from "../../helpers/percent";
/**
 * @param right The direction in which to throw the element.
 */
export default function (right = true) {
    let minus = right ? "" : "-";
    /**
     * Element throwing animation.
     */
    return function castOut(info, progress) {
        const rotate = round(progress * (360 * 4));
        const y = progress * info.getHorizon();
        let x = progress * info.getHorizon();
        if (info.isReverse() === true) {
            x += Math.abs(info.getReverseFinishedPosition());
        }
        info.getCurrent().style.transform = `translate(${minus}${x}px, ${y}px) rotate(${minus}${rotate}deg) `;
        info.getCurrent().style.opacity = `${percent(progress, 3)}`;
    };
}

import round from "lodash/round";
import percent from "../../helpers/percent";

export default function (right = true) {
    let minus = right ? '' : '-';

    /**
     * @param {Info} info
     * @param {number} progress
     *
     * @return {void}
     */
    return function castOut(info, progress) {
        const rotate = round((progress * (360 * 4)));
        const y = (progress * info.getHorizon());
        let x = (progress * info.getHorizon());

        if (info.isReverse() === true) {
            x += Math.abs(info.getReverseFinishedPosition());
        }

        info.getCurrent().style.transform = `translate(${minus}${x}px, ${y}px) rotate(${minus}${rotate}deg) `;
        info.getCurrent().style.opacity = percent(progress, 3);
    }
}

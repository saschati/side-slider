import round from "lodash/round";
import hide from "./hide";

export default function (right = true) {
    const minus = right ? '' : '-';

    /**
     * @param {Info} info
     * @param {number} progress
     *
     * @return {void}
     */
    return function castOut(info, progress) {
        const rotate = round((progress * (360 * 4)));
        const x = (progress * info.getHorizon());
        const y = (progress * info.getHorizon());

        info.getCurrent().style.transform = `translate(${minus}${x}px, ${y}px) rotate(${minus}${rotate}deg) `;

        hide(info, progress);
    }
}

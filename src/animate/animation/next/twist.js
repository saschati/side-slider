import round from "lodash/round";
import linage from "../../timing/linage";
import reverse from "../../timing/reverse";
/**
 * The function of calculating the degree to which a turn should be made.
 */
function rotate(progress) {
    return round(progress * 90);
}
export default [
    {
        progress: 50,
        /**
         * Turn 90 degrees.
         */
        draw: function (info, progress) {
            info.getCurrent().style.transform = `rotateY(${rotate(progress)}deg)`;
        },
    },
    {
        progress: 100,
        timing: reverse(linage),
        /**
         * Turn from 90 degrees to 0.
         */
        draw: function (info, progress) {
            info.getCurrent().style.transform = `translate(${info.getSiblingDistance()}px, 0) rotateY(-${rotate(progress)}deg)`;
        },
    },
];

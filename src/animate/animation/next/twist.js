import round from 'lodash/round';

import linage from "../../timing/linage";
import reverse from "../../timing/reverse";

/**
 * The function of calculating the degree to which a turn should be made
 *
 * @param {number} progress
 *
 * @return {*}
 */
function rotate(progress) {
    return round((progress * 90));
}

export default [
    {
        progress: 50,
        /**
         * Turn 90 degrees
         *
         * @param {Info} info
         * @param {number} progress
         *
         * @return {void}
         */
        draw: function (info, progress) {
            info.getCurrent().style.transform = `rotateY(${rotate(progress)}deg)`;
        },
    },
    {
        progress: 100,
        timing: reverse(linage),
        /**
         * Turn from 90 degrees to 0
         *
         * @param {Info} info
         * @param {number} progress
         *
         * @return {void}
         */
        draw: function (info, progress) {
            info.getCurrent().style.transform = `translate(${info.getSiblingDistance()}px, 0) rotateY(-${rotate(progress)}deg)`;
        },
    }
];
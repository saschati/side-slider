import round from 'lodash/round';

import linage from "../../timing/linage";
import reverse from "../../timing/reverse";

function rotate(progress) {
    return round((progress * 90));
}

export default [
    {
        progress: 50,
        /**
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
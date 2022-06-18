import round from 'lodash/round';

import linage from "../../timing/linage";
import reverse from "../../timing/reverse";

function scale(progress) {
    let size = round((((progress * 100) / 100)), 2);

    if (size > 1) {
        size = 1;
    }

    if (size < 0) {
        size = 0;
    }

    return (1 - size);
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
            info.getCurrent().style.transform = `scale(-${scale(progress)})`;
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
            info.getCurrent().style.transform = `translate(${info.getSiblingDistance()}px, 0) scale(-${scale(progress)})`;
        },
    }
];
import round from 'lodash/round';
import percent from "../../helpers/percent";

import linage from "../../timing/linage";
import reverse from "../../timing/reverse";

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
            info.getCurrent().style.transform = `scale(-${percent(progress)})`;
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
            info.getCurrent().style.transform = `translate(${info.getSiblingDistance()}px, 0) scale(-${percent(progress)})`;
        },
    }
];
import round from 'lodash/round';
import percent from "../../helpers/percent";

import run from "./run";

import linage from "../../timing/linage";
import reverse from "../../timing/reverse";

/**
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
function hide(info, progress) {
    info.getCurrent().style.opacity = percent(progress);
}

/**
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default [
    {
        progress: 40,
        draw: hide,
    },
    {
        progress: 50,
        draw: run,
    },
    {
        progress: 100,
        timing: reverse(linage),
        draw: hide,
    }
];
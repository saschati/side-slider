import round from 'lodash/round';

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
    let opacity = round((((progress * 100) / 100)), 2);

    if (opacity > 1) {
        opacity = 1;
    }

    if (opacity < 0) {
        opacity = 0;
    }

    opacity = 1 - opacity;

    info.getCurrent().style.opacity = `${opacity}`;
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
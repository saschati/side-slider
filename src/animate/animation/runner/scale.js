import round from "lodash/round";

/**
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default function scale(info, progress) {
    let scale = round((((progress * 300) / 100)), 2);

    if (scale > 1) {
        scale = 1;
    }

    if (scale < 0) {
        scale = 0;
    }

    scale = 1 - scale;

    info.getCurrent().style.transform = `scale(-${scale})`;
}
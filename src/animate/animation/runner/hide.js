import round from 'lodash/round';

/**
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default function hide(info, progress) {
    let opacity = round((((progress * (100 * 3)) / 100)), 2);

    if (opacity > 1) {
        opacity = 1;
    }

    opacity = 1 - opacity;

    info.getCurrent().style.opacity = `${opacity}`;
}
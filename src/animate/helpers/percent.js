import round from "lodash/round";

/**
 * Calculates the percentage from 0.00 to 1
 *
 * @param {number} progress The number is not a stable format
 * @param {number} n Power
 *
 * @return {number}
 */
export default function percent(progress, n = 1) {
    let percent = round((((progress * (100 * n)) / 100)), 2);

    if (percent > 1) {
        percent = 1;
    }

    if (percent < 0) {
        percent = 0;
    }

    return (1 - percent);
}
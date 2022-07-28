/**
 * Reverses the passed time function.
 */
export default function reverse(timing) {
    return function (timeFraction) {
        return timing(1 - timeFraction);
    };
}

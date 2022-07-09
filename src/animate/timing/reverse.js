/**
 * Reverses the passed time function
 *
 * @param {function} timing
 *
 * @return {function(*)}
 */
export default function reverse(timing) {
    return function(timeFraction) {
        return timing(1 - timeFraction);
    }
}
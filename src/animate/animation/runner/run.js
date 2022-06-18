/**
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default function run(info, progress) {
    info.getCurrent().style.transform = `translate(${progress * info.getHorizon()}px, 0)`;
}
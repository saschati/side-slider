import hide from "./hide";


/**
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default function down(info, progress) {
    info.getCurrent().style.transform = `translate(0, ${progress * info.getHorizon()}px)`;

    hide(info, progress);
}
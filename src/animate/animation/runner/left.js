import hide from './hide';

/**
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default function left(info, progress) {
    info.getCurrent().style.transform = `translate(-${progress * info.getHorizon()}px, 0)`;

    hide(info, progress);
}
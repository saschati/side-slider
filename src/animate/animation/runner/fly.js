import round from 'lodash/round';

export default function (right = false) {
    let height;
    let left;
    let rotate;

    const retreat = right ? '-' : '';
    const move = right ? '' : '-';

    /**
     * @param {Info} info
     * @param {number} progress
     *
     * @return {void}
     */
    function fly(info, progress) {
        height = round((progress * info.getCurrent().offsetHeight));
        left = round((progress * 50));
        rotate = round((progress * 90));

        info.getCurrent().style.transform = `translate(${retreat}${left}px, ${height}px) rotate(${rotate}deg)`;
    }

    /**
     * @param {Info} info
     * @param {number} progress
     *
     * @return {void}
     */
    function run(info, progress) {
        const x = (progress * (info.getHorizon() + info.getCurrent().offsetHeight));

        info.getCurrent().style.transform = `translate(${move}${x - left}px, ${height}px) rotate(${rotate}deg)`;
    }

    return [
        {
            progress: 20,
            draw: fly,
        },
        {
            progress: 100,
            draw: run
        }
    ]
};
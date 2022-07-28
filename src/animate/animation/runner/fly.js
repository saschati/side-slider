import round from "lodash/round";
/**
 * @param right Flight direction.
 */
export default function (right = true) {
    const move = right ? "" : "-";
    /**
     * Animation of preparation for flight of an element.
     */
    function fly(info, progress) {
        let height = round(progress * info.getCurrent().offsetHeight);
        let rotate = round(progress * 90);
        let x = info.getReverseFinishedPosition();
        info.getCurrent().style.transform = `translate(${x}px, ${height}px) rotate(${rotate}deg)`;
    }
    /**
     * Flight animation.
     */
    function run(info, progress) {
        let x = progress * (info.getHorizon() + info.getCurrent().offsetHeight);
        let height = info.getCurrent().offsetHeight;
        if (info.isReverse() === true) {
            x -= info.getHorizon();
            x += info.getHorizonHideDistance();
        }
        let _move = move;
        if (x < 0 && right === false) {
            _move = "";
            x = Math.abs(x);
        }
        info.getCurrent().style.transform = `translate(${_move}${x}px, ${height}px) rotate(90deg)`;
    }
    return [
        {
            progress: 20,
            draw: fly,
        },
        {
            progress: 100,
            draw: run,
        },
    ];
}

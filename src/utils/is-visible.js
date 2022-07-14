/**
 * Check whether the user can see this element.
 *
 * @param {HTMLElement} item
 *
 * @return {boolean}
 *
 * @private
 */
export default function isVisible(item) {
    const coords = item.getBoundingClientRect();

    const position = {
        item: {
            top: (global.pageYOffset + coords.top),
            left: (global.pageXOffset + coords.left),
            right: (global.pageXOffset + coords.right),
            bottom: (global.pageYOffset + coords.bottom)
        },
        window: {
            top: global.pageYOffset,
            left: global.pageXOffset,
            right: (global.pageXOffset + document.documentElement.clientWidth),
            bottom: (global.pageYOffset + document.documentElement.clientHeight)
        }
    };

    return (position.item.bottom > position.window.top) &&
        (position.item.top < position.window.bottom) &&
        (position.item.right > position.window.left) &&
        (position.item.left < position.window.right);
}
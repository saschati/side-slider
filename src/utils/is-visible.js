/**
 * Check whether the user can see this element.
 */
export default function isVisible(item) {
    const coords = item.getBoundingClientRect();
    const position = {
        item: {
            top: globalThis.scrollY + coords.top,
            left: globalThis.scrollX + coords.left,
            right: globalThis.scrollX + coords.right,
            bottom: globalThis.scrollY + coords.bottom,
        },
        window: {
            top: globalThis.scrollY,
            left: globalThis.scrollX,
            right: globalThis.scrollX + document.documentElement.clientWidth,
            bottom: globalThis.scrollY + document.documentElement.clientHeight,
        },
    };
    return (position.item.bottom > position.window.top &&
        position.item.top < position.window.bottom &&
        position.item.right > position.window.left &&
        position.item.left < position.window.right);
}

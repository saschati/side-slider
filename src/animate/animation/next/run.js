/**
 * Animation of element displacement to the end point.
 */
export default function run(info, progress) {
    const distance = info.getSiblingDistance();
    info.getCurrent().style.transform = `translate(${progress * distance}px, 0)`;
}

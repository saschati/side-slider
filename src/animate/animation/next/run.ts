import Info from "../../../chunk/info/next/info";

/**
 * Animation of element displacement to the end point
 *
 * @param {Info} info
 * @param {number} progress
 *
 * @return {void}
 */
export default function run(info: Info, progress: number): void {
  const distance = info.getSiblingDistance();

  info.getCurrent().style.transform = `translate(${progress * distance}px, 0)`;
}

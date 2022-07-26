import Info from "./info";

export default class RightInfo extends Info {
  protected siblingDistance: number;

  constructor({ prev, current, reverse }: { prev: HTMLElement; current: HTMLElement; reverse: boolean }) {
    super({ prev, current, reverse });

    this.siblingDistance = -(
      this.current.offsetWidth +
      this.current.offsetLeft -
      (this.prev.offsetWidth + this.prev.offsetLeft)
    );
  }

  /**
   * @return {number}
   */
  public getSiblingDistance(): number {
    return this.siblingDistance;
  }
}

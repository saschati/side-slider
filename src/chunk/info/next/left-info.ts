import Info from "./info";

export default class LeftInfo extends Info {
  protected siblingDistance: number;

  constructor({ prev, current, reverse }: { prev: HTMLElement; current: HTMLElement; reverse: boolean }) {
    super({ prev, current, reverse });

    this.siblingDistance =
      this.prev.offsetWidth + this.prev.offsetLeft - (this.current.offsetWidth + this.current.offsetLeft);
  }

  public getSiblingDistance(): number {
    return this.siblingDistance;
  }
}

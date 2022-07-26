import Info from "./info";

export default class LeftInfo extends Info {
  protected distance: number;
  protected horizon: number;
  protected horizonHideDistance: number = 0;
  protected reverseFinishedPosition: number = 0;

  constructor({
    current,
    shift,
    windowWidth,
    reverse,
  }: {
    current: HTMLElement;
    shift: HTMLElement;
    windowWidth: number;
    reverse: boolean;
  }) {
    super({ current, shift, windowWidth, reverse });

    if (this.reverse === true) {
      this.horizon = shift.getBoundingClientRect().right;
      this.distance = shift.offsetLeft + shift.offsetWidth - (current.offsetLeft + current.offsetWidth);

      this.horizonHideDistance = current.getBoundingClientRect().right;
      this.reverseFinishedPosition = this.distance;
    } else {
      this.horizon = current.getBoundingClientRect().right;
      this.distance = current.offsetLeft + current.offsetWidth - (shift.offsetLeft + shift.offsetWidth);
    }
  }

  public getDistance(): number {
    return this.distance;
  }

  public getHorizon(): number {
    return this.horizon;
  }

  public getHorizonHideDistance(): number {
    return this.horizonHideDistance;
  }

  public getReverseFinishedPosition(): number {
    return this.reverseFinishedPosition;
  }
}

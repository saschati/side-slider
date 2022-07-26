import Info from "./info";

export default class RightInfo extends Info {
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

    this.horizonHideDistance = 0;
    this.reverseFinishedPosition = 0;

    if (this.reverse === true) {
      this.horizon = this.windowWidth - shift.getBoundingClientRect().left;
      this.distance = this.current.offsetLeft - shift.offsetLeft;

      this.horizonHideDistance = this.windowWidth - current.getBoundingClientRect().left;
      this.reverseFinishedPosition -= this.distance;
    } else {
      this.horizon = this.windowWidth - current.getBoundingClientRect().left;
      this.distance = shift.offsetLeft - this.current.offsetLeft;
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

export default abstract class Info {
  protected current: HTMLElement;
  protected shift: HTMLElement;
  protected windowWidth: number;
  protected reverse: boolean;

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
    this.current = current;
    this.shift = shift;
    this.windowWidth = windowWidth;
    this.reverse = reverse;
  }

  /**
   * Get the full distance from the first element to the last.
   */
  public abstract getDistance(): number;

  /**
   * Get the distance from the first element to the beginning of the horizon.
   */
  public abstract getHorizon(): number;

  /**
   * Get the distance between the horizon and the hidden part to the main element.
   */
  public abstract getHorizonHideDistance(): number;

  /**
   * Get the final position to manifest in place of the main element.
   */
  public abstract getReverseFinishedPosition(): number;

  /**
   * Get the current parent element.
   */
  public getCurrent(): HTMLElement {
    return this.current;
  }

  /**
   * Get the neighboring element that will shift to the main one.
   */
  public getShift(): HTMLElement {
    return this.shift;
  }

  /**
   * Is this operation hide/unhidden.
   */
  public isReverse(): boolean {
    return this.reverse === true;
  }
}

import NextInfo from "../info/next/info";
import RunnerInfo from "../info/runner/info";

export default abstract class Side {
  protected reverse: boolean = false;

  constructor(protected wrapper: HTMLElement) {}

  /**
   * Get information on the main element.
   */
  public abstract getRunnerInfo({
    current,
    shift,
    windowWidth,
  }: {
    current: HTMLElement;
    shift: HTMLElement;
    windowWidth: number;
  }): RunnerInfo;

  /**
   * Get information about neighboring elements from the parent.
   */
  public abstract getNextInfo({ prev, current }: { prev: HTMLElement; current: HTMLElement }): NextInfo;

  /**
   * Get the item to be moved.
   */
  public abstract getShift(): HTMLElement;

  /**
   * The element from which to start the slider.
   */
  public abstract getFirstCurrent(): HTMLElement;

  /**
   * Get the next element in the list that will be the main one after switching the slide.
   */
  public abstract getNextSibling(item: HTMLElement): HTMLElement | null;

  /**
   * Add a slide to the end/beginning of the collection.
   */
  public abstract insert(item: HTMLElement): void;

  /**
   * Get a list of items sorted by playback order.
   */
  public abstract getItems(): Array<HTMLElement>;

  /**
   * Set direction to hide or show.
   */
  public setReverse(reverse: boolean): void {
    this.reverse = reverse;
  }

  /**
   * Returns the DOM Element of the slider object.
   */
  public getWrapper(): HTMLElement {
    return this.wrapper;
  }
}

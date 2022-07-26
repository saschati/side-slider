export default abstract class Info {
  protected prev: HTMLElement;
  protected current: HTMLElement;
  protected reverse: boolean;

  constructor({ prev, current, reverse }: { prev: HTMLElement; current: HTMLElement; reverse: boolean }) {
    this.prev = prev;
    this.current = current;
    this.reverse = reverse;
  }

  /**
   * Get the distance between the current element and the element that will be replaced by the current element.
   */
  public abstract getSiblingDistance(): number;

  /**
   * Get the current neighbor element.
   */
  public getCurrent(): HTMLElement {
    return this.current;
  }

  /**
   * Get the current neighbor element.
   */
  public getPrev(): HTMLElement {
    return this.current;
  }

  /**
   * Is this operation hide/unhidden.
   */
  public isReverse(): boolean {
    return this.reverse === true;
  }
}

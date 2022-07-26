import Side from "./side";

import NextInfo from "../info/next/right-info";
import RunnerInfo from "../info/runner/right-info";

export default class Right extends Side {
  public getRunnerInfo({
    current,
    shift,
    windowWidth,
  }: {
    current: HTMLElement;
    shift: HTMLElement;
    windowWidth: number;
  }): RunnerInfo {
    return new RunnerInfo({ current, shift, windowWidth, reverse: this.reverse });
  }

  public getNextInfo({ prev, current }: { prev: HTMLElement; current: HTMLElement }): NextInfo {
    return new NextInfo({ prev, current, reverse: this.reverse });
  }

  public getShift(): HTMLElement {
    if (this.reverse === true) {
      return <HTMLElement>this.wrapper.firstElementChild;
    }

    return <HTMLElement>this.wrapper.lastElementChild;
  }

  public getFirstCurrent(): HTMLElement {
    if (this.reverse === true) {
      return <HTMLElement>this.wrapper.lastElementChild;
    }

    return <HTMLElement>this.wrapper.firstElementChild;
  }

  public getNextSibling(item: HTMLElement): HTMLElement | null {
    if (this.reverse === true) {
      return <HTMLElement | null>item.previousElementSibling;
    }

    return <HTMLElement | null>item.nextElementSibling;
  }

  public insert(item: HTMLElement): void {
    if (this.reverse === true) {
      this.wrapper.prepend(item);

      return;
    }

    this.wrapper.append(item);
  }

  public getItems(): HTMLElement[] {
    let items = Array.from(this.wrapper.children);

    if (this.reverse === true) {
      items = items.reverse();
    }

    return <HTMLElement[]>items;
  }
}

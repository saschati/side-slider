import Side from "./side";

import NextInfo from "../info/next/left-info";
import RunnerInfo from "../info/runner/left-info";

export default class Left extends Side {
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
      return <HTMLElement>this.wrapper.lastElementChild;
    }

    return <HTMLElement>this.wrapper.firstElementChild;
  }

  public getFirstCurrent(): HTMLElement {
    if (this.reverse === true) {
      return <HTMLElement>this.wrapper.firstElementChild;
    }

    return <HTMLElement>this.wrapper.lastElementChild;
  }

  public getNextSibling(item: HTMLElement): HTMLElement | null {
    if (this.reverse === true) {
      return <HTMLElement | null>item.nextElementSibling;
    }

    return <HTMLElement | null>item.previousElementSibling;
  }

  public insert(item: HTMLElement): void {
    if (this.reverse === true) {
      this.wrapper.append(item);

      return;
    }

    this.wrapper.prepend(item);
  }

  public getItems(): HTMLElement[] {
    const items = <HTMLElement[]>Array.from(this.wrapper.children);

    if (this.reverse === true) {
      return items;
    }

    return items.reverse();
  }
}

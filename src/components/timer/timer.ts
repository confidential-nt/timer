import { Component, TimeCoponent } from "../component.js";
import { Composable, List } from "./timer-components/list.js";
import { Observer, Total } from "./timer-components/total.js";

// 이번주 안까지 완료!
export class Timer {
  readonly total: TimeCoponent<HTMLElement> & Observer;
  readonly list: Component & Composable;

  constructor(root: HTMLElement) {
    this.total = new Total();
    this.total.attachTo(
      root.querySelector(".timer-top")! as HTMLDivElement,
      "beforeend"
    );
    this.list = new List(this.total);
    this.list.attachTo(
      root.querySelector(".timer-btm")! as HTMLDivElement,
      "beforeend"
    );
  }
}

import { List } from "./timer-components/list.js";
import { Total } from "./timer-components/total.js";

// 이번주 안까지 완료!
export class Timer {
  readonly total: Total;
  readonly list: List;

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

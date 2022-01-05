import { List } from "./timer-components/list.js";
import { Total } from "./timer-components/total.js";

// 이번주 안까지 완료!
export class Timer {
  private readonly total: Total;
  private readonly list: List;

  constructor(private root: HTMLElement) {
    this.total = new Total(root);
    this.list = new List(root);
    this.total;
    this.list;
  }
}

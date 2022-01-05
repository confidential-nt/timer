import { BaseComponent, TimeCoponent } from "../../component.js";

export class ListItem extends TimeCoponent<HTMLLIElement> {
  private time: number = 0;
  constructor(input: string) {
    super(`<li class="timer-list__item">
              <h2 class="item__title"></h2>
              <strong class="item__time" data-time=""></strong>
          </li>`);

    const titleElement = this.element.querySelector(
      ".item__title"
    )! as HTMLHeadingElement;
    titleElement.textContent = input;

    const timeElement = this.element.querySelector(
      ".item__time"
    )! as HTMLElement;

    timeElement.dataset.time = `${this.time}`;

    timeElement.textContent = `${this.timeFormmating(this.time)}`;

    this.attachTo(
      document.querySelector(".timer-list")! as HTMLUListElement,
      "beforeend"
    );
  }
}
// addChild vs 그냥 생성자에서 attachTo 해주기 차이 분석
export class List extends BaseComponent<HTMLUListElement> {
  constructor(private root: HTMLElement) {
    super(`<ul class="timer-list">
    </ul>`);
    const parentElement = root.querySelector(".timer-btm")! as HTMLElement;

    this.attachTo(parentElement, "beforeend");
  }
}

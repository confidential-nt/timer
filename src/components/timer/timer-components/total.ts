import { TimeCoponent } from "../../component.js";

export class Total extends TimeCoponent<HTMLDivElement> {
  private time: number = 0;
  constructor(private root: HTMLElement) {
    super(`<div class="timer__total">
              <strong class="total-time" data-time=""></strong>
          </div>`);

    const totalTimeElement = this.element.querySelector(
      ".total-time"
    )! as HTMLElement;

    totalTimeElement.textContent = `${this.timeFormmating(this.time)}`;
    totalTimeElement.dataset.time = `${this.time}`;

    const parentElement = root.querySelector(".timer-top")! as HTMLElement;

    this.attachTo(parentElement, "beforeend");
  }
}

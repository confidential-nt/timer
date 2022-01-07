import { TimeCoponent } from "../../component.js";

export class Total extends TimeCoponent<HTMLDivElement> {
  constructor() {
    super(`<div class="timer__total">
              <strong class="total-time" data-time=""></strong>
          </div>`);

    this.paintTime(".total-time");
  }
}

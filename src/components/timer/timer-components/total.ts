import { TimeCoponent } from "../../component.js";

export interface Observer {
  onNotify(): void;
}

export class Total extends TimeCoponent<HTMLDivElement> implements Observer {
  constructor() {
    super(`<div class="timer__total">
              <strong class="total-time" data-time=""></strong>
          </div>`);

    this.paintTime(".total-time");
  }

  onNotify() {
    this.time += 1;
    this.paintTime(".total-time");
  }
}

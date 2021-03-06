import { BaseComponent } from "../component.js";

type OnSubmitListener = (e: SubmitEvent) => void;

export interface Form {
  setOnSubmitListener(listener: OnSubmitListener): void;
}

export class TimerForm extends BaseComponent<HTMLFormElement> implements Form {
  private submitListener?: OnSubmitListener;
  constructor() {
    super(`<form class="timer-form">
              <input type="text" placeholder="타이머 이름을 입력하세요." id="timer-name">
              <button class="timer-submit-btn" type="submit">입력</button>
            </form>`);

    this.element.addEventListener(
      "submit",
      (e: SubmitEvent) => this.submitListener && this.submitListener(e)
    );
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
}

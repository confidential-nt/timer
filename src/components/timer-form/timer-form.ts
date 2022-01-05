import { BaseComponent } from "../component.js";

type OnSubmitListener = (e: SubmitEvent) => void;

export class TimerForm extends BaseComponent<HTMLFormElement> {
  private submitListener?: OnSubmitListener;
  constructor(private root: HTMLElement) {
    super(`<form class="timer-form">
              <input type="text" placeholder="타이머 이름을 입력하세요." id="timer-name">
              <button class="timer-submit-btn" type="submit">입력</button>
            </form>`);

    const parentElement = root;
    this.attachTo(parentElement, "beforeend");

    this.element.addEventListener(
      "submit",
      (e: SubmitEvent) => this.submitListener && this.submitListener(e)
    );
  }

  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }
}

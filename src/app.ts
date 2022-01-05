import { Timer } from "./components/timer/timer.js";
import { TimerForm } from "./components/timer-form/timer-form.js";
import { ListItem } from "./components/timer/timer-components/list.js";

class App {
  private readonly timer: Timer;
  private readonly timerForm: TimerForm;

  constructor(private timerRoot: HTMLElement, private formRoot: HTMLElement) {
    this.timer = new Timer(this.timerRoot);
    this.timerForm = new TimerForm(this.formRoot);

    this.timerForm.setOnSubmitListener((e: SubmitEvent) => {
      e.preventDefault();

      const input = document.querySelector("#timer-name")! as HTMLInputElement;
      const item = new ListItem(input.value);
    });
  }
}

new App(
  document.querySelector(".timer")! as HTMLElement,
  document.querySelector(".input-form")! as HTMLElement
);

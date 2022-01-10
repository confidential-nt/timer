import { Timer } from "./components/timer/timer.js";
import { Form, TimerForm } from "./components/timer-form/timer-form.js";
import { ListItem } from "./components/timer/timer-components/list.js";
import { Component } from "./components/component.js";

class App {
  private readonly timer: Timer;
  private readonly timerForm: Form & Component;

  constructor(timerRoot: HTMLElement, formRoot: HTMLElement) {
    this.timer = new Timer(timerRoot);

    this.timerForm = new TimerForm();
    this.timerForm.attachTo(formRoot, "beforeend");

    this.timerForm.setOnSubmitListener((e: SubmitEvent) => {
      e.preventDefault();

      const input = document.querySelector("#timer-name")! as HTMLInputElement;

      if (!Boolean(input.value)) return;

      this.timer.list.addChild(new ListItem(input.value));
      input.value = "";
    });
  }
}

new App(
  document.querySelector(".timer")! as HTMLElement,
  document.querySelector(".input-form")! as HTMLElement
);

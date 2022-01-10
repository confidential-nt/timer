import { BaseComponent, Component, TimeCoponent } from "../../component.js";
import { Observer } from "./total.js";

type OnClickListener = () => void;
type TimerState = "play" | "stop";

interface TimerItem {
  handleTimer<T extends HTMLElement>(
    state: TimerState,
    observer?: TimeCoponent<T> & Observer
  ): void;

  get timerState(): TimerState;

  setOnClickListener(listener: OnClickListener): void;

  updateBtnState(state: TimerState): void;
}

export interface Composable {
  addChild(child: TimerItem & Component): void;
}

export class ListItem extends TimeCoponent<HTMLLIElement> implements TimerItem {
  private clickListener?: OnClickListener;
  private _timerState: TimerState = "stop";

  constructor(input: string) {
    super(`<li class="timer-list__item">
              <div class="item__content">
                <h2 class="item__title"></h2>
                <strong class="item__time" data-time=""></strong>
                <button class="timer__toggle-btn">▶️</button>
              </div>
          </li>`);

    const titleElement = this.element.querySelector(
      ".item__title"
    )! as HTMLHeadingElement;
    titleElement.textContent = input;

    this.paintTime(".item__time");

    const toggleBtn = this.element.querySelector(
      ".timer__toggle-btn"
    )! as HTMLButtonElement;

    toggleBtn.onclick = () => this.clickListener && this.clickListener();
  }

  setOnClickListener(listener: OnClickListener) {
    this.clickListener = listener;
  }

  updateBtnState(state: TimerState) {
    const btn = this.element.querySelector(
      ".timer__toggle-btn"
    )! as HTMLButtonElement;
    switch (state) {
      case "stop":
        btn.textContent = "||";
        break;
      case "play":
        btn.textContent = "▶️";
        break;
    }
  }

  handleTimer<T extends HTMLElement>(
    state: TimerState,
    observer?: TimeCoponent<T> & Observer
  ) {
    switch (state) {
      case "stop":
        this.increaseTime(".item__time", observer);
        this._timerState = "play";
        break;
      case "play":
        this.stopIncreasingTime();
        this._timerState = "stop";
        break;
      default:
        throw Error(`unknown state: ${state}`);
    }
  }

  get timerState(): TimerState {
    return this._timerState;
  }
}
// addChild vs 그냥 생성자에서 attachTo 해주기 차이 분석 => addChild: 리스트 안에서 리스트 아이템을 좀 더 체계적으로 관리 할 수 있다. // 혹은 그냥..깔끔한 기능분리를 위해
export class List
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor(private observerComponent: Observer & TimeCoponent<HTMLElement>) {
    // Total => 이거 디커플링은 어떻게 하면 좋을까?
    super(`<ul class="timer-list">
    </ul>`);
  }

  addChild(child: TimerItem & Component) {
    child.attachTo(this.element, "beforeend");
    child.setOnClickListener(() => {
      child.updateBtnState(child.timerState);
      child.handleTimer(child.timerState, this.observerComponent);
    });
  }
}

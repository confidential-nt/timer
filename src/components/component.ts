import { Observer } from "./timer/timer-components/total";

export interface Component {
  attachTo(parent: HTMLElement, position: InsertPosition): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(htmlString: string) {
    const template = document.createElement("template");
    template.innerHTML = htmlString;

    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = "beforeend") {
    parent.insertAdjacentElement(position, this.element);
  }
}

export abstract class TimeCoponent<
  T extends HTMLElement
> extends BaseComponent<T> {
  protected time: number = 0;
  private timeId?: number;

  protected increaseTime<K extends HTMLElement>(
    selector: string,
    observer?: TimeCoponent<K> & Observer
  ) {
    this.timeId = setInterval(() => {
      this.time += 1;
      if (observer) {
        observer.onNotify();
      }
      this.paintTime(selector);
    }, 1000);
  }

  protected stopIncreasingTime() {
    clearInterval(this.timeId);
  }

  protected paintTime(selector: string) {
    const timeElement = this.element.querySelector(selector)! as HTMLElement;

    timeElement.dataset.time = `${this.time}`;

    timeElement.textContent = `${this.timeFormmating(this.time)}`;
  }

  protected timeFormmating(seconds: number): string {
    const hour = Math.floor(seconds / (60 * 60));
    const min = Math.floor((seconds % (60 * 60)) / 60);
    const sec = (seconds % (60 * 60)) % 60;

    return `${hour >= 10 ? hour : `0${hour}`}:${min >= 10 ? min : `0${min}`}:${
      sec >= 10 ? sec : `0${sec}`
    }`;
  }
}

// 여기 안에 notifyObserver(total)을 만들어서 시간이 업데이트 될때마다 해당 정보를 토탈에 넘겨주는 거지....

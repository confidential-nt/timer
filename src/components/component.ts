export class BaseComponent<T extends HTMLElement> {
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

export class TimeCoponent<T extends HTMLElement> extends BaseComponent<T> {
  protected timeFormmating(seconds: number): string {
    const hour = Math.floor(seconds / (60 * 60));
    const min = Math.floor((seconds % (60 * 60)) / 60);
    const sec = (seconds % (60 * 60)) % 60;

    return `${hour > 10 ? hour : `0${hour}`}:${min > 10 ? min : `0${min}`}:${
      sec > 10 ? sec : `0${sec}`
    }`;
  }
}

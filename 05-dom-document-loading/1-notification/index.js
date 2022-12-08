export default class NotificationMessage {
  constructor(message = "No message", {
    duration = 2000,
    type = "success",
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.render()
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration/1000}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  show(target = document.body) {
    target.append(this.element);

    setTimeout( () => {
      this.destroy();
    }, this.duration - 10) // сокращаем время, чтобы убрать мерцание в момент удаления
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }

    return this;
  }

  destroy() {
    this.element.remove();
    this.remove();
  }
}

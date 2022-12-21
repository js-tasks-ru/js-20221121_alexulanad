class Tooltip {
  static instance;
  element;

  onPointerOver = event => {
    const element = event.target.closest('[data-tooltip]');

    element ? (
      this.render(element.dataset.tooltip),
      document.addEventListener('pointermove', this.onPointerMove)
    ) : (
      this.remove(),
      document.removeEventListener('pointermove', this.onPointerMove)
    );
  };

  onPointerMove = event => {
    this.moveTooltip(event);
  };

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
  }

  initialize() {
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener('pointerover', this.onPointerOver);
  }

  render(tooltipValue) {
      if (this.element) {
        this.remove();
        document.removeEventListener('pointermove', this.onPointerMove);
      }

      this.element = document.createElement('div');
      this.element.className = 'tooltip';
      this.element.innerHTML = tooltipValue;
      document.body.append(this.element);
  }

  moveTooltip(event) {
    const shift = 10;
    const left = event.clientX + shift;
    const top = event.clientY + shift;

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    document.removeEventListener('pointerover', this.onPointerOver);
    document.removeEventListener('pointerout', this.onPointerOut);
    document.removeEventListener('pointermove', this.onPointerMove);
    this.remove();
    this.element = null;
  }
}

export default Tooltip;
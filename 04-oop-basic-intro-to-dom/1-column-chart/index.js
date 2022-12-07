export default class ColumnChart {
  subElements = {};
  chartHeight = 50;

  constructor({
    data = [],
    label = "",
    link = "",
    value = 0,
    formatHeading = data => data,
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = formatHeading(value);

    this.render();
  }

  getColumnProps() {
    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;

    return this.data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  getColumnBody() {
    return this.getColumnProps().map(item => {
      return `<div style="--value: ${item.value}" data-tooltip="${item.percent}"></div>`;
    }).join('');
  }

  getLink() {
    return this.link ? `<a href="/${this.link}" class="column-chart__link">View all</a>` : "";
  }

  get template() {
    return `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
        ${this.label}
        ${this.getLink()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.value}</div>
        <div data-element="body" class="column-chart__chart">
          ${this.getColumnBody()}
        </div>
      </div>
    </div>
    `;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove("column-chart_loading");
    }

    this.subElements = this.getSubElements();
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    return result;
  }


  update(data) {
    if (!data.length) {
      this.element.classList.add("column-chart_loading");
    }

    this.data = data;
    this.subElements.body.innerHTML = this.getColumnBody();
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = {};
    // NOTE: удаляем обработчики событий, если они есть
  }
}

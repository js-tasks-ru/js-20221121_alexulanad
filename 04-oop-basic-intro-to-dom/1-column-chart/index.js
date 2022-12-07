export default class ColumnChart {
  constructor(fields = {}) {
    this.data = fields.data || [];
    this.label = fields.label || '';
    this.value = fields.value || 0;
    this.link = fields.link || '';
    this.formatHeading = fields.formatHeading || (data => `${this.value}`);
    this.chartHeight = 50;

    this.render();
    this.initEventListeners();
  }
  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  getDataList(data) {
    return this.getColumnProps(data).map(item => {
      return `<div style="--value: ${item.value}" data-tooltip="${item.percent}"></div>`;
    }).join('');
  }

  getLink() {
    if (this.link) {
      return `<a href="/${this.link}" class="column-chart__link">View all</a>`;
    }
  }

  getTemplateLoading() {
    if (this.data.length === 0) {return 'column-chart column-chart_loading';}
    if (this.data.length > 0) {return 'column-chart';}
  }

  getTemplate() {
    return `
      <div class="${this.getTemplateLoading()}" style="--chart-height: 50">
      <div class="column-chart__title">
        ${this.label}
        ${this.getLink() || ''}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
        <div data-element="body" class="column-chart__chart">
          ${this.getDataList(this.data)}
        </div>
      </div>
    </div>
    `;
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }

  initEventListeners() {
    // NOTE: в данном методе добавляем обработчики событий, если они есть
  }
  update(data) {
    const chart = this.element.querySelector('.column-chart__chart');
    if (data.length !== 0) {chart.innerHTML = this.getDataList(data);}
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }
}

export default class Section {
  constructor({ data, renderer }, container) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._renderedItems.forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

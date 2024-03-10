export default class Section {
  constructor({ data, renderer }, container) {
    this._items = data;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.reverse().forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

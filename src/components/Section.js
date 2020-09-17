export default class Section {
	constructor({ items, renderer }, containerSelector) {
		this._renderer = renderer;
		this._items = items;
		this._containerSelector = containerSelector
	}


	setItem(element) {
		this._containerSelector.prepend(element)
	}

	renderItems() {
		this._items.forEach((item) => {
			this._renderer(item);
		});
	}
	
	setItem(element, isArray) { 
    if (isArray) { 
      this._containerSelector.append(element); 
		} 
		else { 
      this._containerSelector.prepend(element); 
    } 
  }

}
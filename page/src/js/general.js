window.$ = function(selector) {
	let res = document.querySelectorAll(selector);

	if (res.length < 2) return res[0];
	return Array.from(res);
};

window.ElementSoup = class ElementSoup {
	constructor(tagname) {
		this._e = document.createElement(tagname);
	}

	class(name, enable=true) {
		if (enable) {
			this._e.classList.add(name);
		} else {
			this._e.classList.remove(name);
		}

		return this;
	}

	attribute(name, value, del=false) {
		let attr = document.createAttribute(name);
		attr.value = value;

		if (del) {
			this._e.attributes.removeNamedItem(name);
		} else {
			this._e.attributes.setNamedItem(attr);
		}

		return this;
	}

	data(name, value, del=false) {
		return this.attribute(`data-${name}`, value, del);
	}

	child(child) {
		if (child.export) child = child.export();

		this._e.appendChild(child);
		return this;
	}

	text(text) {
		this._e.innerText = text;
		return this;
	}

	html(ml) {
		this._e.innerHTML = ml;
		return this;
	}

	export() {
		return this._e;
	}
};

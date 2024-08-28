const root = document.querySelector(".root");

function createElement(html) {
  const div = document.createElement("div");
  div.insertAdjacentHTML("beforeend", html);
  return div.firstElementChild;
}

class Header {
  _element = null;
  _subElements = null;

  _state = {
    scrollY: 0,
  };

  constructor({ title, images }, Image) {
    this._title = title;
    this._images = images;
    this._Image = Image;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
    this._render();
  }

  _addListeners() {
    window.addEventListener("scroll", () => {
      this._setStateScrollY(window.scrollY);
      this._render();
    });
  }

  _setStateScrollY(value) {
    this._state.scrollY = value;
  }

  _getTemplate() {
    return `<header class="header">
        <div class="header__images" data-element="images"></div>
        <h2 class="header__title" data-element="title">${this._title}</h2>
      </header>`;
  }

  _generateImages() {
    return this._images
      .sort((a, b) => a.imgPosition - b.imgPosition)
      .map((image) => {
        const calc = image.typeValue * this._state.scrollY * image.coff;
        return new this._Image({ link: image.link, imageDirection: { direction: image.direction, calc } }).element;
      });
  }

  _render() {
    this._subElements.images.textContent = "";
    this._subElements.images.append(...this._generateImages());
    this._subElements.title.style.top = this._state.scrollY * 1 + "px";
  }

  _getSubElements() {
    return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, el) => {
      return {
        ...acc,
        [el.getAttribute("data-element")]: el,
      };
    }, {});
  }

  get element() {
    return this._element;
  }
}

class Image {
  _element = null;

  constructor({ link, imageDirection }) {
    this._link = link;
    this._imageDirection = imageDirection;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<img src="${this._link}" style="${this._imageDirection.direction}:${this._imageDirection.calc}px;"/>`;
  }

  get element() {
    return this._element;
  }
}


class Main {
  _element = null;

  constructor({title,text}) {
    this._title = title;
    this._text = text;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<main class="main">
        <div class="main__container">
          <h2 class="main__title">${this._title}</h2>
          <p class="main__text">${this._text}</p>
        </div>
      </main>`;
  }

  get element() {
    return this._element;
  }
}


const header = new Header(
  {
    title: "Moon Lignt",
    images: [
      { link: "img/bg.jpg", imgPosition: 1, typeValue: 1, coff: 0.5, direction: "top" },
      { link: "img/moon.png", imgPosition: 2, typeValue: -1, coff: 0.5, direction: "left" },
      { link: "img/mountain.png", imgPosition: 3, typeValue: -1, coff: 0.15, direction: "top" },
      { link: "img/road.png", imgPosition: 4, typeValue: 1, coff: 0.15, direction: "top" },
    ],
  },
  Image
);

const main = new Main({title:"Lorem ipsum dolor", text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum, dolor sit amet consectetur adipisicing elit.Assumenda cumque sapiente dolorem id minus illo enim ut veniam, recusandae delectus laboredeserunt ipsa fuga saepe dolor voluptatibus a laboriosam libero Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda cumque sapiente dolorem id minus illo enim ut veniam, recusandae delectus laboredeserunt ipsa fuga saepe dolor voluptatibus a laboriosam libero Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda cumque sapiente dolorem id minus illo enim ut veniam, recusandae delectus laboredeserunt ipsa fuga saepe dolor voluptatibus a laboriosam libero Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda cumque sapiente dolorem id minus illo enim ut veniam, recusandae delectus laboredeserunt ipsa fuga saepe dolor voluptatibus a laboriosam libero Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda cumque sapiente dolorem id minus illo enim ut veniam, recusandae delectus laboredeserunt ipsa fuga saepe dolor voluptatibus a laboriosam libero Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda cumque sapiente dolorem id minus illo enim ut veniam, recusandae delectus laboredeserunt ipsa fuga saepe dolor voluptatibus a laboriosam libero"})

root.insertAdjacentElement("beforeend", header.element);
root.insertAdjacentElement("beforeend", main.element);

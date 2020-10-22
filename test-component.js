const template = document.createElement("template");
template.innerHTML = `
  <style>
    .test-component__component-box {
      width: 100%;
      height: 75vh;
    }
  </style>
  <div>
    <iframe
      title="test"
      class="test-component__component-box"
      src="https://services6.unblu.com/unblu/popout?apiKey=w8IHN_eAQqSmTdBn4pD5gQ"
      referrerpolicy="same-origin"
    ></iframe>
  </div>`;

class TestComponent extends HTMLElement {
  constructor() {
    super();
    this.elements = null;
    this.element = null;
    this.api = null;
  }

  connectedCallback() {
    if (window.unblu && window.unblu.api) {
      window.unblu.api
        .initialize()
        .then(api => {
          this.api = api;
          api.ui.collapseIndividualUi();
        })
        .catch(console.error);
      this.elements = document.getElementsByClassName(
        "x-unblu-launcher-button"
      );
      if (this.elements) {
        this.element = this.elements[0];
        if (this.element && this.element.getAttribute("style")) {
          this.element.style.display = "none";
        }
      }
    }
  }
}

customElements.define("test-component", TestComponent);

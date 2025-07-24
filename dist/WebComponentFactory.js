import Alpine from "alpinejs";
export function WebComponentFactory(name, template, xDataFactory = () => ({}), ...args) {
  let temp;
  if (typeof template === "string") {
    temp = document.createElement("template");
    temp.innerHTML = template;
  } else {
    temp = template;
  }
  class CustomElement extends HTMLElement {
    root;
    data;
    _value = "";
    get value() {
      return this._value;
    }
    set value(val) {
      if (this._value === val) return;
      this._value = val;
      if (this.data?.$val !== void 0) {
        this.data.$val = val;
      }
      this.dispatchEvent(new Event("input"));
    }
    constructor() {
      super();
      this.root = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.root.appendChild(temp.content.cloneNode(true));
      const xData = xDataFactory(...args);
      if (Object.hasOwn(xData, "init") && typeof xData.init == "function") {
        xData.init();
      }
      this.data = Alpine.reactive({
        $val: this._value,
        $component: this,
        ...xData
      });
      Alpine.effect(() => {
        if (this.data.$val !== this._value) {
          this._value = this.data.$val;
          this.dispatchEvent(new Event("input"));
        }
      });
      Alpine.addScopeToNode(this.root, this.data);
      Alpine.initTree(this.root);
    }
  }
  customElements.define(name, CustomElement);
}

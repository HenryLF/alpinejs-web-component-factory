var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
export function wcFactory(name, template) {
  let temp;
  if (typeof template === "string") {
    temp = document.createElement("template");
    temp.innerHTML = template;
  } else {
    temp = template;
  }
  class CustomElement extends HTMLElement {
    constructor() {
      super();
      __publicField(this, "root");
      __publicField(this, "value");
      __publicField(this, "state");
      __publicField(this, "masterUpdate", false);
      this.root = this.attachShadow({ mode: "open" });
      const model = this.getAttribute("x-model");
      model && this.setAttribute(":val", "JSON.stringify(".concat(model, ")"));
      const updateModel = () => {
        this.dispatchEvent(new Event("input"));
      };
      this.state = Alpine.reactive({
        data: Alpine.reactive({})
      });
      let firstRun = true;
      Alpine.effect(() => {
        JSON.stringify(this.state.data);
        if (firstRun || this.masterUpdate) {
          firstRun = false;
          return;
        }
        this.value = this.state.data;
        updateModel();
      });
    }
    attributeChangedCallback(_, __, newValue) {
      this.masterUpdate = true;
      Object.assign(this.state.data, JSON.parse(newValue));
      this.masterUpdate = false;
    }
    connectedCallback() {
      this.root.appendChild(temp.content.cloneNode(true));
      Alpine.addScopeToNode(this.root, this.state);
      Alpine.initTree(this.root);
    }
  }
  __publicField(CustomElement, "observedAttributes", ["val"]);
  customElements.define(name, CustomElement);
}

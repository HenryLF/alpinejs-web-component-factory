import Alpine from "alpinejs";
export function wcFactory(name, template) {
  let temp;
  if (typeof template === "string") {
    temp = document.createElement("template");
    temp.innerHTML = template;
  } else {
    temp = template;
  }
  class CustomElement extends HTMLElement {
    root;
    value;
    state;
    masterUpdate = false;
    static observedAttributes = ["val"];
    constructor() {
      super();
      this.root = this.attachShadow({ mode: "open" });
      const model = this.getAttribute("x-model");
      model && this.setAttribute(":val", `JSON.stringify(${model})`);
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
        this.value = Alpine.raw(this.state.data);
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
  customElements.define(name, CustomElement);
}

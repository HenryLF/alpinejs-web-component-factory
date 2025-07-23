import Alpine from "alpinejs";

export function wcFactory(
  name: string,
  template: HTMLTemplateElement | string
) {
  let temp: HTMLTemplateElement;
  if (typeof template === "string") {
    temp = document.createElement("template");
    temp.innerHTML = template;
  } else {
    temp = template;
  }

  class CustomElement extends HTMLElement {
    root: HTMLElement;
    value: any;
    state: any;
    masterUpdate = false;
    static observedAttributes = ["val"];
    constructor() {
      super();
      //@ts-expect-error
      this.root = this.attachShadow({ mode: "open" });
      const model = this.getAttribute("x-model");
      model && this.setAttribute(":val", `JSON.stringify(${model})`);
      const updateModel = () => {
        this.dispatchEvent(new Event("input"));
      };

      this.state = Alpine.reactive({
        data: Alpine.reactive({}),
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
    attributeChangedCallback(_: string, __: string, newValue: string) {
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

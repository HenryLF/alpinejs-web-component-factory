import Alpine from "alpinejs";

export function WebComponentFactory(
  name: string,
  template: HTMLTemplateElement | string,
  xDataFactory: (...args: any[]) => object = () => ({}),
  ...args: any[]
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
    data: any;
    private _value = "";

    get value() {
      return this._value;
    }

    set value(val) {
      if (this._value === val) return;
      this._value = val;
      if (this.data?.$val !== undefined) {
        this.data.$val = val;
      }
      this.dispatchEvent(new Event("input"));
    }

    constructor() {
      super();
      //@ts-expect-error
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
        ...xData,
      });

      // Sync from Alpine to component
      Alpine.effect(() => {
        if (this.data.$val !== this._value) {
          this._value = this.data.$val;
          this.dispatchEvent(new Event("input"));
        }
      });

      // Apply Alpine to component
      Alpine.addScopeToNode(this.root, this.data);
      Alpine.initTree(this.root);
    }
  }

  customElements.define(name, CustomElement);
}

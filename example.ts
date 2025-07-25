import Alpine from "alpinejs";
import { WebComponentFactory } from "./src/WebComponentFactory";

WebComponentFactory(
  "increment-button",
  /*html*/ `
  <button @click="$val++">
    Count: <span x-text="$val"></span>
  </button>
`
);
Alpine.data("data", () => ({
  counter: 0,
}));
Alpine.start();

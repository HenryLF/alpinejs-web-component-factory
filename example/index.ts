import Alpine from "alpinejs";
import { WebComponentFactory } from "../src/WebComponentFactory.js";
import "./components/shuffle.js";
import "./components/colorpicker.js";

//component content here or in a template inside the html
const html = /*html*/ `
<section x-data="{open : false}">
<style>
    *{
background-color: red;    }
</style>
<div class="header">
<slot name="header"></slot>
</div>
<hr />
<slot  x-transition name="content" class="content"></slot>
<button @click="open=!open" x-text="open?'Hide':'Expand'">Click</button>
<p x-show="open">As you can see you can still do some Alpine JS magic inside the components.</p>

<fieldset>
    <label for='text'>Inner Text Input:</label>
    <input type="text" x-model="$val.text" id="input" placeholder=''>
</fieldset>

<fieldset>
    <label for='number'>Inner Text Input:</label>
    <input type="number" x-model="$val.num" id="input" placeholder=''>
</fieldset>

</section>
`;

WebComponentFactory("wc-test", html);
//initialize Alpine data
Alpine.data("data", () => ({
  text: "AlpineJS + WebComponents",
  num: 106,
  color: "#202099",
}));


//initialize with the component name and a HTML string/a template (getElementById)

Alpine.start();

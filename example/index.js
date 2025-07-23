import Alpine from "./alpinejs.js";
import { wcFactory } from "../dist/wcFactory.js";

//component content here or in a template inside the html
const html = /*html*/ `
<section>
<style>
    *{
        background-color: red;
    }
</style>
<div class="header">
<slot name="header"></slot>
</div>
<hr />
<slot name="content" class="content"></slot>

<fieldset>
    <label for='text'>Inner Text Input:</label>
    <input type="text" x-model="data.text" id="input" placeholder=''>
</fieldset>

<fieldset>
    <label for='number'>Inner Text Input:</label>
    <input type="number" x-model="data.num" id="input" placeholder=''>
</fieldset>

</section>
`;

//initialize with the component name and a HTML string/a template (getElementById)
wcFactory("wc-test", html);

Alpine.start();

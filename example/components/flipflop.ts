import { WebComponentFactory } from "../../src/WebComponentFactory.js";

const html = /*html */ `
<style>
.container{
  display : flex;
  flex-direction: column;
  align-items: center;
}
.container > * {
  margin-block-start: 1rem;
  margin-block-end: 1rem;
  
}
.head,.content{
  display: grid;
  min-height: 1rem;
  height: fit-content;
  width: 100%;
  overflow-x: hidden;
}
.on,.off{
  grid-area: 1/1;
  width: 100%;
  transition: transform 400ms ease-in-out;
  top: 0;
}
.on{
  right: 100%;
}
.off{
  left: 100%;
}
hr{
  border : 2px;
  width : 95%;
}

</style>
<div class="container">
  
  <div class="head">
    <div @click="$val=true" class="on"
    :style="{transform : $val ? 'translate(0)' : 'translate(-100%)'}"
    >
      <slot name="on"></slot>
    </div>
    <div @click="$val=false" class="off"
    :style="{transform : $val ? 'translate(100%)' : 'translate(0)'}"
    >
      <slot name="off"></slot>
    </div>
  </div>

  <slot name="static"></slot>

  <div class="content">
    <div @click="$val=true" class="on"    
    :style="{transform : $val ? 'translate(0)' : 'translate(-100%)'}"
    >
      <slot name="content-on"></slot>
    </div>
    <div @click="$val=false" class="off"
    :style="{transform : $val ? 'translate(100%)' : 'translate(0)'}"
    >
      <slot name="content-off"></slot>
    </div>
  </div>
</div>
`;

WebComponentFactory("wc-flipflop", html);

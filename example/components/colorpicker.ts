import { WebComponentFactory } from "../../src/WebComponentFactory";

const html = /*html*/ `
<style>

    .container{
        display: grid;
        position : relative;
        height : var(--color-picker-height,60px);
        width : var(--color-picker-width,60px);
        font-size : var(--color-picker-fontsize,0.75rem);
    
    }
    .pop-up{
        top:calc(var(--color-picker-popup-top,0)*100%);
        left:calc(var(--color-picker-popup-left,1)*100%);
        z-index:10;
        position : absolute;
    }
    .color-wheel {
        --saturation: 100%;
        --lightness: 50%;
        position : relative;
        width: calc(var(--color-picker-width,60px)*var(--color-picker-wheel-ratio,1.5));
        aspect-ratio: 1/1;
        border-radius: 50%;
        background: conic-gradient(
  from 90deg,
  hsl(0, var(--saturation), var(--lightness)),
  hsl(60, var(--saturation), var(--lightness)),
  hsl(120, var(--saturation), var(--lightness)),
  hsl(180, var(--saturation), var(--lightness)),
  hsl(240, var(--saturation), var(--lightness)),
  hsl(300, var(--saturation), var(--lightness)),
  hsl(360, var(--saturation), var(--lightness))
        );
    }
    .color-info{
        height : calc(var(--color-picker-height,60px)*.95 - var(--color-picker-width,60px)*.05);
        width : calc(var(--color-picker-width,60px)*.95);
        padding: calc(var(--color-picker-width,60px)*.05);
        z-index:0;
        position : absolute;
        top : 0;
        left : 0;
    }
    input{
        width: calc(var(--color-picker-width,60px)*var(--color-wheel-ratio,1.5));
    }

</style>
<div class="container"
>
<div class="color-info"
@click="toggle"
:style="{backgroundColor : $val}"
>
<span x-text="$val" 
:style="{color: light < 60 ? 'white' : 'black' , fontWeight : 'bold'} " ></span>
</div>
<template x-if="open">
<div
style="grid-area : 1/1"
class="pop-up"
>
    <div 
        class="color-wheel"
        @click="toggle;"
        id="wheel"
        
        @mousemove="getColor">
    </div>
    <div class="slider-container">
        <label  for="saturationSlider">Saturation: </label>
        <input x-model="saturation" type="range" id="saturationSlider" class="slider" min="0" max="100" value="100"
        
        @change=updateSaturation>
    </div>
    <div class="slider-container">
        <label for="lightnessSlider">Lightness: </label>
        <input x-model="light" type="range" id="lightnessSlider" class="slider" min="0" max="100" value="50"
        @change="updateLightness"
        >
    </div>
</div>
</template>
</div>
`;
const data = {
  open: false,
  hue: 100,
  saturation: 100,
  light: 50,
  toggle() {
    this.open = !this.open;
  },
  getColor(event: MouseEvent) {
    const colorWheel = event.currentTarget as HTMLElement;
    const rect = colorWheel?.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const dx = x - centerX;
    const dy = y - centerY;

    // Calculate angle in degrees (0° starts at right, increases counter-clockwise)
    const angleInRadians = Math.atan2(dy, dx);
    let angleInDegrees = angleInRadians * (180 / Math.PI);

    // Normalize to 0-360 range
    this.hue = (angleInDegrees + 360) % 360;

    this.updateHexValue();
  },
  updateLightness() {
    this.$("#wheel").style.setProperty("--lightness", this.light + "%");
    this.updateHexValue();
  },
  updateSaturation() {
    this.$("#wheel")?.style.setProperty("--saturation", this.saturation + "%");
    this.updateHexValue();
  },
  updateHexValue() {
    const l = this.light / 100;
    const a = (this.saturation * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + this.hue / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    this.$val = `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  },
};

WebComponentFactory("color-picker", html, () => data);

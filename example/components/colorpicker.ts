import { WebComponentFactory } from "../../src/WebComponentFactory";

const html = /*html*/ `
<style>
    .container{
        display: grid;
    }
    .color-wheel {
        --saturation: 100%;
        --lightness: 50%;
        width: 150%;
        position : float ;
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
        width : 95%;
        padding: 5%;
        aspect-ratio : 1/1;
        grid-area: 1/1;
    }

</style>
<div class="container"
>
    <template x-if="open">
    <div
    style="transform: translate(50% , 25%);grid-area : 1/1"
    >
        <div 
            class="color-wheel"
            @click="toggle;"
            @mousemove="$val = getColor($event)">
        </div>
        <div class="slider-container">
            <label  for="saturationSlider">Saturation: </label>
            <input x-model="saturation" type="range" id="saturationSlider" class="slider" min="0" max="100" value="100">
        </div>
        <div class="slider-container">
            <label for="lightnessSlider">Lightness: </label>
            <input x-model="light" type="range" id="lightnessSlider" class="slider" min="0" max="100" value="50">
        </div>
    </div>
    </template>
        <div class="color-info"
        @click="toggle"
        :style="{backgroundColor : $val}"
        >
        <span x-text="$val" 
        :style="{color: light < 60 ? 'white' : 'black' , fontWeight : 'bold'} " ></span>
    </div>
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

    // Update CSS variables
    colorWheel.style.setProperty("--saturation", this.saturation + "%");
    colorWheel.style.setProperty("--lightness", this.light + "%");

    return this.hslToHex();
  },
  hslToHex() {
    const l = this.light / 100;
    const a = (this.saturation * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + this.hue / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  },
};

WebComponentFactory("color-picker", html, () => data);

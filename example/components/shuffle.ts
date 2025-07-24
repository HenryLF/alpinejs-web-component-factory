import { WebComponentFactory } from "../../src/WebComponentFactory";

const html = /*html */ `
<section >
<p x-text="$val"></p>
<button @click="$val = shuffle($val)">Shuffle</button>
</section>
`;

WebComponentFactory("wc-shuffle", html, () => ({
  shuffle(s: string) {
    const characters = s.split("");
    for (let i = characters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    s = characters.join("");
    return characters.join("");
  },
}));

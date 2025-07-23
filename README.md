# Alpine.js Web Components Factory


A lightweight utility for creating Alpine.js-powered Web Components that maintain full `x-model` compatibility and slot support.

## Features

- 🔌 **Seamless Alpine Integration** - Full `x-model` two-way binding support
- 🧩 **Native Web Components** - Works with standard `<slot>` system
- 📦 **Single File Solution** - Zero dependencies beyond Alpine.js
- 🔥 **Reactive Data Flow** - Automatic JSON serialization/deserialization
- 💡 **Template Flexibility** - Accepts HTML strings or `<template>` elements

## Installation

1. Install dependencies:
```bash
npm install alpinejs
```

2. Import the factory in your project:
```javascript
import { wcFactory } from './wc-factory.js';
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();
```

## Usage

### 1. Create Component Template
```javascript
const html = /*html*/ `
<section>
  <style>
    :host { display: block; }
    fieldset { margin: 1rem; }
  </style>
  
  <slot name="header"></slot>
  
  <fieldset>
    <input type="text" x-model="data.text">
    <span x-text="data.text"></span>
  </fieldset>
</section>
`;
```

### 2. Register Component
```javascript
wcFactory("my-component", html);
```

### 3. Use in HTML
```html
<my-component x-model="appData">
  <h1 slot="header">My Reactive Component</h1>
</my-component>
```

## Advanced Example
```javascript
// Component definition
wcFactory("data-form", /*html*/ `
<section>
  <slot name="title"></slot>
  
  <input type="range" x-model="data.value" min="0" max="100">
  <output x-text="data.value"></output>
</section>
`);
```

```html
<!-- Implementation -->
<data-form x-model="userSettings">
  <h2 slot="title">Settings Panel</h2>
</data-form>

<script>
document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    userSettings: { value: 50 }
  }))
});
</script>
```

## How It Works

The factory creates custom elements that:
1. Parse and clone provided templates
2. Establish reactive Alpine.js context
3. Sync attributes with internal state via:
   - Automatic JSON serialization for complex data
   - Bidirectional `x-model` binding
   - Slot content projection
4. Handle shadow DOM encapsulation while maintaining Alpine reactivity

## Disclaimer
As I'm super lazy Deepseek generated this ReadMe. Feel free to as
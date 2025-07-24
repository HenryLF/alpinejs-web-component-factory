# Alpine Web Component Factory

This library provides a simple way to create Web Components that work seamlessly with Alpine.js' `x-model` directive, enabling two-way data binding between your components and Alpine.js applications.

## Features

- �‍ **Shadow DOM integration** - Components are encapsulated in Shadow DOM
- 🔁 **Bi-directional data binding** - Works with Alpine's `x-model`
- 💡 **Reactive state management** - Powered by Alpine's reactivity system
- 🧩 **Slot support** - Use named slots for content composition
- 🎨 **CSS encapsulation** - Scoped styles for components

## Installation

Include the library in your project:

```bash
npm install alpine-web-component-factory
```

## Usage

### Creating a Component

```javascript
import { WebComponentFactory } from 'alpine-web-component-factory';

const template = `
  <style>
    /* Component styles */
    button {
      background: blue;
      color: white;
    }
  </style>
  <button @click="increment">
    Count: <span x-text="count"></span>
  </button>
`;

WebComponentFactory('counter-button', template, () => ({
  count: 0,
  increment() {
    this.count++;
    this.$val = this.count; // Update bound value
  }
}));
```

### Using in HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script type="module" src="/path/to/your/component.js"></script>
</head>
<body x-data="{ count: 0 }">
  <counter-button x-model="count"></counter-button>
  <p>Current count: <span x-text="count"></span></p>
</body>
</html>
```

## API

### `WebComponentFactory(name, template, xDataFactory, ...args)`

- `name`: Custom element name (must contain a hyphen)
- `template`: HTML string or `<template>` element
- `xDataFactory`: Function returning Alpine.js reactive state object
- `...args`: Arguments to pass to the `xDataFactory`

## Examples

### Simple Input Component

```javascript
const inputTemplate = `
  <input 
    type="text" 
    :value="$val" 
    @input="$val = $event.target.value"
  >
`;

WebComponentFactory('custom-input', inputTemplate);
```

### Color Picker Component

```javascript
const colorTemplate = `
  <div style="display: flex; gap: 10px">
    <input type="color" :value="$val" @input="$val = $event.target.value">
    <span x-text="$val"></span>
  </div>
`;

WebComponentFactory('color-picker', colorTemplate);
```

## Benefits

1. **Encapsulation**: Components are self-contained with Shadow DOM
2. **Reactivity**: Built on Alpine's lightweight reactivity system
3. **Interoperability**: Works with any framework that supports standard web components
4. **Progressive Enhancement**: Add interactivity to static HTML
5. **Lightweight**: No heavy dependencies beyond Alpine.js


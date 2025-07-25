# Web Component Factory

## 1. Description & Features

A lightweight library for creating reusable, encapsulated web components with AlpineJS-like reactivity. Perfect for building modular forms and interactive UIs with clean, component-based architecture.

### Key Features:
- 🧩 **Reusable Components**: Create self-contained components with Shadow DOM encapsulation
- 🔄 **x-model Compatibility**: Automatic two-way data binding support
- 🛠️ **Flexible Definition**: Define components via HTML strings or external templates
- 📦 **Component State**: Initialize with `xDataFactory` for reactive state management
- 🔮 **Magic Properties**: Special properties for component interaction
- 🎨 **Advanced Styling**: CSS variables and external stylesheet support
- ⚡ **Lightweight**: Minimal footprint with Alpine-like reactivity
- 🔌 **Slot Support**: Content distribution with named slots

## 2. Quick Usage Guide

### Installation:
```bash
npm install web-component-factory
# or
yarn add web-component-factory
```

### Create a Component:
```javascript
import { WebComponentFactory } from 'web-component-factory';

WebComponentFactory('increment-button', /*html*/`
  <style>
    button {
      background: var(--btn-color, #3498db);
      padding: var(--btn-padding, 8px 16px);
      border-radius: 4px;
    }
  </style>
  <button @click="increment">
    Count: <span x-text="$val"></span>
  </button>
`, () => ({
  increment() {
    this.$val = (this.$val || 0) + 1;
  }
}));
```

### Use in HTML:
```html
<increment-button 
  style="--btn-color: #2ecc71; --btn-padding: 12px 24px;"
  x-model="counter">
</increment-button>
```

## 3. Motivation

We developed this library while working on a large-scale modular form system built with AlpineJS. We needed a way to create reusable form components that:

1. Maintain Alpine's reactivity model
2. Support two-way data binding via `x-model`
3. Provide proper encapsulation (styles and DOM)
4. Allow customization through CSS variables
5. Simplify component creation with minimal boilerplate

Traditional web components felt too verbose, while Alpine alone lacked encapsulation. This library bridges the gap, allowing you to create Alpine-powered components with the same declarative syntax you love.

## 4. Advanced Usage Guide

### Component Definition
Create components using HTML templates with Alpine directives:
```javascript
WebComponentFactory('color-preview', /*html*/`
  <style>
    .preview {
      width: 100px;
      height: 100px;
      border: 2px solid #333;
    }
  </style>
  <div class="preview" :style="{backgroundColor: $val}">
    <span x-text="$val" :style="{color: textColor}"></span>
  </div>
`, () => ({
  // Computed property
  get textColor() {
    return isDarkColor(this.$val) ? 'white' : 'black';
  }
}));
```

### Magic Properties
Special properties for component interaction:

| Property       | Description                                 | Example |
|----------------|---------------------------------------------|---------|
| `$val`         | Get/set x-model bound value                 | `this.$val = newValue` |
| `$(selector)`  | Shorthand for shadowRoot.querySelector     | `this.$('button').disabled = true` |
| `$$(selector)` | Shorthand for shadowRoot.querySelectorAll  | `this.$$('input').forEach(...)` |
| `$component`   | Reference to light DOM component instance  | `this.$component.getAttribute('id')` |

### Slot Support
Distribute content with named slots:
```javascript
WebComponentFactory('modal-dialog', /*html*/`
  <style>
    .modal { /* styles */ }
  </style>
  <div class="modal">
    <header>
      <slot name="header"></slot>
    </header>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
`);

// Usage
<modal-dialog>
  <h2 slot="header">Confirmation</h2>
  <div slot="content">Are you sure?</div>
  <button slot="footer">Confirm</button>
</modal-dialog>
```

### External Stylesheets
Import CSS frameworks like Tailwind:
```javascript
WebComponentFactory('styled-card', /*html*/`
  <link rel="stylesheet" href="https://cdn.tailwindcss.com">
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <slot></slot>
    </div>
  </div>
`);
```

### Reactive Data Flow
```javascript
WebComponentFactory('user-form', /*html*/`
  <form @submit.prevent="submit">
    <input x-model="username" placeholder="Username">
    <input x-model="email" type="email" placeholder="Email">
    <button type="submit">Submit</button>
  </form>
`, () => ({
  username: '',
  email: '',
  submit() {
    // Emit custom event
    this.$component.dispatchEvent(new CustomEvent('submit', {
      detail: { username: this.username, email: this.email }
    }));
    
    // Update bound value
    this.$val = { username: this.username, email: this.email };
  }
}));
```

### Lifecycle Hooks
```javascript
WebComponentFactory('data-loader', /*html*/`
  <div x-text="status"></div>
`, () => ({
  status: 'Loading...',
  async mounted() {
    try {
      const data = await fetchData();
      this.status = 'Loaded!';
      this.$val = data;
    } catch {
      this.status = 'Error!';
    }
  }
}));
```

### Customizable Components
```javascript
WebComponentFactory('progress-bar', /*html*/`
  <style>
    .progress {
      height: var(--progress-height, 20px);
      background: var(--track-color, #eee);
    }
    .bar {
      height: 100%;
      width: calc(100% * var(--progress));
      background: var(--bar-color, #3498db);
    }
  </style>
  <div class="progress">
    <div class="bar"></div>
  </div>
`, () => ({
  // Initialize from attribute
  get progress() {
    return parseFloat(this.$component.getAttribute('value') || 0) / 100;
  }
}));

// Usage
<progress-bar 
  value="75"
  style="
    --progress-height: 30px;
    --track-color: #f0f0f0;
    --bar-color: #2ecc71;
  ">
</progress-bar>
```

### Form Component Example
```javascript
WebComponentFactory('custom-input', /*html*/`
  <style>
    :host {
      display: block;
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
      color: var(--label-color, #333);
    }
    input {
      width: 100%;
      padding: var(--input-padding, 8px);
      border: 2px solid var(--border-color, #ddd);
      border-radius: var(--border-radius, 4px);
    }
  </style>
  <label x-text="label"></label>
  <input 
    type="text" 
    :value="$val" 
    @input="$val = $event.target.value"
    :placeholder="placeholder">
`, () => ({
  // Get attributes from host
  get label() {
    return this.$component.getAttribute('label') || '';
  },
  get placeholder() {
    return this.$component.getAttribute('placeholder') || '';
  }
}));

// Usage
<custom-input 
  label="Email Address"
  placeholder="user@example.com"
  style="
    --label-color: #2c3e50;
    --border-color: #3498db;
    --input-padding: 12px;
  "
  x-model="email">
</custom-input>
```

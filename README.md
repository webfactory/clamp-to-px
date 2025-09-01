# clampToPx Utility

The `clampToPx` function is a utility for calculating clamped CSS values in JavaScript, combining `rem` and viewport units such as `vw` or `vi`. This function is ideal for dynamically translating CSS responsive sizes to pixel values when pixels are necessary (see example).

## Installation

```
npm install @webfactoryde/clamp-to-px
```


## Usage

Import the `clampToPx` function in your module(s) and call it with your desired parameters and an optional config object:

```javascript
import clampToPx from '@webfactoryde/clamp-to-px';

// Basic usage with default settings (unit 'vw', viewportWidth = window.innerWidth):
const minRem = 1;
const preferredFormula = '1.5 + 0.5'; // 1.5rem + 0.5vw
const maxRem = 3;
const pxValue = clampToPx(minRem, preferredFormula, maxRem);
console.log(pxValue); // Output: Clamped pixel value

// Custom usage with options object
const options = {
  unit: 'vi',           // Use 'vi' instead of 'vw'
  viewportWidth: 900    // Override window.innerWidth
};
const pxValueCustom = clampToPx(minRem, preferredFormula, maxRem, options);
console.log(pxValueCustom); // Output: Clamped pixel value using 'vi' and 900px viewport
```


## API

```javascript
clampToPx(minRem, preferredFormula, maxRem, options?)
```

- **minRem** (`number`): Minimum value in rem units.
- **preferredFormula** (`string`): Formula string, e.g. `'1.5 + 0.5'`.
- **maxRem** (`number`): Maximum value in rem units.
- **options** (`object`, optional):
    - **unit** (`string`): Viewport unit to use ('vw', 'vi', etc.). Default is `'vw'`.
    - **viewportWidth** (`number`): Viewport width in pixels. Default is `window.innerWidth`.


## Example

```javascript
// Clamp between 16px and 48px using formula "1.5rem + 0.5vw" (assuming root font size = 16px, viewport = 1200px)
const result = clampToPx(1, '1.5 + 0.5', 3);
// Output: 30

// Clamp with a custom viewport and unit
const resultCustom = clampToPx(1, '2 + 1', 4, { unit: 'vi', viewportWidth: 800 });
// Output: 40
```

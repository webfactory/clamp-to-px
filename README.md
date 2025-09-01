# clampToPx Utility

The `clampToPx` function is a utility for calculating clamped CSS values in JavaScript, combining `rem` and viewport units such as `vw` or `vi`. This function is ideal for dynamically translating responsive sizes to pixel values when pixels are necessary, e.g. in a JS plugin.

## Installation

```
npm install @webfactoryde/clamp-to-px
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

## Usage

Import the `clampToPx` function in your module(s) and call it with your desired parameters and an optional config object:

```javascript
import clampToPx from '@webfactoryde/clamp-to-px';

// Clamp between 16px and 48px using formula "1.5rem + 0.5vw" (assuming root font size = 16px, viewport = 1200px)
const result = clampToPx(1, '1.5rem + 0.5vw', 3);
// Output: 30

// Clamp with a custom viewport and unit
const resultCustom = clampToPx(1, '2rem + 1vi', 4, { unit: 'vi', viewportWidth: 800 });
// Output: 40

```

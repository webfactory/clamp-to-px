// clampToPx.test.js

global.window = Object.create(window);
Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
        fontSize: '16px'
    })
});
Object.defineProperty(window, 'innerWidth', {
    value: 1200
});

import clampToPx from '../src/clamp-to-px.js';

describe('clampToPx', () => {
    test('calculates and clamps within min-max', () => {
        // 1rem = 16px; viewport = 1200px
        const result = clampToPx(1, '1.5 + 0.5', 3);
        // min = 16, max = 48, formula = 1.5*16 + 0.5*12 = 24 + 6 = 30
        expect(result).toBe(30);
    });

    test('respects min clamp', () => {
        // preferred formula yields less than min
        const result = clampToPx(3, '1 + 0', 6);
        // min = 48, preferred = 16, clamps to 48
        expect(result).toBe(48);
    });

    test('respects max clamp', () => {
        // preferred formula yields more than max
        const result = clampToPx(1, '4 + 10', 2);
        // min = 16, max = 32, vw = 16, formula = 4*16 + 10*16 = 64 + 160 = 224, clamp to 32
        expect(result).toBe(32);
    });

    test('accepts formula with units', () => {
        const result = clampToPx(1.6875, '1.6108rem + 0.3409vw', 1.875);
        expect(result).toBe(29.863599999999998);
    });

    test('accepts formula with units and custom viewportWidth argument', () => {
        const result = clampToPx(1.6875, '1.6108rem + 0.3409vw', 1.875, {viewportWidth: 800});
        expect(result).toBe(28.5);
    });
});

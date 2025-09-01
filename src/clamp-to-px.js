/**
 * Calculates a pixel value for a given CSS clamp() expression and viewport width.
 *
 * @param {number} minRem - Minimum value in rem.
 * @param {string} preferredFormula - Formula string, e.g. '1.5 + 0.5'.
 * @param {number} maxRem - Maximum value in rem.
 * @param {Object} [options] - Optional config: { unit: 'vw'|'vi', viewportWidth: number }
 * @param {string} [options.unit='vw'] - Viewport unit to use ('vw', 'vi', etc.)
 * @param {number} [options.viewportWidth=window.innerWidth] - Viewport width in px
 * @returns {number} Clamped pixel value.
 */
export default function clampToPx(
    minRem,
    preferredFormula,
    maxRem,
    options = {}
) {
    const remToPixels = getRootFontSize();
    const minPx = minRem * remToPixels;
    const maxPx = maxRem * remToPixels;

    const unit = options.unit || 'vw';
    const viewportWidth =
        typeof options.viewportWidth === 'number'
            ? options.viewportWidth
            : window.innerWidth;

    // Currently only works for units based on viewport width ('vw', 'vi')
    // 1vw = 1% of viewport width
    // 1vi = 1% of viewport width (in most cases, but may differ in edge cases)
    const viewportUnitToPixels = viewportWidth / 100;

    // Calculate the preferred value based on formula
    const [constantRem, coef] = preferredFormula
        .split(' + ')
        .map(str => parseFloat(str));
    const constantPx = constantRem * remToPixels;
    const viewportValue = coef * viewportUnitToPixels;

    const preferredPx = constantPx + viewportValue;

    return clamp(minPx, preferredPx, maxPx);
};

const getRootFontSize = () =>
    parseFloat(window.getComputedStyle(document.documentElement).fontSize);

const clamp = (min, preferred, max) =>
    Math.min(Math.max(min, preferred), max);

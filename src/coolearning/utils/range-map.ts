/**
 * @description transpose a value with its current scale to a new scale
 *      inspired from processing/p5.js source code
 * @see https://github.com/processing/p5.js/blob/master/src/math/calculation.js#L450
 */
export function rangeMap (
    n: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number,
): number {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2
}
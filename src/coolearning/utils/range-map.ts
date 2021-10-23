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
    if (typeof n !== 'number') throw new Error ('n is not a number')
    if (typeof start1 !== 'number') throw new Error ('start1 is not a number')
    if (typeof stop1 !== 'number') throw new Error ('stop1 is not a number')
    if (typeof start2 !== 'number') throw new Error ('start2 is not a number')
    if (typeof stop2 !== 'number') throw new Error ('stop2 is not a number')

    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2
}
// https://github.com/processing/p5.js/blob/master/src/math/calculation.js#L450
export function rangeMap(n, start1, stop1, start2, stop2) {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2
}
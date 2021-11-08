import * as d3 from 'd3';

/**
 * Select the input canvas and return the canvas element.
 *
 * @param {number} id The id of the canvas element.
 * @returns {HTMLDivElement} The canvas element.
 */
export function selectInputCanvas (id: number): HTMLDivElement {
  return d3.select (`#canvas-${id}`)[0][0] as HTMLDivElement;
}

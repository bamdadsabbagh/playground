import * as d3 from 'd3';

export function selectInputCanvas (id: number) {
  return d3.select (`#canvas-${id}`)[0][0] as HTMLDivElement;
}
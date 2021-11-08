/**
 * Updates the weight of the given node.
 *
 * @param {number} weightIndex - The index of the weight to update.
 * @param {number} newWeight - The new weight.
 */
export function updateWeight (weightIndex: number, newWeight: number): void {
  const weight = document.querySelectorAll ('.neuron-card__weight')[weightIndex] as HTMLInputElement;
  weight.value = newWeight.toPrecision (2);
}

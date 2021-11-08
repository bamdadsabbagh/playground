export function updateWeight (weightIndex, newWeight) {
  const weight = document.querySelectorAll ('.neuron-card__weight')[weightIndex] as HTMLInputElement;
  weight.value = newWeight.toPrecision (2);
}

export const neuronCard = Object.create (null);

neuronCard.weightSelector = '.neuron-card__weight';
neuronCard.weights = null;

neuronCard.init = function () {
  this.weights = document.querySelectorAll (this.weightSelector);
};

neuronCard.updateWeight = function (index, weight) {
  this.weights[index].value = weight.toPrecision (2);
};

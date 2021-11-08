import { dialog } from './dialog';
import { modal } from './modal';
import { buttons } from './buttons';
import { notifications } from './notifications';
import { neuronCard } from './neuron-card';

export const ui = Object.create (null);

/**
 * Initialize the UI.
 */
ui.init = async function () {
  this.addMaterialScript ();

  await notifications.init ();
  modal.init ();
  buttons.init ();
  dialog.init ();
  neuronCard.init ();

  notifications.notify ('test');
};

/**
 * Add missing Material Design Lite script to the page.
 *
 * @todo this should be a local resource
 */
ui.addMaterialScript = function () {
  const script = document.createElement ('script');
  script.src = 'https://code.getmdl.io/1.3.0/material.min.js';

  script.onload = () => {
    window.componentHandler.upgradeAllRegistered ();
  };

  document.head.appendChild (script);
};

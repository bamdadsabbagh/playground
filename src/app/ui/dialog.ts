import { MaterialList } from './components/base/material-list';
import { MaterialChip } from './components/base/material-chip';
import { MaterialDialog } from './components/base/material-dialog';

export const dialog = Object.create (null);

dialog.modal = {
  container: null,
  content: null,
};

/**
 * Initialize settings.
 */
dialog.init = function () {
  this.createFutureDialog ();
};

/**
 * Create future dialog.
 *
 * @todo programmed for future use
 */
dialog.createFutureDialog = function () {
  const list = MaterialList ([
    'first',
    'second',
    MaterialChip (
      'button',
      'hello',
      // eslint-disable-next-line no-console
      () => console.log ('button'),
    ),
    MaterialChip (
      'range',
      '75',
      // eslint-disable-next-line no-console
      () => console.log ('range'),
    ),
  ]);

  const dialog = MaterialDialog (
    'Settings',
    list,
    650,
  );

  document.body.appendChild (dialog);
};

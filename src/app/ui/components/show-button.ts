import { MaterialIcon } from './base/material-icon';
import { MaterialButton } from './base/material-button';
import { modal } from '../modal';

/**
 * Button to show the settings panel.
 *
 * @returns {HTMLButtonElement} The button.
 */
export function ShowButton (): HTMLButtonElement {
  const icon = MaterialIcon ('settings');

  const button = MaterialButton (icon, () => modal.show ());
  button.style.display = 'block';
  button.style.position = 'fixed';
  button.style.bottom = '6px';
  button.style.left = '6px';

  return button;
}

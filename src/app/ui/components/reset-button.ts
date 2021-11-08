import { state } from '../../../coolearning/state';
import { MaterialIcon } from './base/material-icon';
import { MaterialButton } from './base/material-button';

/**
 * Button to reset the settings.
 *
 * @returns {HTMLButtonElement} The button.
 */
export function ResetButton (): HTMLButtonElement {
  const icon = MaterialIcon ('eject');
  icon.style.marginTop = '-1px';

  const button = MaterialButton (icon, () => state.reset ());
  button.style.display = 'block';
  button.style.position = 'fixed';
  button.style.bottom = '6px';
  button.style.left = '52px';

  return button;
}

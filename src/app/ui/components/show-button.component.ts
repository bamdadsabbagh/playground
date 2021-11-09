import { IconMaterialComponent } from './material/icon.material.component';
import { ButtonMaterialComponent } from './material/button.material.component';
import { modal } from '../modal';

/**
 * Button to show the settings panel.
 *
 * @returns {HTMLButtonElement} The button.
 */
export function ShowButtonComponent (): HTMLButtonElement {
  const icon = IconMaterialComponent ('settings');

  const button = ButtonMaterialComponent (icon, () => modal.show ());
  button.style.display = 'block';
  button.style.position = 'fixed';
  button.style.bottom = '6px';
  button.style.left = '6px';

  return button;
}

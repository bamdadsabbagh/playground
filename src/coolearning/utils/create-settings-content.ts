import { getSettingsContent } from './get-settings-content';
import { CLASSES, PARAMETERS } from '../constants';
import { buildArrayFromCollection } from './build-array-from-collection';
import { state } from '../state';

/**
 * @description create content in settings UI
 */
export function createSettingsContent (): void {

  const content = getSettingsContent ();

  // styles
  content.style.display = 'flex';
  content.style.flexDirection = 'column';
  content.style.justifyContent = 'center';
  content.style.alignItems = 'center';
  content.style.textAlign = 'center';
  content.style.gridGap = '0.5em';

  // first row
  content.innerHTML = `
    <div style="
        display: grid;
        grid-template-columns: repeat(4, 20vw);
        font-weight: bold;
        background: gainsboro;
    ">
      <div>Parameter</div>
      <div>Control</div>
      <div>Control Type</div>
      <div>Actions</div>
    </div>
  `;

  // next rows with parameters and controls
  // skeleton only
  Object.keys (PARAMETERS).forEach ((parameter) => {
    content.innerHTML += `
      <div class="${CLASSES.action}" style="
        display: grid;
        grid-template-columns: repeat(4, 20vw);
      ">
        <div>${parameter}</div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  });

  // actions listeners
  const actions = buildArrayFromCollection (document.getElementsByClassName (CLASSES.action));

  actions.forEach (action => {
    const parameter: string = action.firstElementChild.innerText;
    state.render (parameter);
  });
}

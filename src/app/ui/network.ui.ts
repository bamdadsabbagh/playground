import { Parameter } from '../../coolearning/types';
import { getParameterElement } from '../../coolearning/utils/get-parameter-element';
import { isTabActive } from '../../coolearning/utils/is-tab-active';
import { rangeMap } from '../../coolearning/utils/range-map';

export const networkUi = Object.create (null);

networkUi.drawParameter = function (parameter: Parameter, value: number): void {
  if (typeof parameter === 'undefined') {
    throw new Error ('parameter is not defined');
  }
  if (typeof value === 'undefined') {
    throw new Error ('value is not defined');
  }
  if (!isTabActive ()) {
    return;
  }

  const element = getParameterElement ({ parameter });

  switch (element.tagName) {
    case 'SELECT': {
      const length = element.children.length - 1;
      const v = rangeMap (value, 0, 127, 0, length);
      const n = parseInt (v.toString ());
      const areDifferent = n !== element.selectedIndex;

      if (areDifferent) {
        element.selectedIndex = n;
        element.dispatchEvent (new Event ('change'));
      }

      break;
    }

    case 'BUTTON': {
      element.click ();
      break;
    }

    case 'INPUT': {
      const min = parseInt (element.min);
      const max = parseInt (element.max);
      const step = parseInt (element.step);

      const v = rangeMap (value, 0, 127, min, max);
      const n = parseInt (v.toString ());
      const isStep = (n % step) === 0;
      const areDifferent = n !== parseInt (element.value);

      if (isStep && areDifferent) {
        element.value = n.toString ();
        element.dispatchEvent (new Event ('input'));
      }

      break;
    }

    case 'LABEL': {
      if (value === 0) {
        return;
      }
      element.click ();
      break;
    }

    default:
      throw new Error (`${element.tagName} target not handled`);
  }
};

import { ShowButton } from './components/show-button';
import { ResetButton } from './components/reset-button';

export const buttons = Object.create (null);

buttons.show = null;
buttons.reset = null;

buttons.init = function () {
  this.show = ShowButton ();
  document.body.insertBefore (this.show, document.body.firstChild);

  this.reset = ResetButton ();
  document.body.insertBefore (this.reset, document.body.firstChild);
};

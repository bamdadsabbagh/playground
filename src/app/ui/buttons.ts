import { ShowButtonComponent } from './components/show-button.component';
import { ResetButtonComponent } from './components/reset-button.component';

export const buttons = Object.create (null);

buttons.show = null;
buttons.reset = null;

buttons.init = function () {
  this.show = ShowButtonComponent ();
  document.body.insertBefore (this.show, document.body.firstChild);

  this.reset = ResetButtonComponent ();
  document.body.insertBefore (this.reset, document.body.firstChild);
};

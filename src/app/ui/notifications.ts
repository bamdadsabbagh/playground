import { Snackbar } from './components/snackbar';

export const notifications = Object.create (null);

notifications.snackbar = null;

notifications.init = async function () {
  this.snackbar = Snackbar ();
  document.body.appendChild (this.snackbar);
  await this.waitForMaterialScripts ();
};

notifications.waitForMaterialScripts = async function () {
  return new Promise ((resolve) => {
    const sender = this.snackbar?.MaterialSnackbar?.showSnackbar;
    if (sender) {
      resolve (sender);
    } else {
      setTimeout (() => {
        this.waitForMaterialScripts ().then (resolve);
      }, 100);
    }
  });
};

notifications.notify = function (
  message: string,
  timeout = 2000,
  actionHandler: (e: Event) => void = () => undefined,
  actionText: string = null,
) {
  if (typeof message !== 'string') {
    throw new Error ('message is not a string');
  }

  const hasAction = actionHandler && actionText;
  const options = {
    message,
    timeout,
    actionHandler: hasAction ? actionHandler : undefined,
    actionText: hasAction ? actionText : undefined,
  };
  this.snackbar.MaterialSnackbar.showSnackbar (options);
};

import { mappings } from './mappings';

/**
 * Object to store the state of the application.
 * Powered by localStorage.
 */
export const storage = Object.create (null);

storage.localStorageIdentifier = 'coolearning';

Object.defineProperty (storage, 'localStorage', {
  get (): string {
    return window.localStorage[this.localStorageIdentifier];
  },
  set (string: string) {
    window.localStorage[this.localStorageIdentifier] = string;
  },
});

/**
 * Initializes the state object.
 *
 * @param {boolean} [forceReset=false] - Forces the state to be reset.
 */
storage.init = function (forceReset = false) {
  if (forceReset) {
    this.resetState ();
  } else if (this.isLocalStorageDefined ()) {
    this.parseLocalStorage ();
  } else {
    this.initializeState ();
  }
};

/**
 * Initializes the state.
 */
storage.initializeState = function () {
  //
};

/**
 * Resets the state.
 */
storage.resetState = function () {
  this.initializeState ();
  this.reloadWindow ();
};

/**
 * Loads the state from local storage.
 *
 * @returns {boolean} - Whether the browser supports local storage.
 */
storage.isLocalStorageDefined = function (): boolean {
  return typeof window.localStorage[this.localStorageIdentifier] !== 'undefined';
};

/**
 * Parse the state from local storage.
 *
 * @returns {*} - The parsed state from local storage.
 */
storage.parseLocalStorage = function () {
  let json = null;
  try {
    json = JSON.parse (this.localStorage);
  } catch (error) {
    throw new Error ('local storage could not be parsed');
  }
  return json;
};

/**
 * Reloads the window.
 */
storage.reloadWindow = function () {
  window.localStorage.removeItem (this.localStorageIdentifier);
  window.location.reload ();
};

storage.fetchStates = function () {
  return {
    mapping: mappings.state,
  };
};

storage.stringifyState = function () {
  return JSON.stringify (this.fetchStates ());
};

storage.saveToLocalStorage = function () {
  this.localStorage = this.stringifyState ();
};

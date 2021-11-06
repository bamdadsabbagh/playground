import { mapping } from './mapping';

export const state = Object.create (null);

state.localStorageIdentifier = 'coolearning';

Object.defineProperty (state, 'localStorage', {
  get: function (): string {
    return window.localStorage[this.localStorageIdentifier];
  },
  set: function (string: string) {
    window.localStorage[this.localStorageIdentifier] = string;
  },
});

/**
 * @description Initializes the state object.
 * @param {boolean} [forceReset=false] - Forces the state to be reset.
 */
state.init = function (forceReset: boolean = false) {
  if (forceReset) {
    this.resetState ();
  } else if (this.isLocalStorage ()) {
    this.parseLocalStorage ();
  } else {
    this.initializeState ();
  }
};

/**
 * @descriptoin Initializes the state.
 */
state.initializeState = function () {
  //
};

/**
 * @description Resets the state.
 */
state.resetState = function () {
  this.initializeState ();
  this.reloadWindow ();
};

/**
 * @description Loads the state from local storage.
 */
state.isLocalStorage = function (): boolean {
  return typeof window.localStorage[this.localStorageIdentifier] !== 'undefined';
};

/**
 * @description Parse the state from local storage.
 */
state.parseLocalStorage = function () {
  let json = null;
  try {
    json = JSON.parse (this.localStorage);
  } catch (error) {
    throw new Error ('local storage could not be parsed');
  }
  return json;
};

/**
 * @description Reloads the window.
 */
state.reloadWindow = function () {
  window.localStorage.removeItem (this.localStorageIdentifier);
  window.location.reload ();
};

state.fetchStates = function () {
  return {
    mapping: mapping.state,
  };
};

state.stringifyState = function () {
  return JSON.stringify (this.fetchStates ());
};

state.saveToLocalStorage = function () {
  this.localStorage = this.stringifyState ();
};

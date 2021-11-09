import { mappings } from './mappings';
import { storage } from './storage';

/**
 * Global state object for the application.
 */
export const state = Object.create (null);

state.mappings = mappings;
state.store = storage;

// use stores for variables that need to be accessed in multiple components
// https://svelte.dev/tutorial/writable-stores
import { writable } from 'svelte/store';

export const count = writable(0);

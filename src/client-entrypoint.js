import App from './blocks/block/index.svelte';

/**
 * Boots frontend application &
 * hydrates it into server side html.
 */
async function bootApp() {
  const root = document.getElementById('app');
  const state = window.__STATE__ || {};
  new App({
    props: state,
    target: root,
    hydrate: true,
  });
}

bootApp();

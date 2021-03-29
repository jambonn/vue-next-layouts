import { createApp } from './main'
import { layout } from './utils/layout'

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// wait until router is ready before mounting to ensure hydration match
(async (r, a, s) => {
  await r.isReady();

  r.beforeResolve(async (to, from, next) => {
    const resolve = r.resolve(to);
    const globalComponent = resolve.meta.globalComponent || '';
    await layout({ metaComponent: globalComponent, app: a, store: s });

    next()
  })

  // Mount
  a.mount('#app', true);
})(router, app, store);

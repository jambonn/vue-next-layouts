import { createApp } from './main'
import { layout } from './utils/layout'
import { isObjectDiff } from './utils/object'

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

// wait until router is ready before mounting to ensure hydration match
(async (r, a, s) => {
  await r.isReady();

  r.beforeResolve(async (to, from, next) => {
    let diffed = false;
    const resolve = r.resolve(to);
    const matched = resolve.matched;
    const current = router.currentRoute.value;
    const components = [];
    const prefetch = resolve.meta.prefetch || '';

    switch (prefetch) {
      case 'param': {
        diffed = isObjectDiff(resolve.params, current.params);
        break;
      }
      case 'query': {
        diffed = isObjectDiff(resolve.query, current.query);
        break;
      }
      default: {
        //
      }
    }

    matched.filter((c, i) => {
      if (diffed || (diffed = current.matched[i] !== c)) {
        components.push(...Object.values(c.components));
      }
    });

    // Not diff ~> go to route
    if (!components.length) {
      return next();
    }

    if (s.state.error) {
      s.dispatch('setError', null)
    }

    try {
      const context = Object.assign({}, a.context, { route: resolve });
      await Promise.all(components.map(({ asyncData }) => asyncData && asyncData(context)));

      const globalComponent = resolve.meta.globalComponent || '';
      await layout({
        metaComponent: globalComponent,
        app: a,
        store: s,
        context
      });
      next();
    } catch (err) {
      s.dispatch('setError', { code: err && err.code ? err.code : 500 })
      next();
    }
  })

  // Mount
  a.mount('#app', true);
})(router, app, store);

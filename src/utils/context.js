/**
 * Set context
 * @param app
 * @param context
 */
export function setContext(app, context) {
  if (!app.context) {
    app.context = {
      app: app,
      route: context.route,
      store: context.store,
      query: context.route.query,
    };
  }

  if (context.ssrContext) {
    app.context.ssrContext = context.ssrContext;
  }

  if (typeof window !== 'undefined') {
    app.context.shopbaseState = window.__INITIAL_STATE__;
  }

  app.config.globalProperties.context = app.context;
}

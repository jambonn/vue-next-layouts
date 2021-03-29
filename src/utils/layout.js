export async function layout ({ metaComponent, app, store, context }) {
  if (metaComponent) {
    const component = app.component(metaComponent);
    if (!component) {
      return;
    }

    let layout = component.layout || '';
    if (!layout && component.__asyncLoader) {
      const asyncLoader = await component.__asyncLoader()
      layout = asyncLoader.layout;
    }

    if (typeof layout === 'function') {
      layout = layout(context)
    }

    store.dispatch('setLayout', layout || 'LayoutDefault');
  }
}

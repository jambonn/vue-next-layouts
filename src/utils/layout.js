export async function layout ({ metaComponent, app, store }) {
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

    store.dispatch('setLayout', layout || 'LayoutDefault');
  }
}

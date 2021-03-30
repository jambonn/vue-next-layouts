import { renderToString } from '@vue/server-renderer'
import { createApp } from './main'
import { layout } from './utils/layout'

export async function render(context, manifest) {
  const { app, router, store } = createApp(context)

  // set the router to the desired URL before rendering
  router.push(context.url)
  await router.isReady()

  const current = router.currentRoute.value
  if (!current.matched.length) {
    return Promise.reject({ code: 404 });
  }

  const components = [];
  current.matched.flatMap((record) => {
    components.push(...Object.values(record.components));
  });

  try {
    await Promise.all(components.map(({ asyncData }) => asyncData && asyncData(app.context)));

    const globalComponent = current.meta.globalComponent || '';
    await layout({
      metaComponent: globalComponent,
      context: Object.assign({}, app.context),
      app,
      store,
    });
    context.state = store.state;
  } catch (err) {
    return Promise.reject({ code: err && err.code ? err.code : 500, err: err });
  }

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx = {}
  const html = await renderToString(app, ctx)

  // the SSR manifest generated by Vite contains module -> chunk/asset mapping
  // which we can then use to determine what files need to be preloaded for this
  // request.
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  return [html, preloadLinks]
}

function renderPreloadLinks(modules, manifest) {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else {
    // TODO
    return ''
  }
}

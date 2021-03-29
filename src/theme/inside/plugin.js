import { defineAsyncComponent } from 'vue'
import PageCollections from './pages/Collections.vue'

export const ShopBaseThemePlugin = {
  install(app) {
    app.component('LayoutDark', defineAsyncComponent(() => import('./layouts/Dark.vue')))
    app.component('LayoutRed', defineAsyncComponent(() => import('./layouts/Red.vue')))

    app.component('PageHome', defineAsyncComponent(() => import('./pages/Home.vue')))
    app.component('PageCollections', PageCollections)
    app.component('PageAbout', defineAsyncComponent(() => import('./pages/About.vue')))
  }
}

import { createStore as baseCreateStore, useStore as baseUseStore } from 'vuex';
import { actions, mutations } from './bootstrap';

export function createStore() {
  return baseCreateStore({
    state: {
      layout: 'LayoutDefault',
    },
    actions,
    mutations,
    modules: {},
  })
}

export function useStore() {
  return baseUseStore();
}

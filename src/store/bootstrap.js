export const actions = {
  setLayout ({ commit }, layout) {
    commit('setLayout', layout);
  }
}

export const mutations = {
  setLayout (state, layout) {
    state.layout = layout;
  }
}

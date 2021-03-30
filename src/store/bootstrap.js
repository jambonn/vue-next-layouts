export const actions = {
  setLayout ({ commit }, layout) {
    commit('setLayout', layout);
  },
  setError ({ commit }, error) {
    commit('setError', error);
  }
}

export const mutations = {
  setLayout (state, layout) {
    state.layout = layout;
  },
  setError (state, error) {
    state.error = error;
  }
}

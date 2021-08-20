import { createStore } from "vuex";

export default createStore({
  state: {
    featuresList: [],
    filteredFeatureList: [],
    // map: [],
  },
  //je créé un getters nommé qui sert a "get" les éléments de mon state, ici le nom
  getters: {
    GET_FEATURESNAME(state) {
      return state.featuresList.flat().map((feature) => feature.values_.name);
    },
  },
  mutations: {
    ADD_MAP(state, map) {
      state.map = map;
    },

    ADD_FEATURES(state, feature) {
      state.featuresList.push(feature);
    },
  },
  actions: {
    LOAD_FEATURES(context, feature) {
      context.commit("ADD_FEATURES", feature);
    },
  },
});

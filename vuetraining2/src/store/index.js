import { createStore } from "vuex";

export default createStore({
  state: {
    featuresList: [],
    filteredFeatureList: [],
    featureCoords: [],
  },
  //je créé un getters nommé qui sert a "get" les éléments de mon state, ici le nom
  getters: {
    GET_ALLFEATURES(state) {
      return state.featuresList.flat();
    },
    GET_FEATURESNAME(state) {
      return state.featuresList.flat().map((feature) => feature.values_.name);
    },
    GET_FEATURESCOORDS(state) {
      return state.featureCoords
        .flat()
        .map((feature) => feature.values_.geometry.flatCoordinates);
    },
  },
  mutations: {
    ADD_FEATURES(state, feature) {
      state.featuresList.push(feature);
    },
    ADD_FEATURES_COORDS(state, coords) {
      state.featureCoords.push(coords);
    },
  },
  actions: {
    LOAD_FEATURES(context, feature) {
      context.commit("ADD_FEATURES", feature);
    },
    LOAD_FEATURES_COORDS(context, feature) {
      context.commit("ADD_FEATURES", feature);
    },
  },
});

import { createStore } from "vuex";

export default createStore({
  state: {
    featuresList: [],
    featureCoords: [],
    currentSelectedFeature: null,
  },
  //je créé un getters nommé qui sert a "get" les éléments de mon state, ici le nom
  getters: {
    GET_ALLFEATURES(state) {
      return state.featuresList.flat();
    },
    GET_SELECTED_FEATURE(state) {
      return state.currentSelectedFeature;
    },
  },
  mutations: {
    ADD_FEATURES(state, feature) {
      state.featuresList = feature;
    },
    CHANGE_SELECTED_FEATURE(state, feature) {
      state.currentSelectedFeature = feature;
    },
  },
  actions: {
    LOAD_FEATURES(context, feature) {
      context.commit("ADD_FEATURES", feature);
    },
    SELECT_FEATURE(context, feature) {
      context.commit("CHANGE_SELECTED_FEATURE", feature);
    },
  },
});

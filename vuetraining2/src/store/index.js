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
    GET_SELECTED_FEATURE_NAME(state) {
      return state.currentSelectedFeature.values_.name;
    },
  },
  mutations: {
    ADD_FEATURES(state, features) {
      state.featuresList = features;
    },
    CHANGE_SELECTED_FEATURE(state, feature) {
      state.currentSelectedFeature = feature;
    },
  },
  actions: {
    LOAD_FEATURES(context, features) {
      context.commit("ADD_FEATURES", features);
    },
    SELECT_FEATURE(context, feature) {
      context.commit("CHANGE_SELECTED_FEATURE", feature);
    },
  },
});

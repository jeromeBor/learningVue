import { createStore } from "vuex";

export default createStore({
  state: {
    featuresList: [],
    featureCoords: [],
    currentSelectedFeature: null,
    isMapLoading: false,
    layers: [],
  },
  //je créé un getters nommé qui sert a "get" les éléments de mon state, ici le nom
  getters: {
    GET_ALLFEATURES(state) {
      return state.featuresList[0];
    },
    GET_SELECTED_FEATURE(state) {
      return state.currentSelectedFeature;
    },
    GET_SELECTED_FEATURE_NAME(state) {
      if (state.currentSelectedFeature) {
        return state.currentSelectedFeature.map(
          (featurename) => featurename.properties.name
        );
      }
      return [];
    },
    GET_SELECTED_FEATURE_INFOS(state) {
      if (state.currentSelectedFeature) {
        return state.currentSelectedFeature.map(
          (featurename) => featurename.properties.population
        );
      }
      return [];
    },
    GET_LOADING_STATE_MAP(state) {
      return state.isMapLoading;
    },
    GET_LAYER_INFOS(state) {
      return state.layers;
    },
  },

  mutations: {
    ADD_FEATURES(state, features) {
      state.featuresList.push(features);
    },
    CHANGE_SELECTED_FEATURE(state, feature) {
      state.currentSelectedFeature = feature;
    },
    CHANGE_LOADING_STATE(state, isLoading) {
      state.isMapLoading = isLoading;
    },
    ADD_LAYERS(state, layers) {
      state.layers = layers;
    },
  },

  actions: {
    LOAD_FEATURES(context, features) {
      context.commit("ADD_FEATURES", features);
    },
    SELECT_FEATURE(context, feature) {
      context.commit("CHANGE_SELECTED_FEATURE", feature);
    },
    TOGGLE_LOADING(context, isLoading) {
      context.commit("CHANGE_LOADING_STATE", isLoading);
    },
    LOAD_LAYERS(context, layers) {
      context.commit("ADD_LAYERS", layers);
    },
  },
});

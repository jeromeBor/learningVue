import { createStore } from "vuex";

export default createStore({
  state: {
    featuresList: [],
    // filters: [(feature, searchInput)=> {e},(e, pay)=> {e}],
    filteredFeaturesList: [],
    selectedFeatures: null,
    currentSelectedFeature: null,
    isMapLoading: false,
    currentSelectedCountry: "all", // down drop layer filter
    currentSelectedRadioFilter: "all",
    countriesData: [
      {
        id: "france",
        url: "http://localhost:8080/france.geojson",
        fillColor1: "#C0B298",
        fillColor2: "#A4778B",
        fillColor3: "#AA4586",
        strokeColor: "#fff",
        textColor: "#fff",
      },
      {
        id: "germany",
        url: "http://localhost:8080/germany.geojson",
        fillColor1: "#50C5B7",
        fillColor2: "#6184D8",
        fillColor3: "#533A71",
        strokeColor: "#fff",
        textColor: "#fff",
      },
    ],
  },
  getters: {
    GET_ALLFEATURES(state) {
      return state.featuresList[0];
    },

    GET_FILTERED_FEATURES(state) {
      return state.filteredFeaturesList[0];
    },

    GET_SELECTED_FEATURE(state) {
      return state.currentSelectedFeature;
    },

    //POPUP INFOS
    GET_SELECTED_FEATURE_NAME(state) {
      if (state.currentSelectedFeature) {
        return state.currentSelectedFeature.map(
          (featurename) => featurename.values_.name
        );
      }
      return [];
    },
    // POPUP INFOS
    GET_SELECTED_FEATURE_INFOS(state) {
      if (state.currentSelectedFeature) {
        return state.currentSelectedFeature.map(
          (featurename) => featurename.values_.population
        );
      }
      return [];
    },
    //LOADER
    GET_LOADING_STATE_MAP(state) {
      return state.isMapLoading;
    },
    //LAYER FILTER SELECTION
    GET_SELECTED_COUNTRY(state) {
      return state.currentSelectedCountry;
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
    ADD_FILTERED_FEATURES(state, features) {
      state.filteredFeaturesList = features;
    },
    CHANGE_SELECTED_COUNTRY(state, country) {
      state.currentSelectedCountry = country;
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
    LOAD_FILTERED_FEATURES(context, features) {
      context.commit("ADD_FILTERED_FEATURES", features);
    },
    CHANGE_CURRENT_COUNTRY(context, country) {
      context.commit("CHANGE_SELECTED_COUNTRY", country);
    },
  },
});

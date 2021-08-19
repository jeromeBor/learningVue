import { createStore } from "vuex";

export default createStore({
  state: {
    featuresList: [
      { name: "ville 1", population: "41" },
      { name: "ville 2", population: "48" },
      { name: "ville 3", population: "42" },
      { name: "ville 4", population: "47" },
    ],
    featuresList2: [],
    count: 0,
  },
  //je créé un getters nommé qui sert a "get" les éléments de mon state, ici le nom
  getters: {
    GET_FEATURESNAME(state) {
      return state.featuresList.map((feature) => feature.name);
    },
  },
  mutations: {
    ADD_FEATURES(state, feature) {
      state.featuresList2.push(feature);
    },
  },
  actions: {
    LOAD_FEATURES(context, feature) {
      context.commit("ADD_FEATURES", feature);
    },
  },
});

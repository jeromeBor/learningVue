<template>
  <div id="map">
    <SearchBar />

    <p v-if="getSelectedFeature">
      Vous avez zoomé sur : {{ getSelectedFeatureName() }}
    </p>
    <p v-else>Aucune feature de selectionnée</p>
  </div>
</template>
<script>
import SearchBar from "@/components/map/SearchBar.vue";

/* eslint-disable */
// import openlayer css for style
import "ol/ol.css";
// This is library of openlayer for handle map

import Map from "ol/Map";
import View from "ol/View";

import {
  defaults as defaultControls,
  ScaleLine,
  OverviewMap,
} from "ol/control";
import { fromLonLat } from "ol/proj";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { toulouse, lyon, paris } from "./Features";
import { useStore } from "vuex";
import { watch } from "vue";

export default {
  components: {
    SearchBar,
  },

  computed: {
    getSelectedFeature() {
      return this.$store.getters.GET_SELECTED_FEATURE;
    },
  },

  mounted() {
    this.initiateMap();
    const store = useStore();
    const self = this;

    watch(
      () => store.state.currentSelectedFeature,
      function() {
        const point = store.getters.GET_SELECTED_FEATURE.getGeometry();
        self.view.fit(point, {
          minResolution: 50,
          duration: 2000,
        });

        false;
      }
    );
  },

  data() {
    return {
      view: null,
      map: null,
    };
  },

  methods: {
    // storeFeature() {
    //   this.$store.dispatch("SELECT_FEATURE", this.clickedFeature);
    // },

    getSelectedFeatureName() {
      return this.$store.getters.GET_SELECTED_FEATURE_NAME;
    },

    initiateMap() {
      // map for mini map
      const OVsource = new OSM();
      // France Icon source
      const franceIconSource = new VectorSource({
        features: [toulouse, paris, lyon],
      });
      // France Icon layer implemented with source
      const franceIconLayer = new VectorLayer({
        source: franceIconSource,
      });
      const view = new View({
        center: fromLonLat([1.444209, 43.604652]),
        zoom: 7,
      });
      // normal map
      const raster = new TileLayer({
        source: new OSM(),
      });
      const map = new Map({
        controls: defaultControls().extend([
          new OverviewMap({
            layers: [new TileLayer({ source: OVsource })],
          }),
          new ScaleLine({}),
        ]),
        target: "map",
        layers: [raster, franceIconLayer],
        view: view,
      });

      map.on("click", function(e) {
        const clickedFeature = map.forEachFeatureAtPixel(e.pixel, function(
          clickedFeature
        ) {
          return clickedFeature;
        });

        if (clickedFeature) {
          view.fit(clickedFeature.getGeometry(), {
            minResolution: 200,
            duration: 1000,
          });
          false;
          console.log(clickedFeature);
        } else return console.log("no feature selected");
      });

      // push des features dans le state features list 2
      this.$store.dispatch("LOAD_FEATURES", franceIconSource.getFeatures());

      this.view = view;
      this.map = map;
    },
  },
};
</script>
<style>
.ol-scale-line {
  left: 48%;
}
#map {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

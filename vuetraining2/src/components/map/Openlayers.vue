<template>
  <div id="map">
    <SearchBar @FeatureClicked="onFeatureClicked" />
  </div>
  <div id="popup" class="ol-popup">
    <a
      href="#"
      id="popup-closer"
      class="ol-popup-closer"
      v-on:click="closePopup"
    >
    </a>
    <div id="popup-content">
      <p v-if="getSelectedFeature">
        <span>Ville : </span>
        <span
          v-for="(featuresname, index) in this.$store.getters
            .GET_SELECTED_FEATURE_NAME"
          :key="featuresname"
        >
          <code v-if="this.$store.getters.GET_SELECTED_FEATURE_NAME.length > 1"
            >{{ featuresname
            }}<span
              v-if="
                index + 1 < this.$store.getters.GET_SELECTED_FEATURE_NAME.length
              "
              >,
            </span>
          </code>
          <code v-else>
            {{ featuresname }}
          </code>
        </span>
        <br />
        <span v-if="this.$store.getters.GET_SELECTED_FEATURE_NAME.length > 1">
          Population totale :
          <code>
            {{
              this.$store.getters.GET_SELECTED_FEATURE_INFOS.reduce(
                (a, b) => a + b,
                0
              )
            }}</code
          >
        </span>
        <span v-else>
          Population :
          <code>
            {{
              this.$store.getters.GET_SELECTED_FEATURE_INFOS.reduce(
                (a, b) => a + b,
                0
              )
            }}</code
          >
        </span>
      </p>
    </div>
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

import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import {
  defaults as defaultControls,
  ScaleLine,
  OverviewMap,
} from "ol/control";

import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Cluster, OSM, Vector as VectorSource } from "ol/source";

import { useStore } from "vuex";
import { watch } from "vue";

import { toulouse, lyon, paris } from "./Features";

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
    // watch(
    //   () => store.state.currentSelectedFeature,
    //   () => {
    //     const point = store.getters.GET_SELECTED_FEATURE[0].getGeometry();
    //     self.view.fit(point, {
    //       minResolution: 100,
    //       duration: 1000,
    //     });

    //     false;
    //   }
    // );
  },

  data() {
    return {
      view: null,
      map: null,
      clickedFeature: [],
    };
  },

  methods: {
    onFeatureClicked(e) {
      const clickedFeature = this.map.forEachFeatureAtPixel(
        e.pixel,
        (clickedFeature) => {
          return clickedFeature;
        }
      );
      if (clickedFeature) {
        this.view.fit(clickedFeature.getGeometry(), {
          minResolution: 100,
          duration: 1000,
        });
        // const coordinate = e.coordinate;
        // this.overlay.setPosition(coordinate);
        false;
        this.storeFeature(clickedFeature.values_.features);
      } else return console.log("no feature selected");
    },

    onFeatureHovered(e) {
      let hoveredFeature = [];
      hoveredFeature = this.map.forEachFeatureAtPixel(
        e.pixel,
        (hoveredFeature) => {
          return hoveredFeature;
        }
      );
      if (hoveredFeature) {
        this.storeFeature2(hoveredFeature.values_.features);
        const coordinate = e.coordinate;
        this.overlay.setPosition(coordinate);
      } else {
        this.closePopup();
      }
    },

    closePopup() {
      const closer = document.getElementById("popup-closer");
      this.overlay.setPosition(undefined);
      closer.blur();
      return false;
    },

    storeFeature2(hoveredFeature) {
      this.$store.dispatch("SELECT_FEATURE", hoveredFeature);
    },
    storeFeature(clickedFeature) {
      this.$store.dispatch("SELECT_FEATURE", clickedFeature);
    },

    getAllFeature() {
      return this.$store.getters.GET_ALLFEATURES;
    },

    initiateMap() {
      const clusterSourceFrance = new VectorSource({
        features: [toulouse, paris, lyon],
      });

      const newCluster = new Cluster({
        distance: 30,
        minDistance: 30,
        source: clusterSourceFrance,
      });
      const styleCache = {};

      const clusters = new VectorLayer({
        source: newCluster,
        style: function(feature) {
          const size = feature.get("features").length;
          let style = styleCache[size];
          if (!style) {
            style = new Style({
              image: new CircleStyle({
                radius: 20,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#3399CC",
                }),
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({
                  color: "#fff",
                }),
              }),
            });
            styleCache[size] = style;
          }

          return style;
        },
      });

      //--- POPUP ---//
      const container = document.getElementById("popup");

      const overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });

      // map for mini map
      const OVsource = new OSM();
      // France Icon source
      // const franceIconSource = new VectorSource({
      //   features: [toulouse, paris, lyon],
      // });
      // France Icon layer implemented with source

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
        // interactions: defaultInteractions({ doubleClickZoom: false }),
        overlays: [overlay],
        target: "map",
        layers: [raster, clusters],
        view: view,
      });
      map.on("singleclick", this.onFeatureClicked);
      map.on("pointermove", this.onFeatureHovered);

      // push des features dans le state
      this.$store.dispatch("LOAD_FEATURES", clusterSourceFrance.getFeatures());

      this.view = view;
      this.map = map;
      this.overlay = overlay;
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

.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
  font-size: 25px;
}
</style>

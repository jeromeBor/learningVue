<template>
  <div id="map">
    <SearchBar @onListFeatureClicked="onListFeatureClicked" />
    <ResetViewButton @resetView="resetView" />
  </div>
  <div id="popup" class="ol-popup">
    <a
      href="#"
      id="popup-closer"
      class="ol-popup-closer"
      v-on:click="closePopup"
    >
    </a>
    <Popup @getSelectedFeature="getSelectedFeature" />
  </div>
</template>
<script>
import SearchBar from "@/components/map/SearchBar.vue";
import ResetViewButton from "@/components/map/ResetViewButton.vue";
import Popup from "@/components/map/Popup.vue";

/* eslint-disable */
// import openlayer css for style
import "ol/ol.css";
// This is library of openlayer for handle map

import Map from "ol/Map";
import View from "ol/View";

import { transform } from "ol/proj";

import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import {
  defaults as defaultControls,
  ScaleLine,
  OverviewMap,
} from "ol/control";
import GeoJSON from "ol/format/GeoJSON";

import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Cluster, OSM, Vector as VectorSource } from "ol/source";
import { ZoomSlider } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction";

export default {
  components: {
    SearchBar,
    ResetViewButton,
    Popup,
  },

  computed: {
    getSelectedFeature() {
      return this.$store.getters.GET_SELECTED_FEATURE;
    },
  },

  mounted() {
    this.initiateMap();
  },

  data() {
    return {
      view: null,
      map: null,
      clickedFeature: [],
    };
  },

  methods: {
    onListFeatureClicked() {
      const point = this.$store.getters.GET_SELECTED_FEATURE[0].geometry
        .coordinates;
      console.log(point);
      this.map.getView().setCenter(transform(point, "EPSG:4326", "EPSG:3857"));
      this.map.getView().setZoom(15);
    },

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
        this.storeHoveredFeature(hoveredFeature.values_.features);
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

    resetView() {
      console.log(this.map.getView());
      this.map
        .getView()
        .setCenter(transform([1.7191, 46.7111], "EPSG:4326", "EPSG:3857"));
      this.map.getView().setZoom(6);
    },

    storeHoveredFeature(hoveredFeature) {
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
        url: "http://localhost:8080/france.geojson",
        format: new GeoJSON(),
      });

      const clusterSourceGermany = new VectorSource({
        url: "http://localhost:8080/germany.geojson",
        format: new GeoJSON(),
      });

      // /---  clustering --- //
      const clusterFrance = new Cluster({
        distance: 30,
        minDistance: 30,
        source: clusterSourceFrance,
      });

      const clusterGermany = new Cluster({
        distance: 30, // ajouter var size !
        minDistance: 30,
        source: clusterSourceGermany,
      });

      const styleCacheFR = {};

      const clustersLayerFrance = new VectorLayer({
        title: "France",
        source: clusterFrance,
        style: function(feature) {
          const size = feature.get("features").length;

          let style = styleCacheFR[size];
          if (!style) {
            style = new Style({
              image: new CircleStyle({
                radius: 15 + 1 * size,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#C0B298",
                }),
              }),
              text: new Text({
                font: size * 1 + 10 + "px sans-serif",
                text: size.toString(),
                fill: new Fill({
                  color: "#fff",
                }),
              }),
            });
            styleCacheFR[size] = style;
          }

          if (size > clusterSourceFrance.getFeatures().length / 10) {
            style = new Style({
              image: new CircleStyle({
                radius: 10 + 1 * size,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#A4778B",
                }),
              }),
              text: new Text({
                font: size * 1 + 10 + "px sans-serif",
                text: size.toString(),
                fill: new Fill({
                  color: "#fff",
                }),
              }),
            });
            styleCacheFR[size] = style;
          }
          if (size > clusterSourceFrance.getFeatures().length / 5) {
            style = new Style({
              image: new CircleStyle({
                radius: 15 + 0.5 * size,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#AA4586",
                }),
              }),
              text: new Text({
                font: size * 0.8 + 10 + "px sans-serif",
                text: size.toString(),
                fill: new Fill({
                  color: "#fff",
                }),
              }),
            });
            styleCacheFR[size] = style;
          }

          return style;
        },
      });

      const styleCacheGER = {};

      const clustersLayerGermany = new VectorLayer({
        title: "Germany",
        source: clusterGermany,
        style: function(feature) {
          const size = feature.get("features").length;

          let style = styleCacheGER[size];
          if (!style) {
            style = new Style({
              image: new CircleStyle({
                radius: 15 + 1 * size,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#50C5B7",
                }),
              }),
              text: new Text({
                font: size * 1 + 10 + "px sans-serif",
                text: size.toString(),
                fill: new Fill({
                  color: "#fff",
                }),
              }),
            });
            styleCacheGER[size] = style;
          }

          if (size > clusterSourceGermany.getFeatures().length / 10) {
            style = new Style({
              image: new CircleStyle({
                radius: 15 + 0.8 * size,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#6184D8",
                }),
              }),
              text: new Text({
                font: size * 1 + 10 + "px sans-serif",
                text: size.toString(),
                fill: new Fill({
                  color: "#fff",
                }),
              }),
            });
            styleCacheGER[size] = style;
          }
          if (size > clusterSourceGermany.getFeatures().length / 5) {
            style = new Style({
              image: new CircleStyle({
                radius: size < 30 ? 15 + 0.8 * size : 15 + 0.5 * size,
                radius: 15 + 0.8 * size,
                stroke: new Stroke({
                  color: "#fff",
                }),
                fill: new Fill({
                  color: "#533A71",
                }),
              }),
              text: new Text({
                font: size * 0.8 + 10 + "px sans-serif",
                text: size.toString(),
                fill: new Fill({
                  color: "#fff",
                }),
              }),
            });
            styleCacheGER[size] = style;
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

      //--- map ---//
      const OVsource = new OSM();
      const view = new View({
        center: fromLonLat([1.7191, 46.7111]),
        zoom: 6,
      });
      const raster = new TileLayer({
        source: new OSM(),
        title: "Carte",
      });
      const map = new Map({
        controls: defaultControls().extend([
          new OverviewMap({
            layers: [new TileLayer({ source: OVsource })],
          }),
          new ScaleLine({}),
        ]),
        interactions: defaultInteractions({ doubleClickZoom: false }), // disabled double click zoom on map
        overlays: [overlay],
        target: "map",
        layers: [raster, clustersLayerFrance, clustersLayerGermany],
        view: view,
      });

      // --- zoom slider ---///
      const zoomslider = new ZoomSlider();
      map.addControl(zoomslider);

      // map mouse trigger
      map.on("singleclick", this.onFeatureClicked);
      map.on("pointermove", this.onFeatureHovered);

      // global var
      this.view = view;
      this.map = map;
      this.overlay = overlay;

      this.$store.state.filteredFeaturesList = this.$store.state.featuresList;

      // FILTER FEATURES
      // hide overlayer by country layer
      const layerSelect = document.getElementById("layerSelector");
      layerSelect.addEventListener("change", function() {
        clustersLayerFrance.setVisible(false);
        clustersLayerGermany.setVisible(false);
        switch (layerSelect.value) {
          case "Allemagne":
            clustersLayerGermany.setVisible(true);
            console.log("all");
            // const newFilteredFeatures = this.$store.state.fileterdFeaturesList.filter((feature) => feature.properties.label_en === "Germany");
            // this.$store.dispatch("LOAD_FILTERED_FEATURE, filteredFeatures")
            break;
          case "France":
            clustersLayerFrance.setVisible(true);
            console.log("fr");
            // const newFilteredFeatures = this.$store.state.fileterdFeaturesList.filter((feature) => feature.properties.label_en === "France");
            // this.$store.dispatch("LOAD_FILTERED_FEATURE, filteredFeatures")
            break;
          case "All":
            clustersLayerFrance.setVisible(true);
            clustersLayerGermany.setVisible(true);
            break;
        }
      });

      // hide features by feature code
      const featureCodeSelect = document.getElementById("radioFeatureCode"); // do stuff
      featureCodeSelect.addEventListener("change", function() {
        // do stuff
      });
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

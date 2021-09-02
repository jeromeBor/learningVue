<template>
  <div id="map">
    <SeachPanel @onListFeatureClicked="onListFeatureClicked" />
    <ResetViewButton @resetView="resetView" />
  </div>

  <Popup @getSelectedFeature="getSelectedFeature" />
</template>
<script>
import SeachPanel from "@/components/searchPanel/SeachPanel.vue";
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
    SeachPanel,
    ResetViewButton,
    Popup,
  },

  computed: {
    getSelectedFeature() {
      return this.$store.state.GET_SELECTED_FEATURE;
    },
    getFilteredFeaturesList() {
      return this.$store.state.filteredFeaturesList;
    },
    currentSelectedFilterOptions() {
      return this.$store.state.currentSelectionOptions.layer;
    },
    getSelectedRadioFilter() {
      return this.$store.getters.GET_SELECTED_RADIO_FILTER;
    },
    countriesData() {
      return this.$store.getters.GET_COUNTRIES_DATA;
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
      clusters: [],
    };
  },

  watch: {
    currentSelectedFilterOptions: function(selection) {
      this.toggleLayerVisibility(selection);
      // this.filterFeatureByFeatureCode();
    },
  },

  methods: {
    // filterFeatureByFeatureCode() {
    //   console.log(this.map.getLayers().array_);
    // },

    toggleLayerVisibility(selection) {
      this.map.getLayers().array_.forEach((layer) => {
        // hide all layers except basic map
        // show selected
        const current_layer_id = layer.get("id");
        if (current_layer_id.includes("villes-")) {
          if (selection === "All") {
            layer.setVisible(true);
          } else {
            if (layer.get("id") === "villes-" + selection) {
              layer.setVisible(true);
            } else {
              layer.setVisible(false);
            }
          }
        }
      });
    },

    FilterMapFeature() {},

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
      console.log(clickedFeature);

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
      const countries = [
        {
          id: "France",
          url: "http://localhost:8080/france.geojson",
          style: {
            fillColor1: "#C0B298",
            fillColor2: "#A4778B",
            fillColor3: "#AA4586",
            strokeColor: "#fff",
            textColor: "#fff",
            size: {
              radiusPx: { small: "0.5", medium: "0.8" },
              fontPx: { small: "0.5", medium: "0.8" },
            },
          },
        },
        {
          id: "Germany",
          url: "http://localhost:8080/germany.geojson",
          style: {
            fillColor1: "#50C5B7",
            fillColor2: "#6184D8",
            fillColor3: "#533A71",
            strokeColor: "#fff",
            textColor: "#fff",
            size: {
              radiusPx: { small: "0.5", medium: "0.8" },
              fontPx: { small: "0.5", medium: "0.8" },
            },
          },
        },
      ];
      const clusters = [];
      countries.forEach((country) => {
        const currentId = country.id;
        const currentUrl = country.url;
        const currentStyle = country.style;
        const clusterLayer = new VectorLayer({
          id: "villes-" + currentId,
          source: new Cluster({
            distance: 30,
            minDistance: 30,
            source: new VectorSource({
              url: currentUrl,
              format: new GeoJSON(),
            }),
          }),
          style: function(feature) {
            const size = feature.get("features").length;
            let style = styleCache[size];
            if (!style) {
              style = new Style({
                image: new CircleStyle({
                  radius: 15 + 0.5 * size,
                  stroke: new Stroke({
                    color: currentStyle.strokeColor,
                  }),
                  fill: new Fill({
                    color: currentStyle.fillColor1,
                  }),
                }),
                text: new Text({
                  font: size * 0.5 + 10 + "px sans-serif",
                  text: size.toString(),
                  fill: new Fill({
                    color: currentStyle.textColor,
                  }),
                }),
              });
              styleCache[size] = style;
            }
            return style;
          },
        });
        clusters.push(clusterLayer);
      });

      const styleCache = {};

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
        id: "raster",
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
        layers: [raster, ...clusters],
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

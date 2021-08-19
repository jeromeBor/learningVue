<template>
  <div id="map"></div>
</template>
<script>
/* eslint-disable */
// import openlayer css for style
import "ol/ol.css";
// This is library of openlayer for handle map

import Map from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import {
  defaults as defaultControls,
  ScaleLine,
  OverviewMap,
} from "ol/control";
import { fromLonLat } from "ol/proj";
import { Icon, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
export default {
  mounted() {
    this.initiateMap();
  },

  methods: {
    initiateMap() {
      //icon de toulouse
      const toulouse = new Feature({
        geometry: new Point(fromLonLat([1.444209, 43.604652])),
        name: "Toulouse",
        anchorOrigin: "bottom-left",
      });

      toulouse.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
          }),
        })
      );

      // icon de paris
      const paris = new Feature({
        geometry: new Point(fromLonLat([2.353, 48.8566])),
        name: "Paris",
      });
      paris.setStyle(
        new Style({
          image: new Icon({
            crossOrigin: "anonymous",
            src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
          }),
        })
      );

      // map for mini map
      const OVsource = new OSM();

      // France Icon source
      const franceIconSource = new VectorSource({
        features: [toulouse, paris],
      });
      // France Icon layer implemented with source
      const franceIconLayer = new VectorLayer({
        source: franceIconSource,
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
        view: new View({
          // projection: "EPSG:4326",
          center: fromLonLat([1.444209, 43.604652]),
          zoom: 7,
        }),
      });

      // récupération de tout les feature dans le layer choisi
      // const getAllFeature = franceIconSource.getFeatures();
      // console.log(getAllFeature);

      // push des features dans le state features list 2
      this.$store.dispatch("LOAD_FEATURES", franceIconSource.getFeatures()); // this.$store.commit("LOAD_FEATURES:", { name: "test", population: "22" });
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

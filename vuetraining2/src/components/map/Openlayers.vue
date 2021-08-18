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
      const Toulouse = new Feature({
        geometry: new Point(fromLonLat([1.444209, 43.604652])),
        name: "Toulouse",
        anchorOrigin: "bottom-left",
      });
      const toulouseStyle = new Style({
        image: new Icon({
          src: "https://openlayers.org/en/v4.6.5/examples/data/icon.png",
        }),
      });

      Toulouse.setStyle(toulouseStyle);

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
      const vectorSource = new VectorSource({ features: [Toulouse, paris] });

      const vector = new VectorLayer({
        source: vectorSource,
      });
      const raster = new TileLayer({
        source: new OSM(),
      });
      // create map with 2 layer up here

      const map = new Map({
        controls: defaultControls().extend([
          new OverviewMap({
            layers: [new TileLayer({ source: OVsource })],
          }),
          new ScaleLine({}),
        ]),
        target: "map",
        layers: [raster, vector],
        view: new View({
          // projection: "EPSG:4326",
          center: fromLonLat([1.444209, 43.604652]),
          zoom: 9,
        }),
      });

      // récupération de tout les feature (points) dans le layer choisi
      var getAllFeature = vectorSource.getFeatures();
      console.log(getAllFeature);
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

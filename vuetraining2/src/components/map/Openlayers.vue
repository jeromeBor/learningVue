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

      //icon de lyon
      const lyon = new Feature({
        geometry: new Point(fromLonLat([4.835659, 45.764043])),
        name: "Lyon",
      });
      lyon.setStyle(
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
        features: [toulouse, paris, lyon],
      });
      // France Icon layer implemented with source
      const franceIconLayer = new VectorLayer({
        source: franceIconSource,
      });

      const view = new View({
        // projection: "EPSG:4326",
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

      const zoomtotoulouse = document.getElementById("zoomtotoulouse");

      zoomtotoulouse.addEventListener(
        "click",
        function() {
          // const point = franceIconSource.get Features()[0].getGeometry();
          const feature = franceIconSource.getFeatures()[0];
          const point = feature.getGeometry();
          const size = map.getSize();
          view
            .centerOn(point, size, [size[0] % 2, size[1] % 2])
            .fit(point, { padding: [170, 50, 30, 150] });
        },
        false
      );

      console.log(
        franceIconSource
          .getFeatures()[0]
          .getGeometry()
          .getCoordinates()
      );
      // console.log(map.getSize()[0]);

      // push des features dans le state features list 2
      this.$store.dispatch("LOAD_FEATURES", franceIconSource.getFeatures());
      // this.$store.commit("ADD_MAP", map.franceIconSource());
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

<template>
  <div id="popup-content">
    <p v-if="getSelectedFeature">
      <span v-if="this.$store.getters.GET_SELECTED_FEATURE_NAME.length > 1"
        >Villes :
      </span>
      <span v-else>Ville : </span>
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
</template>

<script>
export default {
  methods: { getSelectedFeature() {} },
};
</script>

<style>
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

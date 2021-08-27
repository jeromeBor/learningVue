<script>
import axios from "axios";

export default {
  methods: {
    getGeoJsonData() {
      this.$store.dispatch("TOGGLE_LOADING", true);
      axios
        .get("http://localhost:8080/france.geojson", {})
        .then((res) => res.data)
        .then((data) => this.$store.dispatch("LOAD_FEATURES", data))
        .then(
          // setTimeout(() => {
          this.$store.dispatch("TOGGLE_LOADING", false)
          // }, 2000)
        );
    },
  },

  mounted() {
    this.getGeoJsonData();
  },
};
</script>

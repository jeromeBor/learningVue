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
        //settimeout !
        .then(this.$store.dispatch("TOGGLE_LOADING", false));
    },
  },

  mounted() {
    this.getGeoJsonData();
  },
};
</script>

<style scoped></style>

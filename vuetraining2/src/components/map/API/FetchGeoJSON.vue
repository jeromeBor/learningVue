<script>
import axios from "axios";

export default {
  methods: {
    getGeoJSONData() {
      axios
        .all([
          axios.get("http://localhost:8080/germany.geojson", {}),
          axios.get("http://localhost:8080/france.geojson", {}),
        ])
        .then(
          axios.spread((...responses) => {
            const features = [];
            responses.forEach((res) => {
              features.push(res.data.features.flat());
            });
            this.$store.dispatch("LOAD_FEATURES", features.flat());
          })
        );
    },
  },

  mounted() {
    this.getGeoJSONData();
  },
};
</script>

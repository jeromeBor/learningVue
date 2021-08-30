<script>
import axios from "axios";

export default {
  methods: {
    // getFRGeoJsonData() {
    //   this.$store.dispatch("TOGGLE_LOADING", true);
    //   axios
    //     .get("http://localhost:8080/france.geojson", {})
    //     .then((res) => res.data)
    //     .then((data) => this.$store.dispatch("LOAD_FEATURES", data))
    //     .then(
    //       // setTimeout(() => {
    //       this.$store.dispatch("TOGGLE_LOADING", false)
    //       // }, 2000)
    //     );
    // },

    //   getGERGeoJsonData() {
    //     this.$store.dispatch("TOGGLE_LOADING", true);
    //     axios.all([
    //       axios
    //         .get("http://localhost:8080/germany.geojson", {})
    //         .get("http://localhost:8080/france.geojson", {})
    //         .then((res) => res.data)
    //         .then((data) => this.$store.dispatch("LOAD_FEATURES", data))
    //         .then(
    //           // setTimeout(() => {
    //           this.$store.dispatch("TOGGLE_LOADING", false)
    //           // }, 2000)
    //         ),
    //     ]);
    //   },
    // },

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

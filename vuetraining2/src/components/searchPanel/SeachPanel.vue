<template>
  <div class="map-control-panel">
    <div class="input-group mb-3"></div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button
          v-on:click="toggleButtonList"
          id="collapsible"
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="false"
          aria-controls="collapseOne"
          value="off"
        >
          Afficher la recherche
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <RadioButton />
          <hr />
          <DropDown />
          <hr />
          <div class="w-auto d-flex flex-row m-1">
            <input
              v-model="searchInput"
              v-on:input="updateTermFilter"
              type="text"
              class="form-control "
              placeholder="Search"
              aria-label="Search"
            />
            <button
              v-on:click="resetInput"
              class="input-group-text btn-primary"
              id="basic-addon1"
            >
              X
            </button>
          </div>
          <ul class="list-group" id="features-list">
            <li
              v-for="(feature, index) in getFilteredFeatureList"
              :key="index"
              v-on:click="storeFeature(index)"
              type="button"
              class="list-group-item"
            >
              {{ feature.properties.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/components/searchPanel/RadioButton.vue";
import DropDown from "@/components/searchPanel/DropDown.vue";

export default {
  name: "MapPanel",

  components: { RadioButton, DropDown },
  data() {
    return {
      searchInput: "",
      selectedCountry: "All",
    };
  },

  // watching state filter option
  watch: {
    // currentSelectedLayerOption: function() {
    //   this.filter();
    // },
    // currentSelectedCodeOption: function() {
    //   this.filter();
    // },
    // currentSelectedTermOption: function() {
    //   this.filter();
    // },

    filteredFeatures: function() {
      this.$store.dispatch("LOAD_FILTERED_FEATURES", this.filteredFeatures);
    },
  },

  computed: {
    // retrieve current option for layer
    currentSelectedLayerOption() {
      return this.$store.state.currentSelectionOptions.layer;
    },
    //retrieve current option for radio  feature code
    currentSelectedCodeOption() {
      return this.$store.state.currentSelectionOptions.code;
    },
    currentSelectedTermOption() {
      return this.$store.state.currentSelectionOptions.term;
    },

    // récupération de toutes mes features
    getAllFeatures() {
      return this.$store.getters.GET_ALLFEATURES;
    },
    getFilteredFeatureList() {
      return this.$store.getters.GET_FILTERED_FEATURES;
    },
    filteredOptions() {
      return this.$store.getters.GET_FILTER_OPTIONS;
    },

    filteredFeatures() {
      return this.getAllFeatures.filter((feature) => {
        return (
          // renvoie true si les 2 selection === value
          (feature.properties.feature_code === this.currentSelectedCodeOption &&
            feature.properties.cou_name_en ===
              this.currentSelectedLayerOption &&
            feature.properties.name
              .toLowerCase()
              .includes(this.searchInput.toLowerCase())) ||
          // ou si une des selections === value et l'autre === All
          (this.currentSelectedCodeOption === "All" &&
            feature.properties.cou_name_en ===
              this.currentSelectedLayerOption &&
            feature.properties.name
              .toLowerCase()
              .includes(this.searchInput.toLowerCase())) ||
          // ou si l'autre selection === value et l'autre == all
          (feature.properties.feature_code === this.currentSelectedCodeOption &&
            this.currentSelectedLayerOption === "All" &&
            feature.properties.name
              .toLowerCase()
              .includes(this.searchInput.toLowerCase())) ||
          // ou si l'autre selection === value et l'autre == all
          (this.currentSelectedCodeOption === "All" &&
            this.currentSelectedLayerOption === "All" &&
            feature.properties.name
              .toLowerCase()
              .includes(this.searchInput.toLowerCase()))
        );
      });
    },
  },

  methods: {
    updateTermFilter(e) {
      this.searchInput = e.target.value;
      this.$store.dispatch("CHANGE_CURRENT_TERM_FILTER", this.searchInput);
    },

    toggleButtonList() {
      var btn = document.getElementById("collapsible");
      if (btn.value === "off") {
        btn.value = "on";
        btn.innerHTML = "Cacher la recherche";
      } else if (btn.value === "on") {
        btn.value = "off";
        btn.innerHTML = "Afficher la recherche";
      }
    },

    storeFeature(index) {
      this.$store.dispatch("SELECT_FEATURE", [
        this.getFilteredFeatureList[index],
      ]);
      this.$emit("onListFeatureClicked");
    },

    resetInput() {
      this.searchInput = "";
    },
  },
};
</script>

<style>
.map-control-panel {
  right: 10px;
  bottom: 0px;
  position: absolute;
  z-index: 99;
  padding: 1rem;
}

.accordion-item {
  background-color: rgba(254, 254, 254, 0.5) !important;
}

#features-list li {
  list-style: none;
  cursor: pointer;
  margin: 0.2rem;
  background-color: rgba(254, 254, 254, 1);
  padding: 4px;
}
#features-list {
  max-height: 30vh !important;
  overflow-y: scroll !important;
}

.accordion-button {
  width: 350px !important;
  height: 50px !important;
}
</style>

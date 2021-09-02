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
          <!-- <select
            @change="filterFeatureByCountry"
            v-model="selectedCountry"
            id="layerSelector"
            class="form-select p-2 mb-3 fs-6"
            aria-label="Default select example"
          >
            <option value="All" selected class="fw-bold text-primary"
              >Choisir un pays (étage)</option
            >
            <option value="Germany">Allemagne</option>
            <option value="France">France</option>
          </select> -->
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
          <!-- <SearchBar />  -->
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
    currentSelectedLayerOption: function() {
      this.filteredFeatures();
    },
    currentSelectedCodeOption: function() {
      this.filteredFeatures();
    },
    currentSelectedTermOption: function() {
      this.filteredFeatures();
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
  },

  methods: {
    filteredFeatures() {
      const filtered = this.getAllFeatures.filter((feature) => {
        if (
          this.currentSelectedLayerOption === "All" &&
          this.currentSelectedCodeOption != "All"
        ) {
          console.log("Layer and Terms");
          if (
            feature.properties.feature_code ===
              this.currentSelectedCodeOption &&
            feature.properties.name
              .toLowerCase()
              .includes(this.currentSelectedTermOption.toLowerCase())
          )
            return true;
        } else if (
          this.currentSelectedCodeOption === "All" &&
          this.currentSelectedLayerOption != "All"
        ) {
          console.log("Code and Terms");
          if (
            feature.properties.cou_name_en ===
              this.currentSelectedLayerOption &&
            feature.properties.name
              .toLowerCase()
              .includes(this.currentSelectedTermOption.toLowerCase())
          )
            return true;
        } else if (
          this.currentSelectedLayerOption == "All" &&
          this.currentSelectedCodeOption == "All"
        ) {
          console.log("Terms only");
          if (!this.getFilteredFeatureList) return [];
          return feature.properties.name
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        } else {
          console.log("All filter");
          if (
            feature.properties.cou_name_en ===
              this.currentSelectedLayerOption &&
            feature.properties.feature_code ===
              this.currentSelectedCodeOption &&
            feature.properties.name
              .toLowerCase()
              .includes(this.currentSelectedTermOption.toLowerCase())
          )
            return true;
        }
      });
      this.$store.dispatch("LOAD_FILTERED_FEATURES", filtered);
      return filtered;
    },

    //  filterByTerm() {
    //     if (!this.getFilteredFeatureList) return [];
    //     this.$store.dispatch("CHANGE_CURRENT_TERM_FILTER", this.searchInput);

    //     const filteredFeatureByTerm = this.getAllFeatures.filter((feature) => {
    //       return feature.properties.name
    //         .toLowerCase()
    //         .includes(this.searchInput.toLowerCase());
    //     });
    //     this.$store.dispatch("LOAD_FILTERED_FEATURES", filteredFeatureByTerm);
    //   },

    updateTermFilter(e) {
      this.searchInput = e.target.value;
      console.log(this.searchInput);
      this.$store.dispatch("CHANGE_CURRENT_TERM_FILTER", this.searchInput);
    },

    // filterByLayer() {
    //   if (this.currentSelectedLayerOption != "All") {
    //     const filteredFeatureByLayer = this.getAllFeatures.filter(
    //       (feature) =>
    //         feature.properties.cou_name_en === this.currentSelectedLayerOption
    //     );
    //     this.$store.dispatch("LOAD_FILTERED_FEATURES", filteredFeatureByLayer);
    //     return filteredFeatureByLayer;
    //   }
    //   this.$store.dispatch("LOAD_FILTERED_FEATURES", this.getAllFeatures);
    // },

    // filterByCode() {
    //   if (this.currentSelectedCodeOption != "All") {
    //     const filteredFeatureByCode = this.getAllFeatures.filter(
    //       (feature) =>
    //         feature.properties.feature_code === this.currentSelectedCodeOption
    //     );
    //     this.$store.dispatch("LOAD_FILTERED_FEATURES", filteredFeatureByCode);
    //     return filteredFeatureByCode;
    //   }
    //   this.$store.dispatch("LOAD_FILTERED_FEATURES", this.getAllFeatures);
    // },

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

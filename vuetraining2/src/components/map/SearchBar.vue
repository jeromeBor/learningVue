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
          <div class="filtercat bg-white p-2 mb-3 rounded border">
            <div class="form-check text-start">
              <input
                class="form-check-input "
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                inférieur à 25 000
              </label>
            </div>
            <div class="form-check text-start">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault2">
                entre 25 000 et 50 000
              </label>
            </div>
            <div class="form-check text-start">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
                checked
              />
              <label class="form-check-label" for="flexRadioDefault3">
                supérieur à 50 000
              </label>
            </div>
          </div>

          <select
            class="form-select p-2 mb-3 fs-6"
            aria-label="Default select example"
          >
            <option selected class="fw-bold text-primary"
              >Choisir un pays (étage)</option
            >
            <option value="1">Allemagne</option>
            <option value="2">France</option>
          </select>
          <div class="w-auto d-flex flex-row m-1">
            <input
              autocomplete="on"
              v-model="searchInput"
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
          <SearchAutocomplete
            :features="filterByTerm"
            @onListFeatureClicked="onListFeatureClicked"
          />
          <ul class="list-group" id="features-list">
            <li
              v-for="(feature, index) in filterByTerm"
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
import SearchAutocomplete from "@/components/map/SearchAutocomplete.vue";

export default {
  name: "MapPanel",

  components: {
    SearchAutocomplete,
  },

  data() {
    return {
      searchInput: "",
    };
  },

  computed: {
    getAllFeatures() {
      return this.$store.getters.GET_ALLFEATURES;
    },

    filterByTerm() {
      if (!this.getAllFeatures) return [];
      return this.getAllFeatures.filter((feature) => {
        return feature.properties.name
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    },

    selectedFeature() {
      return this.$store.getters.GET_SELECTED_FEATURE;
    },
  },

  methods: {
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

    // storeFeature(index) {
    //   this.$store.dispatch("SELECT_FEATURE", [this.filterByTerm[index]]);
    //   console.log(this.filterByTerm[index]);
    //   this.$emit("onListFeatureClicked");
    // },

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

/* * {
  box-sizing: border-box;
}
body {
  font: 16px Arial;
} */
.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
}
input {
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
}
input[type="text"] {
  background-color: #f1f1f1;
  width: 100%;
}
input[type="submit"] {
  background-color: DodgerBlue;
  color: #fff;
}
.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
}
.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
}
.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9;
}
.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important;
  color: #ffffff;
}
</style>

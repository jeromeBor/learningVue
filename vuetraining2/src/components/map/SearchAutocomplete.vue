<autocomplete :suggestions="cities" :selection.sync="value"></autocomplete>

<template>
  <div class="autocomplete">
    <input
      type="text"
      v-model="search"
      @input="onChange"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
    />
    <ul v-show="isOpen" class="autocomplete-results">
      <li
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        {{ result.properties.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SearchAutocomplete",

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  },
  props: {
    features: {
      type: Array,
      required: false,
      default: () => [],
      arrowCounter: -1,
    },
  },
  data() {
    return {
      search: "",
      results: [],
      isOpen: false,
    };
  },

  watch: {
    features: function(value, oldValue) {
      if (value.length !== oldValue.length) {
        this.results = value;
        this.isLoading = false;
      }
    },
  },

  methods: {
    storeFeature(index) {
      this.$store.dispatch("SELECT_FEATURE", [this.filterByTerm[index]]);
      console.log(this.filterByTerm[index]);
      this.$emit("onListFeatureClicked");
    },

    handleClickOutside(event) {
      console.log(this.features);
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter(index) {
      this.search = this.results[this.arrowCounter];
      this.arrowCounter = -1;
      this.isOpen = false;
      this.$store.dispatch("SELECT_FEATURE", [this.results[index]]);
      this.$emit("onListFeatureClicked");
    },

    setResult(result, index) {
      this.search = result.properties.name;
      this.isOpen = false;
      this.$store.dispatch("SELECT_FEATURE", [this.result[index]]);
      console.log(this.filterByTerm[index]);
      this.$emit("onListFeatureClicked");
    },

    filterResults() {
      this.results = this.features.filter(
        (item) =>
          item.properties.name
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
      );
    },
    onChange() {
      this.$emit("input", this.search);

      if (this.isAsync) {
        this.isLoading = true;
      } else {
        this.filterResults();
        this.isOpen = true;
      }
    },
  },
};
</script>

<style>
.autocomplete {
  position: relative;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  min-height: 1em;
  max-height: 6em;
  overflow: auto;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}
.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}
</style>

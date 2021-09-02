<template>
  <div id="radioFeatureCode" class="filtercat bg-white p-2 mb-3">
    <span class="fs-6 fw-bold text-primary">Feature code</span>
    <div class="form-check text-start">
      <input
        v-on:click="updateRadioData"
        v-model="radioFilter"
        value="All"
        class="form-check-input "
        type="radio"
        name="flexRadioDefault"
        id="allFeatureRadio"
        checked
      />
      <label class="form-check-label" for="allFeatureRadio">
        Tout
      </label>
    </div>
    <div class="form-check text-start">
      <input
        v-on:change="updateRadioData"
        v-model="radioFilter"
        value="PPLA"
        class="form-check-input "
        type="radio"
        name="flexRadioDefault"
        id="PPLAFeatureRadio"
      />
      <label class="form-check-label" for="PPLAFeatureRadio">
        PPLA
      </label>
    </div>
    <div class="form-check text-start">
      <input
        v-on:click="updateRadioData"
        v-model="radioFilter"
        value="PPLA3"
        class="form-check-input"
        type="radio"
        name="flexRadioDefault"
        id="PPLA3FeatureRadio"
      />
      <label class="form-check-label" for="PPLA3FeatureRadio">
        PPLA 3
      </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    updateRadioData(e) {
      this.radioFilter = e.target.value;
      console.log(this.radioFilter);
      this.$store.dispatch("CHANGE_CURRENT_RADIO_FILTER", this.radioFilter);
    },

    watch: {
      radioFilter: function() {
        this.updateRadioData();
      },
    },

    data() {
      return {
        radioFilter: "",
      };
    },
  },
};
</script>

<style lang=""></style>

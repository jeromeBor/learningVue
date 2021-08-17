<template>
  <div class="home">
    <ul>
      <router-link to="/">Home</router-link>
      |
      <router-link :to="{ name: 'About' }">About</router-link>
      |
      <router-link :to="{ name: 'Map' }">Map</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

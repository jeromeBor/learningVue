<template>
  <div class="navbar">
    <ul>
      <router-link to="/" class="nav-menu" isActive: true>Home</router-link>
      |
      <router-link :to="{ name: 'About' }" class="nav-menu" isActive: true>About</router-link>
      |
      <router-link :to="{ name: 'Map' }" class="nav-menu" isActive: true>Map</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Navigation",
};

</script>

<style scoped>
.navbar {
  background-color: #f5f5f5;
  padding: 0.5rem;
}
.nav-menu {
  text-decoration: none;
  padding: 0.5rem;
}
.router-link-active {
    background-color:#628272!important;
    color:white!important;
}
</style>

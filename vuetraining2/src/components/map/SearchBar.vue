<template>
  <div class="map-control-panel">
    <input type="text" placeholder="Cherchez un pays" />
    <button>Reset input</button>
    <button>Paris</button>
    <button>toulouse</button>
  </div>
</template>

<script>
export default { name: "MapPanel" };
</script>

<style>
.map-control-panel {
  right: 12px;
  bottom: 100px;
  position: absolute;
  z-index: 99;
  padding: 1rem;
  background-color: rgba(150, 150, 150, 0.5);
}
</style>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <img src="@/components/loader.svg" class="rotate-center" />
    <span class="fs-3 font-weight-bold text-info">Chargement..</span>
  </div>
</template>

<script>
import loader from "@/components/loader.svg";
export default {
  name: "Loader",

  setup() {
    return {
      loader,
    };
  },
};
</script>

<style>
.rotate-center {
  -webkit-animation: rotate-center 1.5s cubic-bezier(0.77, 0, 0.175, 1) 2s
    infinite;
  animation: rotate-center 1.5s cubic-bezier(0.77, 0, 0.175, 1) 2s infinite;
}

@-webkit-keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotate-center {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>

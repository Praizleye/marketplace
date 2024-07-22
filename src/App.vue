<template>
  <div class="banner-1 pb-12 noise">
    <NavBar />
  </div>
  <router-view></router-view>
</template>
<script>
import NavBar from "./components/NavBar.vue";
import PopularDestinations from "./sections/PopularDestinations.vue";
import AboutSection from "./sections/AboutSection.vue";
import { RouterView } from "vue-router";
import Noise from "./assets/NoiseBg.png";
export default {
  name: "App",
  components: {
    NavBar,
    PopularDestinations,
    AboutSection,
  },
};
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.noise {
  /* position: absolute;
  top: 0;
  left: 0; */
  background-image: url("./assets/NoiseBg.png");
  background-repeat: repeat, repeat;
  width: 100vw;
}
</style>

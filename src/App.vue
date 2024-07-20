<template>
  <div class="banner-1 pb-12">
    <NavBar />
  </div>
  <router-view></router-view>
</template>
<script>
import NavBar from "./components/NavBar.vue";
import PopularDestinations from "./sections/PopularDestinations.vue";
import AboutSection from "./sections/AboutSection.vue";
import { RouterView } from "vue-router";
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
</style>

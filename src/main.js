import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import VueSmoothScroll from "vue3-smooth-scroll";
import { createWebHistory, createRouter } from "vue-router";
import ReadMore from "./sections/ReadMore.vue";
import Homepage from "./sections/HomePage.vue";
import Volunteer from "./sections/Volunteer.vue";
import Admin from "./sections/AdminSection.vue";

const routes = [
  //   { path: "/", component: App },
  { path: "/", component: Homepage },
  { path: "/readmore/:id", component: ReadMore },
  { path: "/volunteer", component: Volunteer },
  { path: "/admin", component: Admin}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(VueSmoothScroll);
app.mount("#app");

// const app = createApp(App)
// app.mount('#app')

import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import VueSmoothScroll from "vue3-smooth-scroll";
import { createWebHistory, createRouter } from "vue-router";
import ReadMore from "./sections/ReadMore.vue";
import Homepage from "./sections/HomePage.vue";

const routes = [
  //   { path: "/", component: App },
  { path: "/", component: Homepage },
  { path: "/readmore", component: ReadMore },
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

<template>
  <!-- NavBar -->
  <nav
    class="container px-6 mx-auto md:flex md:justify-between md:items-center"
  >
    <div class="flex items-center justify-between">
      <div class="relative w-[50%]">
        <router-link to="/">
          <img :src="Logo" alt="Logo" />
        </router-link>
      </div>
      <!-- Mobile menu button -->
      <div @click="showMenu = !showMenu" class="flex md:hidden">
        <button
          type="button"
          class="text-black hover:text-gray-400 focus:outline-none focus:text-gray-400"
        >
          <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
            <path
              fill-rule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
    <ul
      :class="showMenu ? 'flex' : 'hidden'"
      class="flex-col items-end mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
    >
      <li class="menu-button">
        <router-link to="/" class="text-white">Home</router-link>
      </li>
      <li class="menu-button">
        <a href="#event" class="text-white" v-smooth-scroll>Event</a>
      </li>
      <li class="menu-button">
        <a href="#about" class="text-white" v-smooth-scroll>About</a>
      </li>
    </ul>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import { defineComponent } from "vue";
import Logo from "../assets/Logo.png";

export default defineComponent({
  name: "NavBar",
  data() {
    return {
      showMenu: false,
      Logo,
    };
  },
});
</script>

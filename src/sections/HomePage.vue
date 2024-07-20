<template>
  <div>
    <div class="bg-[#0046b5]">
      <div class="flex items-center justify-center gap-2">
        <div class="">
          <h1
            class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-Eczar font-bold leading-tight text-white"
          >
            <a class="text-white hover:underline"> MarketPlace</a
            ><br />Stakeholders
          </h1>
        </div>

        <div class="">
          <h1
            class="text-3xl sm:text-8xl md:text-8xl lg:text-9xl xl:text-[10rem] font-sans leading-loose text-yellow-500 font-light"
          >
            AFRICA
          </h1>
        </div>
      </div>

      <div class="flex justify-center items-center flex-col mt-3 md:mt-6 pb-16">
        <div class="text-center">
          <span class="text-yellow-400 italic text-sm md:text-3xl"
            >Making
          </span>
          <span class="text-yellow-400 italic text-sm md:text-3xl font-bold"
            >Africa work through production intelligence.</span
          >
        </div>
        <div
          class="md:flex gap-1 md:gap-10 justify-center items-center text-center"
        >
          <button
            class="text-black bg-yellow-300 submit-button md:block mt-3 md:mt-6"
          >
            <a href="https://marketplacestakeholdersafrica.online">
              Register Now
            </a>
          </button>
          <div class="text-center mt-3 md:mt-6 text-white">
            <div>Venue: Transcorp Hilton Hotels</div>
            <div>Friday, 26th July 2024, 9:00 A.M</div>
          </div>
        </div>
      </div>
    </div>

    <AboutSection />
    <PopularDestinations />

    <div
      class="banner-1 flex flex-col h-full items-center justify-center relative"
      style="background-color: yellow"
    >
      <div class="flex justify-center items-center">
        <div>
          <button class="w-[10rem] bg-blue-500 py-3 text-white">
            <a href="https://marketplacestakeholdersafrica.online">
              Register Now
            </a>
          </button>
        </div>
      </div>
      <div class="pb-3 mt-3">
        <div class="text-xs text-center font-bold">
          For Further Inquiries: +2348101346052 | +2348183135120
        </div>
      </div>
    </div>
    <div
      class="text-center bg-yellow-400 py-2 text-black font-bold"
      style="background-color: yellow"
    >
      &copy; 2024
    </div>
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue";
import PopularDestinations from "./PopularDestinations.vue";
import AboutSection from "./AboutSection.vue";
import "../index.css";
// import { useRoute, useRouter } from 'vue-router'
// const router = useRouter()
// const route = useRoute()

export default {
  name: "Homepage",
  components: {
    NavBar,
    PopularDestinations,
    AboutSection,
  },
};
</script>

<!-- <style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style> -->

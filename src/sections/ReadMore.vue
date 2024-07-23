<template>
  <div class="w-full bg-yellow-100 pb-8">
    <div class="flex flex-col-reverse justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <div
          class="my-2 mx-12 text-yellow-500 font-bold text-center flex justify-center items-center"
        >
          <h1 class="text-2xl md:text-3xl lg:text-4xl text-black">
            {{ detailsToDisplay[0]?.name }}
          </h1>
        </div>
        <div class="text-center px-6 mb-2">
          {{ detailsToDisplay[0]?.title }}
        </div>
        <img :src="detailsToDisplay[0]?.image" />
        <div
          class="text-center text-sm md:text-xl lg:text-2xl mt-6 px-6 pb-8 text-gray-500"
        >
          {{ detailsToDisplay[0]?.shortBio }}
        </div>
      </div>
    </div>
    <div class="flex flex-row px-6 justify-center items-center">
      <button
        @click="previousBtnClicked"
        class="text-white bg-blue-500 submit-button md:block mt-3 md:mt-6 w-[10rem] noise"
        style="border-radius: 0; border-right: 1px solid white"
        :disabled="+route.params.id === 1"
      >
        Prev
      </button>
      <button
        @click="nextBtnClicked"
        class="text-white bg-blue-500 submit-button md:block mt-3 md:mt-6 w-[10rem] noise"
        style="border-radius: 0"
        :disabled="+route.params.id === fullBio.length"
      >
        Next
      </button>
    </div>
  </div>
  <div
    class="banner-1 flex flex-col h-full items-center justify-center relative bg-yellow-400 footer-noise"
    style="background-color: black"
  >
    <div class="flex justify-center items-center mt-3 md:mt-6">
      <div>
        <button class="text-black bg-[#fbeb10] submit-button md:block">
          <a
            href="https://marketplacestakeholdersafrica.online"
            class="text-4xl"
          >
            Register Now
          </a>
        </button>
      </div>
    </div>
    <div
      class="mt-3 text-3xl font-Montserrat text-center font-bold text-white sm:text-2xl"
    >
      @Transcorp Hilton Hotel
    </div>
    <div class="text-center mt-6 md:mt-6 text-white flex gap-1 px-6">
      <div
        class="submit-button bg-yellow-400 relative"
        style="justify-content: center; align-items: center; display: flex"
      >
        <div class="flex gap-1 sm:gap-3 text-black text-sm">
          <span class="text-sm md:text-2xl">
            <span class="font-sans text-base sm:text-2xl md:text-3xl"
              ><span class="text-red-500 text-sm md:text-2xl">*</span>
              Friday,
            </span>
            <br />26TH
          </span>
          <span class="text-sm md:text-2xl">
            <span class="font-sans text-base sm:text-2xl md:text-3xl"
              ><span class="text-red-500 text-sm md:text-2xl">*</span>
              July, </span
            ><br />
            2024</span
          >
        </div>
        <div
          class="w-7 h-7 absolute z-10 bg-yellow-400 rounded-full -right-4 top-[50%] transform -translate-y-1/2"
        ></div>
      </div>
      <div
        class="submit-button noise relative -z-5"
        style="justify-content: center; align-items: center; display: flex"
      >
        <div
          class="flex gap-4 md:gap-3 px-2 flex-col text-yellow-500 items-center justify-center"
        >
          <span class="text-xs md:text-base"
            >Registration & Red Carpet - <span></span> 9:00am
          </span>
          <span class="text-xs md:text-base">Event Starts 10:00am Prompt</span>
        </div>
        <div
          class="w-8 h-8 absolute footer-noise rounded-full -left-[0.8rem] top-[50%] transform -translate-y-1/2 -z-1"
        ></div>
      </div>
    </div>
    <div class="pb-3 mt-3">
      <div class="text-xs text-center font-bold text-white">
        For Further Inquiries: +2348101346052 | +2348183135120
      </div>
    </div>
    <div class="text-center text-yellow-400 py-2 font-bold">
      <!-- style="background-color: black" -->
      &copy; 2024
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";
import { fullBio } from "../constants.js";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "ReadMore",

  setup() {
    const route = useRoute();
    const router = useRouter();

    const detailsToDisplay = ref([]);
    // console.log("🚀 ~ fullBio:", fullBio);

    const previousBtnClicked = () => {
      router.push({ path: `/readmore/${+route.params.id - 1}` });
    };
    const nextBtnClicked = () => {
      router.push({ path: `/readmore/${+route.params.id + 1}` });
    };

    watch(
      () => route.params.id,
      (newId, oldId) => {
        detailsToDisplay.value = fullBio.filter(
          (item) => item.id == (newId || route.params.id)
        );
        window.scroll(0, 0);
        console.log("🚀 ~ setup ~ detailsToDisplay:", detailsToDisplay);
      }
    );

    onMounted(() => {
      detailsToDisplay.value = fullBio.filter(
        (item) => item.id == (route.params.id || 1)
      );
    });

    return {
      previousBtnClicked,
      nextBtnClicked,
      detailsToDisplay,
      route,
      fullBio,
    };
  },
});
</script>
<style scoped>
.footer-noise {
  /* position: absolute;
  top: 0;
  left: 0; */
  background-image: url("../assets/footer-noise.png");
  background-repeat: repeat, repeat;
  background-repeat: repeat, repeat;
}
.noise {
  background-image: url("../assets/NoiseBg.png");
}
</style>

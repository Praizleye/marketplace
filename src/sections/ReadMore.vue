<template>
  <div class="w-full bg-yellow-100 pb-8">
    <div class="flex flex-col-reverse justify-center items-center">
      <div>
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
        class="text-white bg-blue-500 submit-button md:block mt-3 md:mt-6 w-[10rem]"
        style="border-radius: 0; border-right: 1px solid white"
        :disabled="+route.params.id === 1"
      >
        Prev
      </button>
      <button
        @click="nextBtnClicked"
        class="text-white bg-blue-500 submit-button md:block mt-3 md:mt-6 w-[10rem]"
        style="border-radius: 0"
        :disabled="+route.params.id === fullBio.length"
      >
        Next
      </button>
    </div>
  </div>
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

<template>
  <div class="w-full" id="about">
    <div class="flex flex-col-reverse">
      <!-- <Splide
        :options="options"
        aria-label="My Favorite Images"
        class="w-[100vw]"
      >
        <SplideSlide v-for="(item, index) in slides" :key="item.id">
          <div
            class="flex flex-col md:flex-row justify-center text-center items-center"
            :class="index % 2 === 1 ? 'odd' : 'even'"
          >
            <div
              class="flex flex-col items-between justify-center w-full md:w-1/2"
            >
              <img :src="item.image" />
            </div>
          </div>
        </SplideSlide>
      </Splide> -->
      <div
        class="flex flex-col md:flex-row justify-center text-center items-center"
        :class="index % 2 === 1 ? 'odd' : 'even'"
      >
        <div class="flex flex-col items-between justify-center w-full md:w-1/2">
          <img :src="FlierTwo" />
        </div>
      </div>
      <div>
        <div
          class="my-6 mx-12 text-yellow-500 font-bold text-center flex justify-center items-center"
        >
          <h1 class="text-2xl md:text-3xl lg:text-4xl">About</h1>
        </div>
        <div
          class="text-center text-sm md:text-xl lg:text-2xl mt-6 px-6 pb-8 text-gray-500"
        >
          Marketplace Stakeholders Africa is a revolutionary conference
          organised by Maime Innovation Foundation, in collaboration with The
          Metropolitan Church to bring together captains of industries,
          marketplace leaders, creatives, market experts, innovators, business
          men and women in different sectors across African countries. The event
          will serve as a forum for open dialogue with industry stakeholders and
          the press in an open intelligent conversation to identify prevalent
          problems related to their respective industry and proffer contemporary
          solutions to each of the identified industrial problems by making
          these respective industries work through production intelligence. The
          concept of production intelligence is basically the instinctual
          ability to use one’s knowledge, past experience, information,
          understanding, insight, reasoning or set of skillsto improve the
          African economy by intelligently inventing a brand, software, machine,
          robot, artificial intelligence, product, or produce a service that can
          proffer solution to specific real life problem in Africa or solve a
          specific problem in a community, organisation or the marketplace. The
          conference will give every young entrepreneur, marketplace leader,
          students and innovator the opportunity to gain exposure about diverse
          industries in the marketplace from a global perspective, and thereby
          create an enabling environment for investors to maximise every
          untapped potential and resources spread across the African continent.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { defineComponent } from "vue";
import "@splidejs/vue-splide/css";
import "../index.css";
import FlierOne from "../assets/flier1.jpg";
import FlierTwo from "../assets/flier2.jpg";
import FlierThree from "../assets/flier3.jpeg";
import FlierFour from "../assets/flier4.jpeg";
import FlierFive from "../assets/flier5.jpeg";
import FlierSix from "../assets/flier6.jpeg";
import FlierSeven from "../assets/flier7.jpeg";
import FlierEight from "../assets/flier8.jpeg";
import FlierNine from "../assets/flier9.jpeg";

const options = {
  type: "loop",
  perPage: 1,
  perMove: 1,
  pagination: false,
  autoplay: true,
  rewind: true,
  pauseOnHover: false,
  arrows: false,
  //   breakpoints: {
  //     640: {
  //       perPage: 1,
  //     },
  //     768: {
  //       perPage: 2,
  //     },
  //   },
};

const slides = [
  {
    id: 1,
    image: FlierOne,
  },
  {
    id: 2,
    image: FlierTwo,
  },
  {
    id: 3,
    image: FlierThree,
  },
  {
    id: 4,
    image: FlierFour,
  },
  {
    id: 5,
    image: FlierFive,
  },
  {
    id: 6,
    image: FlierSix,
  },
  {
    id: 7,
    image: FlierSeven,
  },
  {
    id: 8,
    image: FlierEight,
  },
  {
    id: 9,
    image: FlierNine,
  },
];

export default defineComponent({
  name: "AboutSection",
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      slides,
      options,
      FlierOne,
      FlierTwo,
    };
  },
});
</script>

<style scoped>
.even {
  display: "flex";
  display: "flex-reverse";
}
</style>

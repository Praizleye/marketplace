<template>
  <div class="w-full md:pb-10" id="event">
    <div class="my-10 mx-12 text-3xl font-bold text-center text-yellow-500">
      <h1>Meet the Speakers</h1>
    </div>

    <div>
      <Splide
        :options="options"
        aria-label="My Favorite Images"
        class="w-[100vw] mt-12"
      >
        <SplideSlide v-for="(item, index) in slides" :key="item.id">
          <div
            class="flex flex-col md:flex-row justify-center text-center items-center"
            :class="index % 2 === 1 ? 'odd' : 'even'"
          >
            <div
              class="flex flex-col items-between md:gap-4 justify-center w-full md:w-1/2"
            >
              <div
                class="mx-6 text-sm md:text-xl lg:text-2xl font-light md:font-extralight"
              >
                {{ item.title }}
              </div>
              <div
                class="mx-6 text-2xl md:text-4xl lg:text-6xl font-bold text-blue-800"
              >
                {{ item.name }}
              </div>
              <div class="text-xs md:text-xl lg:text-2xl my-6 mx-6">
                {{ item.shortBio }}
                <span
                  class="text-sky-800 md:text-xl lg:text-2xl font-bold text-sm"
                >
                  Read Full Bio
                </span>
              </div>
            </div>
            <img
              :src="item.image"
              :alt="item.title"
              class="object object-cover h-[70vh] md:h-full object-top w-full md:w-1/2"
            />
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { defineComponent } from "vue";
import "@splidejs/vue-splide/css";
import SpeakerOne from "../assets/Speaker1.jpg";
import SpeakerTwo from "../assets/Speaker2.jpg";
import SpeakerThree from "../assets/Speaker3.jpg";
import SpeakerFour from "../assets/Speaker4.jpeg";
import SpeakerFive from "../assets/Speaker5.jpg";
import SpeakerSix from "../assets/Speaker6.jpg";

const options = {
  type: "loop",
  perPage: 1,
  perMove: 1,
  // pagination: false,
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
    id: 4,
    title: "Disruptive Marketplace Mentor (Host)",
    image: SpeakerFour,
    name: "Dr. Mannaseh Dogon",
    shortBio:
      "Manasseh Dogon is the metropolitan lead steward of THE METROPOLITAN CHURCH, a movement and a ministry commissioned with the vision of “raising a breed that will reveal God’s glory, infiltrate governments and command influence” headquartered in Abuja, Nigeria.",
  },
  {
    id: 1,
    title: "CEO of Akin Akinpelu Learning & Development(AAL&D)",
    image: SpeakerOne,
    name: "Dr. Akin Akinpelu",
    shortBio:
      "Dr. Akin Akinpelu is the Lead Pastor of The Eden Centre with several expressions and President of the Grow International Bible School where he mentors ministers of the gospel across the globe.",
  },
  {
    id: 2,
    title: "Online Banking",
    image: SpeakerTwo,
    name: "Stanley Onuorah",
    shortBio:
      "popularly reputable as Online banker. He is number one financial inclusion champion in Nigeria, with over a decade experience in Fintech and also in banking across commercial banking, microfinance banking and development finance at large.",
  },
  {
    id: 3,
    title: "Judge Of Federal High Court, Nigeria",
    image: SpeakerThree,
    name: "HON. Justice Mabel T. Segun Bello",
    shortBio: "Honorable Judge of the Federal High Court, Nigeria.",
  },
  {
    id: 5,
    title: "Social Entrepreneur and Private Investor",
    image: SpeakerFive,
    name: "Teniola Eleoramo",
    shortBio:
      "Teniola Eleoramo is the Founder and Group ManaginG Director of the Kohath Investment Group, a wholly owned Nigerian holding company formed in 2004 with interests in new city development, mining, energy and agriculture.",
  },
  {
    id: 6,
    name: "Dr, Sa'adatu Adamu",
    image: SpeakerSix,
    title: "Founder, Secure-D-Future International Initiative (SDF)",
    shortBio:
      "Founder, Secure-D-Future International Initiative (SDF). She is a mental health counselor working with victims of human trafficking, rape, substance and emotional abuse.",
  },
];

export default defineComponent({
  name: "PopularDestinations",
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      slides,
      options,
      SpeakerOne,
      SpeakerTwo,
      SpeakerThree,
      SpeakerFive,
      SpeakerSix,
    };
  },
});
</script>

<style scoped>
.even {
  display: "flex-reverse";
}
</style>

<template>
  <!-- отображение для десктопа -->
  <div class="desc_view">
    <diary-item
      v-for="(item, index) in daysOfTheWeek"
      :key="index"
      :theDay="item"
      :index="index"/>
  </div>

  <!-- отображение для мобайла -->
  <div class="mob_view">
    <swiper v-bind="swiperOptions" class="mySwiper">

      <swiper-slide
        v-for="(item, index) in daysOfTheWeek"
        :key="index">
          <diary-item
            :theDay="item"
            :index="index"/>
      </swiper-slide>

    </swiper>
  </div>
</template>

<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/free-mode';
  import 'swiper/css/pagination';
  import { FreeMode, Pagination } from 'swiper/modules';

  import DiaryItem from "@/components/DiaryItem.vue"

  const daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  const swiperOptions = {
    spaceBetween: 10,
    slidesPerView: 2,
    pagination: { clickable: true },
    breakpoints: {
      620: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      660: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      870: {
        slidesPerView: 4,
        spaceBetween: 25,
      },
      1100: {
        slidesPerView: 5,
        spaceBetween: 20,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .swiper {
    cursor: grab;
    width: 98vw;
    height: 100%;
  }

  .desc_view {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .mob_view {
    display: none;
  }

  @media (max-width: 1450px) {
    .desc_view {
      display: none;
    }

    .mob_view {
      display: block;
    }
  }
</style>
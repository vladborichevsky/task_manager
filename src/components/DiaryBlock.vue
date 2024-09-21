<template>
  <div class="diary_block">

    <diary-item
      v-for="(item, index) in daysOfTheWeek"
      :key="index"
      :theDay="item"
      :index="index"/>

  </div>
</template>

<script setup>
  import DiaryItem from "@/components/DiaryItem.vue"

  components: {
    DiaryItem
  }

  const daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

</script>

<style lang="scss" scoped>
  .diary_block {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>
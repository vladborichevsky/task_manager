<template>
  <div 
    v-if="props.buttonName == 'outstanding'"
    class="btn_bottom_block_wrapper">
      <button
        v-if="props.mainArray?.length == 0"
        disabled 
        class="btn_bottom_block_disabled"
        title="There are no outstanding tasks">
          <slot></slot>
      </button>

      <button
        v-else
        @click="outstanding()" 
        class="btn_bottom_block outstanding_btn_bcg_color"
        :class="{ empty: props.mainArray?.length == 0 }">
          <slot></slot>
      </button>
    
      <div 
        v-show="props.mainArray?.length > 0"
        class="number_of_tasks">
          {{ props.mainArray?.length }}
      </div>
  </div>

  <div 
    v-if="props.buttonName == 'upcoming'"
    class="btn_bottom_block_wrapper">
      <button
        @click="upcoming()" 
        class="btn_bottom_block upcoming_btn_bcg_color"
        :class="{ empty: props.mainArray?.length == 0 }">
          <slot></slot>
      </button>
  
      <div 
        v-show="props.mainArray?.length > 0"
        class="number_of_tasks">
          {{ props.mainArray?.length }}
      </div>
  </div>
</template>

<script setup>

  const props = defineProps({
    buttonName: String,
    mainArray: Array
  })

  const emit = defineEmits(['outstanding', 'upcoming'])

  const outstanding = () => {
    emit('outstanding') 
  }

  const upcoming = () => {
    emit('upcoming') 
  }

</script>

<style lang="scss" scoped>
  .btn_bottom_block_wrapper {
    position: relative;
    margin: 0 10px;
  }

  .btn_bottom_block {
    cursor: pointer;
    padding: 10px 15px;
    border-radius: $border-radius;
    font-size: 18px;
    font-weight: 600;
  }

  .btn_bottom_block:hover {
    border: 2px solid $white-color;
  }

  .btn_bottom_block_disabled {
    cursor: not-allowed;
    background-color: $light-gray-color;
    border: 2px solid $light-gray-color;
    padding: 10px 15px;
    border-radius: $border-radius;
    font-size: 18px;
    font-weight: 600;
  }

  .outstanding_btn_bcg_color {
    background-color: $red-color;
    border: 2px solid $red-color;
  }

  .upcoming_btn_bcg_color {
    background-color: $green-color;
    border: 2px solid $green-color;
  }

  .number_of_tasks {
    position: absolute;
    top: -10px;
    right: 0;
    background-color: $blue-color;
    border-radius: 100%;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
  }
</style>
<template>
  <div class="item_from_the_task_list">
    <div 
      @click="click()"
      class="item_from_the_task_list_name">
        {{ taskName }}
    </div>
    
    <div class="item_from_the_task_list_date">
      {{ task[2] }}
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps({ 
    task: Array,
    id: Number
  })  
  
  const emit = defineEmits(['click'])

  const taskName = computed( ()=> {
    if(props.task[0].length > 45) {
      return props.task[0].slice(0, 45) + '...'
    } else {
      return props.task[0]
    }
  }) 

  const click = () => {
    emit('click') 
  }
</script>

<style lang="scss" scoped>
  .item_from_the_task_list {
    width: 650px;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;

    &_name {
      cursor: pointer;
      width: 550px;
      background-color: $gray-color;
      border-radius: $border-radius;
      border: 1px solid $gray-color;
      font-size: 22px;
      padding: 10px 15px;

      &:hover {
        border: 1px solid $blue-color;
      }
    }

    &_date {
      padding: 10px 15px;
      font-size: 22px;
      font-weight: 600;
      color: $blue-color;
    }
  }
</style>
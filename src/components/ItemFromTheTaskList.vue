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
    return props.task[0]
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
      white-space: nowrap; 
      overflow: hidden; 
      text-overflow: ellipsis;

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

  @media (max-width: 1000px) {
    .item_from_the_task_list {
      width: 550px;
    }
  }

  @media (max-width: 700px) {
    .item_from_the_task_list {
      width: 450px;
    }
  }

  @media (max-width: 600px) {
    .item_from_the_task_list {
      width: 80vw;

      &_date {
        padding: 15px 5px;
        font-size: 16px;
      }
    }
  }
</style>
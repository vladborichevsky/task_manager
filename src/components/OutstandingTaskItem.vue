<template>
  <div class="outstanding_tasks__item">
    <div 
      @click="$router.push(`/task/outstandingTasks_${props.id + 1}`)"
      class="outstanding_tasks__item_name">
        {{ taskName }}
    </div>
    
    <div class="outstanding_tasks__item_date">
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

  const taskName = computed( ()=> {
    if(props.task[0].length > 45) {
      return props.task[0].slice(0, 45) + '...'
    } else {
      return props.task[0]
    }
  }) 
</script>

<style scoped>
  .outstanding_tasks__item {
    width: 650px;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
  }

  .outstanding_tasks__item_name {
    cursor: pointer;
    width: 550px;
    background-color: var(--gray-color);
    border-radius: var(--border-radius);
    border: 1px solid var(--gray-color);
    font-size: 22px;
    padding: 10px 15px;
  }

  .outstanding_tasks__item_name:hover {
    border: 1px solid var(--blue-color);
  }

  .outstanding_tasks__item_date {
    padding: 10px 15px;
    font-size: 22px;
    font-weight: 600;
    color: var(--blue-color);
  }
</style>
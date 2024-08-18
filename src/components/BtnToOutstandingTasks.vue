<template>
  <div class="to_outstanding_tasks">

    <div class="to_outstanding_tasks_wrapper">
      <button
        v-if="outstandingTasks.length == 0"
        disabled 
        class="to_outstanding_tasks_btn_disabled"
        title="There are no outstanding tasks">
        Outstanding tasks
      </button>

      <button
        v-else
        @click="router.push('/outstanding_tasks')" 
        class="to_outstanding_tasks_btn"
        :class="{ empty: outstandingTasks.length == 0}">
        Outstanding tasks
      </button>
    
      <div 
        v-show="outstandingTasks.length > 0"
        class="number_of_outstanding_tasks">
          {{ outstandingTasks.length }}
      </div>
    </div>

  </div>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { computed } from 'vue' 
  import { useRouter } from 'vue-router'

  const store = useStore() 
  const router = useRouter()

  const outstandingTasks = computed( () => store.state.objOfTasks.outstandingTasks)
</script>

<style scoped>
  .to_outstanding_tasks {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .to_outstanding_tasks_wrapper {
    position: relative;
  }

  .to_outstanding_tasks_btn {
    cursor: pointer;
    background-color: var(--red-color);
    padding: 10px 15px;
    border: 2px solid var(--red-color);
    border-radius: var(--border-radius);
    font-size: 18px;
    font-weight: 600;
  }

  .to_outstanding_tasks_btn:hover {
    border: 2px solid var(--white-color);
  }

  .to_outstanding_tasks_btn_disabled {
    cursor: not-allowed;
    background-color: var(--light-gray-color);
    border: 2px solid var(--light-gray-color);
    padding: 10px 15px;
    border-radius: var(--border-radius);
    font-size: 18px;
    font-weight: 600;
  }

  .number_of_outstanding_tasks {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: var(--blue-deep-color);
    border-radius: 100%;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
  }
</style>
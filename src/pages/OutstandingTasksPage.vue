<template>
  <div>
    <div class="outstanding_tasks__header">
      Outstanding tasks
    </div>
  
    <div class="outstanding_tasks__block">
      <div class="outstanding_tasks__wrapper">

        <outstanding-task-item
        v-for="(item, index) in outstandingTasks"
        :task="item"
        :id="index"
        :key="index"/>

      </div>
    </div>

    <btn-backward/>
  </div>
</template>

<script setup>
  import { onMounted, computed } from 'vue'
  
  import OutstandingTaskItem from "@/components/OutstandingTaskItem.vue"
  import BtnBackward from "@/components/UI/BtnBackward.vue"

  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  components: {
    OutstandingTaskItem, BtnBackward
  }

  const router = useRouter()
  const store = useStore() 

  const outstandingTasks = computed( () => store.state.objOfTasks.outstandingTasks)

  onMounted( () => {
    if(outstandingTasks.value.length == 0) {
      router.push('/')
    }
  })

</script>

<style scoped>
  .outstanding_tasks__header {
    text-align: center;
    color: var(--gray-color);
    margin-bottom: 25px;
    font-size: 30px;
    font-weight: 600;
  }

  .outstanding_tasks__block {
    width: 750px;
    height: 450px;
    background-color: var(--black-color);
    border-radius: var(--border-radius);
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  .outstanding_tasks__wrapper {
    overflow-y: auto;
    height: 440px;
  }

  .outstanding_tasks__wrapper::-webkit-scrollbar {
    width: 10px;
    background: var(--light-gray-color);
    border-radius: var(--border-radius);
  }

  .outstanding_tasks__wrapper::-webkit-scrollbar-thumb {
    background-color: var(--white-color); /* Цвет бегунка */
    border-radius: var(--border-radius);
  }

</style>
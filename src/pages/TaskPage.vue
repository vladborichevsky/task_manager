<template>
  <div>
    <div class="header">
      {{ header }} / {{ date }}
    </div>

    <div class="task_window">
      <div class="task_window__title">
        {{ title }}
      </div>

      <hr>

      <div class="task_window__descr">
        {{ description }}
      </div>
    </div>

    <div class="footer">

      <btn-edit-task
        :theDay="theDay"
        :idTheTask="idTheTask"
        :date="date"/>

      <btn-backward/>

      <btn-delete-task
        :theDay="theDay"
        :idTheTask="idTheTask"/>

    </div>
  </div>
</template>

<script setup>
  import BtnBackward from "@/components/UI/BtnBackward.vue"
  import BtnDeleteTask from "@/components/UI/BtnDeleteTask.vue"
  import BtnEditTask from "@/components/UI/BtnEditTask.vue"

  import { computed } from "vue"
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex' 

  components: {
    BtnBackward, BtnDeleteTask, BtnEditTask
  }

  const route = useRoute()
  const store = useStore() 

  const theDay = route.params.theDay.split('_')[0]
  const idTheTask = route.params.theDay.split('_')[1] - 1
  const objOfTasks = store.state.objOfTasks
  const title = objOfTasks[theDay]?.[idTheTask]?.[0]
  const description = objOfTasks[theDay]?.[idTheTask]?.[1]
  const date = objOfTasks[theDay]?.[idTheTask]?.[2]

  const header = computed( () => {
    if(theDay == 'outstandingTasks') {
      return 'outstanding task'
    } else {
      return theDay
    }
  })

</script>

<style scoped>
  .header {
    color: var(--black-color);
    font-size: 35px;
    font-weight: 600;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 15px;
  }

  .task_window {
    width: 600px;
    height: 350px;
    background-color: var(--black-color);
    border: 2px solid var(--light-gray-color);
    border-radius: var(--border-radius);
    padding: 20px 15px;
  }

  .task_window__title {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    color: var(--blue-color);
  }

  .task_window__descr {
    font-size: 20px;
    overflow-y: auto;
    max-height: 260px;
  }

  .task_window__descr::-webkit-scrollbar {
    width: 10px;
    background: var(--light-gray-color);
    border-radius: var(--border-radius);
  }

  .task_window__descr::-webkit-scrollbar-thumb {
    background-color: var(--white-color); /* Цвет бегунка */
    border-radius: var(--border-radius);
  }

  hr {
    margin: 10px 0;
    border: 1px solid var(--light-gray-color);
  }

  .footer {
    display: flex;
    justify-content: space-between;
  }
</style>


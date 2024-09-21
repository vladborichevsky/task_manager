<template>
  <div>
    <div class="task_header">
      {{ header }} / {{ date }} 
      
      <div
        v-if="theDay == 'upcomingTasks'"
        @click="useChangeTaskDate(store, router, theDay, idTheTask)" 
        class="task_header_icon"
        alt="calendar" 
        title="Сhange task date">
      </div>

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

    <div class="task_footer">

      <standard-button
        v-if="theDay != 'outstandingTasks'"
        @click="useEditTask(store, router, theDay, idTheTask)"
        :imgSrc="imgSrcButtons.edit"
        :text="textButtons.edit"/>  

      <standard-button
        v-if="theDay == 'outstandingTasks'"
        @click="useRestoreTask(store, router, theDay, idTheTask)"
        :imgSrc="imgSrcButtons.restore"
        :text="textButtons.restore"
        :hoverAction="true"/>

      <standard-button
        @click="backwardPage()"
        :imgSrc="imgSrcButtons.backward"
        :text="textButtons.backward"/>

      <standard-button
        @click="useDeleteTask(store, router, theDay, idTheTask)"
        :imgSrc="imgSrcButtons.delete"
        :text="textButtons.delete"/>

    </div>
  </div>
</template>

<script setup>
  import { computed, onMounted } from "vue"
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex' 

  const route = useRoute()
  const router = useRouter()
  const store = useStore() 

  // слушатель события нажатия клавиши Backspace 
  import { useBackspaceKpressEventListener }  from '../hooks/useBackspaceKpressEventListener.js'
  // функция удаления задачи 
  import { useDeleteTask } from '../hooks/useDeleteTask.js'
  // функция восстановления задачи 
  import { useRestoreTask } from '../hooks/useRestoreTask.js'
  // функция изменения задачи 
  import { useEditTask } from '../hooks/useEditTask.js'
  // функция изменения даты задачи 
  import { useChangeTaskDate } from '../hooks/useChangeTaskDate.js'
  
  // проверяем, что если в localStorage есть объект objOfTasks, то данные из него помещаем в наш VueX
  if(localStorage.getItem('objOfTasks') != null && Object.entries(JSON.parse(localStorage.getItem('objOfTasks'))).length > 0) {
    store.commit('setValuesFromLocalStorage', JSON.parse(localStorage.getItem('objOfTasks')))
  }

  const theDay = route.params.theDay.split('_')[0]
  const idTheTask = route.params.theDay.split('_')[1] - 1
  const objOfTasks = store.state.objOfTasks
  const title = objOfTasks[theDay]?.[idTheTask]?.[0]
  const description = objOfTasks[theDay]?.[idTheTask]?.[1]
  const date = objOfTasks[theDay]?.[idTheTask]?.[2]

  const textButtons = {
    delete: "delete task",
    edit: "edit task",
    restore: "restore task",
    backward: "backward"
  }

  const imgSrcButtons = {
    delete: "/icons/icon-delete.png",
    edit: "/icons/icon-edit.png",
    restore: "/icons/icon-restore.png",
    backward: "/icons/icon-back.png"
  }

  const header = computed( () => {
    if(theDay == 'outstandingTasks') {
      return 'Outstanding task'
    } else if(theDay == 'upcomingTasks') {
      return 'Upcoming task'
    } else {
      return `${theDay[0].toUpperCase()}${theDay.slice(1)}`
    }
  })

  const backwardPage = () => {
    router.go(-1)
  }

  // слушатель события нажатия клавиши Backspace 
  if(theDay == 'outstandingTasks') {
    useBackspaceKpressEventListener(router, '/outstanding_tasks')
  } else if (theDay == 'upcomingTasks') {
    useBackspaceKpressEventListener(router, '/upcoming_tasks')
  } else {
    useBackspaceKpressEventListener(router, '/')
  }


  onMounted( ()=> {
    // запускаем функцию, которая проверяет таски в каждом дне недели, и если срок выполнения какой-то таски прошёл, добавляет её в outstandingTasks 
    store.dispatch('updateObjOfTasks')

    // подписываем на метод watch для mutations из VueX. При каждом вызове любого из mutations мы обновляем данные в localStorage
    store.subscribe( () => {
      localStorage.setItem('objOfTasks', JSON.stringify(store.state.objOfTasks));
    }) 
  }) 
</script>

<style lang="scss" scoped>
  .task_header {
    color: $black-color;
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
    background-color: transparent;
  }

  .task_header img {
    cursor: pointer;
    width: 30px;
    margin-left: 8px;
  }

  .task_header_icon {
    cursor: pointer;
    display: inline-block;
    background-image: url("/icons/icon-calendar.svg");
    background-color: transparent;
    width: 30px;
    height: 30px;
  }

  .task_header_icon:hover {
    background-image: url("/icons/icon-calendar-hover.svg");
  }

  .task_window {
    width: 600px;
    height: 350px;
    background-color: $black-color;
    border: 2px solid $light-gray-color;
    border-radius: $border-radius;
    padding: 20px 15px;
  }

  .task_window__title {
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    color: $blue-color;
  }

  .task_window__descr {
    font-size: 20px;
    overflow-y: auto;
    max-height: 260px;
  }

  .task_window__descr::-webkit-scrollbar {
    width: 10px;
    background: $light-gray-color;
    border-radius: $border-radius;
  }

  .task_window__descr::-webkit-scrollbar-thumb {
    background-color: $white-color;
    border-radius: $border-radius;
  }

  hr {
    margin: 10px 0;
    border: 1px solid $light-gray-color;
  }

  .task_footer {
    display: flex;
    justify-content: space-between;
  }
</style>


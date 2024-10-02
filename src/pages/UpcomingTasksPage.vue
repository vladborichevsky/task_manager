<template>
  <div>
    <div class="upcoming_tasks__header">
      Upcoming tasks
    </div>
  
    <div class="upcoming_tasks__block">
      <div class="upcoming_tasks__wrapper">

        <item-from-the-task-list
          v-for="(item, index) in upcomingTasks"
          :task="item"
          :id="index"
          :key="index"
          @click="goToTask(index)"/>

      </div>
    </div>

    <div class="upcoming_tasks__footer">
      <standard-button
        @click="useAddNewUpcomingTask(store)"
        :imgSrc="imgSrcButtons.addTask"
        :text="textButtons.addTask"
        :hoverAction="true"/>

      <standard-button
        @click="backwardPage()"
        :imgSrc="imgSrcButtons.backward"
        :text="textButtons.backward"/>
    </div>

  </div>
</template>

<script setup>
  import ItemFromTheTaskList from "@/components/ItemFromTheTaskList.vue"

  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  // слушатель события нажатия клавиши Backspace 
  import { useBackspaceKpressEventListener }  from '../hooks/useBackspaceKpressEventListener.js'
// функция добавления новой долгосрочной задачи 
  import { useAddNewUpcomingTask }  from '../hooks/useAddNewUpcomingTask.js'
  
  const router = useRouter()
  const store = useStore() 

  const upcomingTasks = computed( () => store.state.objOfTasks.upcomingTasks)
  const updateUpcomingTasks = () => store.dispatch('updateUpcomingTasks')

  // проверяем, что если в localStorage есть объект objOfTasks, то данные из него помещаем в наш VueX
  if(localStorage.getItem('objOfTasks') != null && Object.entries(JSON.parse(localStorage.getItem('objOfTasks'))).length > 0) {
    store.commit('setValuesFromLocalStorage', JSON.parse(localStorage.getItem('objOfTasks')))
  }

  // функция, которая проверяет все будущие задачи - если дата какой-то из них наступает в ближайшую неделю, то добавляет её в соответствующий день
  updateUpcomingTasks()

  const textButtons = {
    addTask: "add upcoming task",
    backward: "backward"
  }

  const imgSrcButtons = {
    addTask: "/icons/icon-plus.png",
    backward: "/icons/icon-back.png"
  }

  const goToTask = (id) => {
    router.push(`/task/upcomingTasks_${id + 1}`)
  }

  const backwardPage = () => {
    router.go(-1)
  }
  
  // слушатель события нажатия клавиши Backspace 
  useBackspaceKpressEventListener(router, '/')

</script>

<style lang="scss" scoped>
  .upcoming_tasks__header {
    @include upcoming_and_outstanding_tasks__header
  }

  .upcoming_tasks__block {
    @include upcoming_and_outstanding_tasks__block
  }

  .upcoming_tasks__wrapper {
    @include upcoming_and_outstanding_tasks__wrapper
  }

  .upcoming_tasks__wrapper::-webkit-scrollbar {
    @include upcoming_and_outstanding_tasks__wrapper_webkit_scrollbar
  }

  .upcoming_tasks__wrapper::-webkit-scrollbar-thumb {
    @include upcoming_and_outstanding_tasks__wrapper_webkit_scrollbar_thumb
  }

  .upcoming_tasks__footer {
    display: flex;
    justify-content: space-between;
  }
</style>
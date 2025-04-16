<template>
  <div>
    <div class="outstanding_tasks__header">
      Outstanding tasks
    </div>
  
    <div class="outstanding_tasks__block">
      <div class="outstanding_tasks__wrapper">

        <item-from-the-task-list
          v-for="(item, index) in outstandingTasks"
          :task="item"
          :id="index"
          :key="index"
          @click="goToTask(index)"/>

      </div>
    </div>

    <div class="outstanding_tasks__footer">
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

  const router = useRouter()
  const store = useStore() 

  const outstandingTasks = computed( () => store.state.objOfTasks.outstandingTasks)

  // если список просроченных задач пуст, то router редиректит пользователя на домашнюю странцу. По сути эта функция нужна, если пользователь удаляет последнюю просроченную задачу
  if(outstandingTasks.value.length == 0) {
    router.push('/')
  }

  const textButtons = {
    backward: "backward"
  }

  const imgSrcButtons = {
    backward: "/icons/icon-back.png"
  }

  const goToTask = (id) => {
    router.push(`/task/outstandingTasks_${id + 1}`)
  }

  const backwardPage = () => {
    router.go(-1)
  }

  // слушатель события нажатия клавиши Backspace 
  useBackspaceKpressEventListener(router, '/')
</script>


<style lang="scss" scoped>
  .outstanding_tasks__header {
    @include upcoming_and_outstanding_tasks__header
  }

  .outstanding_tasks__block {
    @include upcoming_and_outstanding_tasks__block
  }

  .outstanding_tasks__wrapper {
    @include upcoming_and_outstanding_tasks__wrapper
  }

  .outstanding_tasks__wrapper::-webkit-scrollbar {
    @include upcoming_and_outstanding_tasks__wrapper_webkit_scrollbar
  }

  .outstanding_tasks__wrapper::-webkit-scrollbar-thumb {
    @include upcoming_and_outstanding_tasks__wrapper_webkit_scrollbar_thumb
  }

  .outstanding_tasks__footer {
    display: flex;
    justify-content: center;
  }
</style>
<template>
  <div class="container">
    <h1>{{ headerTitle }}</h1>

    <diary-block/>

    <btn-to-outstanding-tasks/>

  </div>
</template>


<script setup>
  import { onMounted } from 'vue';
  import { useStore } from 'vuex' 
  import DiaryBlock from "@/components/DiaryBlock.vue"
  import BtnToOutstandingTasks from "@/components/BtnToOutstandingTasks.vue"

  components: {
    DiaryBlock,
    BtnToOutstandingTasks
  }

  const store = useStore() 
  const headerTitle = 'Task Manager'

  onMounted( () => {
    // проверяем, что если в localStorage есть объект objOfTasks, то данные из него помещаем в наш VueX
      if(localStorage.getItem('objOfTasks') != null && Object.entries(JSON.parse(localStorage.getItem('objOfTasks'))).length > 0) {
        store.commit('setValuesFromLocalStorage', JSON.parse(localStorage.getItem('objOfTasks')))
      }

    // запускаем функцию, которая проверяет таски в каждом дне недели, и если срок выполнения какой-то таски прошёл, добавляет её в outstandingTasks 
    store.dispatch('updateObjOfTasks')

    // подписываем на метод watch для mutations из VueX. При каждом вызове любого из mutations мы обновляем данные в localStorage
    store.subscribe( () => {
      localStorage.setItem('objOfTasks', JSON.stringify(store.state.objOfTasks));
    })
  })
  
</script>




<style scoped>
  .container {
    width: 1400px;
    height: 85vh;
  }

  h1 {
    text-align: center;
    color: var(--gray-color);
    margin-bottom: 30px;
    font-size: 36px;
  }
</style>



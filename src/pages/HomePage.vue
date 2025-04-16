<template>
  <div class="container">
    <h1>{{ headerTitle }}</h1>

    <div class="swipe">
      <img src="/icons/swipe-icon.png" alt="swipe" class="swipe-icon">
    </div>
    
    <diary-block/>

    <bottom-block/>
  </div>
</template>


<script setup>
  import { onMounted } from 'vue'

  import { useStore } from 'vuex' 
  
  import DiaryBlock from "@/components/DiaryBlock.vue"
  import BottomBlock from "@/components/BottomBlock.vue"

  const store = useStore() 

  // проверяем, что если в localStorage есть объект objOfTasks, то данные из него помещаем в наш VueX
  if(localStorage.getItem('objOfTasks') != null && Object.entries(JSON.parse(localStorage.getItem('objOfTasks'))).length > 0) {
    store.commit('setValuesFromLocalStorage', JSON.parse(localStorage.getItem('objOfTasks')))
  }

  const headerTitle = 'Task manager'

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
  .container {
    width: 1400px;
    width: 95vw;
    height: 85vh;
  }

  h1 {
    text-align: center;
    color: $gray-color;
    margin-bottom: 20px;
    font-size: 36px;
  }

  .swipe {
    margin: 0 auto;
    justify-content: center;
    margin: 10px 0;
    display: none;
  }

  .swipe-icon {
    width: 40px;
  }

  @media (max-width: 1450px) {
    .swipe {
      display: flex;
    }
  }

  @media (max-width: 410px) {
    .swipe-icon {
      width: 30px;
    }
  }
</style>



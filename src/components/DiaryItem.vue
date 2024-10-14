<template>
  <div 
    :id="theDay" 
    class="diary_item" 
    :class="{ present_day_border: index == presentDay }">

    <div class="diary_item_wrapper">

      <div class="diary_item_header">
        <div class="diary_item_header-day">
          {{ theDay.toLocaleUpperCase() }}
        </div>
        <div 
          class="diary_item_header-date"
          :class="{ present_day_text_col: index == presentDay }">
            {{ dateString }}
        </div>
      </div>

      <hr>

      <div class="task">
        <task-item-home-page
          v-for="(item, index) in arrOfTasks"
          :key="index"
          :task="item"
          :theDay="theDay"
          :id="index"
          :dateString="dateString"/>
            
      </div>

      <div class="add_new_task_wrapper">
        <hr>

        <div 
          @click="useAddNewTask(store, theDay, index)"
          class="add_new_task">
            <img src="/icons/icon-plus.png" alt="add_new_task">
        </div>
      </div>
    </div>
</div>
</template>

<script setup>
  import { useStore } from 'vuex' 
  import { computed } from 'vue' 
  import Swal from 'sweetalert2'
  import TaskItemHomePage from "@/components/TaskItemHomePage.vue"

  // слушатель событий нажатия клавиш 1-7
  import { useNumKpressEventListener }  from '../hooks/useNumKpressEventListener.js'
  // функция получения актуальных дат на дни недели
  import { useGetDateString } from '../hooks/useGetDateString.js'
  // функция добавления новой задачи
  import { useAddNewTask } from '../hooks/useAddNewTask.js'

  const props = defineProps({ 
      theDay: String,
      index: Number
  })

  const newDate = new Date()

  const presentDay = computed(() => {
    if (newDate.getDay() == 0) {
      return 6
    } else {
      return (newDate.getDay() - 1)
    }
  }) 

  const store = useStore() 

  const dateString = useGetDateString(props.index)

  const arrOfTasks = computed( () => store.state.objOfTasks[props.theDay])
  const upcomingTasks = computed( () => store.state.objOfTasks.upcomingTasks)
  const pushToArrOfTasks = (item) => store.commit('pushToArrOfTasks', item)
  const delElArrOfTasks = (item) => store.commit('delElArrOfTasks', item)

  // проверяем будущие задачи из списка upcomingTasks. Если какая-то задача из этого списка стоит на дату одного из дней недели, то эта задача перенесётся на конкретный день и удалится из списка будущих задача upcomingTasks
  upcomingTasks.value.forEach( item => {
    if(dateString == item[2]) {
      pushToArrOfTasks({'day': props.theDay, 'value': item})
      delElArrOfTasks({'day': 'upcomingTasks', 'value': item})
    }
  })

  // слушатель событий нажатия клавиш 1-7
  useNumKpressEventListener(props.theDay, Swal, () => {useAddNewTask(store, props.theDay, props.index)})
</script>

<style lang="scss" scoped>
  .diary_item {
    width: 170px;
    height: 400px;
    background-color: $black-color;
    border: 2px solid $light-gray-color;
    border-radius: $border-radius;
    padding: 20px 10px;

    &_wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }

    &_header {
      text-align: center;
    }

    &_header-day {
      font-weight: 600;
      font-size: 22px;
      color: $blue-color;
    }

    &_header-date {
      font-weight: 600;
      font-size: 18px;
      color: $light-gray-color;
    }
  }

  hr {
    margin: 10px 0;
    border: 1px solid $light-gray-color;
  }

  .task {
    overflow-y: auto;
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::-webkit-scrollbar {
      width: 10px;
      background: $light-gray-color;
      border-radius: $border-radius;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $white-color;
      border-radius: $border-radius;
    }
  }

  .add_new_task_wrapper {
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .add_new_task {
    width: 50px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
      display: block;
      width: 40px;

      &:hover {
        transition: all 0.5s;
        transform: rotate(0.5turn);
      }
    }
  }

  .present_day_border {
    border: 4px solid $blue-color;
  }

  .present_day_text_col {
    color: $white-color;
  }

</style>
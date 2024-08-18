<template>
  <div :id="theDay" class="diary_item" :class="{ present_day_border: props.index == presentDay }">

    <div class="diary_item_wrapper">

      <div class="diary_item_header">
        <div class="diary_item_header-day">
          {{ theDay.toLocaleUpperCase() }}
        </div>
        <div 
          class="diary_item_header-date"
          :class="{ present_day_text_col: props.index == presentDay }">
            {{ dateString(props.index) }}
        </div>
      </div>

      <hr>

      <div class="task">
        <task-item
          v-for="(item, index) in arrOfTasks"
          :key="index"
          :task="item"
          :theDay="theDay"
          :id="index"
          :dateString="dateString(props.index)"/>
            
      </div>

      <div class="add_new_task_wrapper">
        <hr>

        <div 
          @click="addNewTask"
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
  import TaskItem from "@/components/TaskItem.vue"

  // слушатель событий нажатия клавиш 1-7
  import { numberKeypressEventListener }  from '../hooks/numberKeypressEventListener.js'

  import { dateString } from '../hooks/getDateString.js'

  components: { 
    TaskItem
  }

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

  const arrOfTasks = computed( () => store.state.objOfTasks[props.theDay])
  const pushToArrOfTasks = (item) => store.commit('pushToArrOfTasks', item)

  const addNewTask = async () => {
    const { value: formValues } = await Swal.fire({
      stopKeydownPropagation: true,
      confirmButtonText: 'ADD',
      title: `New task for ${props.theDay}`,
      showCancelButton: true,
      cancelButtonColor: '#f10606',
      showCloseButton: true,
      inputAutoTrim: true,
      html: `
        <input id="swal-input1" class="swal2-input" maxlength='60' placeholder="Task name" autofocus>
        <input id="swal-input2" class="swal2-input" maxlength='200' placeholder="Description of the task">
      `,
      didOpen: () => {
        
        Swal.getPopup().addEventListener('keydown', (event) => {
          if(event.code === 'Enter' && document.getElementById("swal-input1").value) {
            Swal.clickConfirm()
          }
        })
      },
      preConfirm: () => {

        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      }
    })

    if (formValues) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task added!",
        showConfirmButton: false,
        timer: 2000
      });

      pushToArrOfTasks({'day': props.theDay, 'value': [formValues[0], formValues[1], dateString(props.index)]})
    }
  }

  // слушатель событий нажатия клавиш 1-7
  numberKeypressEventListener(props.theDay, Swal, addNewTask)

</script>

<style scoped>
  .diary_item {
    width: 170px;
    height: 400px;
    background-color: var(--black-color);
    border: 2px solid var(--light-gray-color);
    border-radius: var(--border-radius);
    padding: 20px 10px;
  }

  .diary_item_wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .diary_item_header {
    text-align: center;
  }

  .diary_item_header-day {
    font-weight: 600;
    font-size: 22px;
    color: var(--blue-color);
  }

  .diary_item_header-date {
    font-weight: 600;
    font-size: 18px;
    color: var(--light-gray-color);
  }

  hr {
    margin: 10px 0;
    border: 1px solid var(--light-gray-color);
  }

  .task {
    overflow-y: auto;
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .task::-webkit-scrollbar {
    width: 10px;
    background: var(--light-gray-color);
    border-radius: var(--border-radius);
  }

  .task::-webkit-scrollbar-thumb {
    background-color: var(--white-color); /* Цвет бегунка */
    border-radius: var(--border-radius);
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
  }

  .add_new_task img {
    display: block;
    width: 30px;
  }

  .add_new_task img:hover {
    transition: all 0.5s;
    transform: rotate(0.5turn);
  }

  .present_day_border {
    border: 4px solid var(--white-color);
  }

  .present_day_text_col {
    color: var(--white-color);
  }

</style>

<template>
  <div
    @click="deleteTask( objOfTasks[props.theDay][props.idTheTask] )"
    class="delete_task">
      delete task
      <img src="/icons/icon-delete.png" alt="delete_task">
  </div>
</template>

<script setup>
  import { useStore } from 'vuex' 
  import { useRouter } from 'vue-router'

  import Swal from 'sweetalert2'

  const store = useStore() 
  const router = useRouter()

  const props = defineProps({
    theDay: String,
    idTheTask: Number
  })


  const objOfTasks = store.state.objOfTasks
  const delElArrOfTasks = ( task ) => store.commit('delElArrOfTasks', { 'day': props.theDay, 'value': task})

  const deleteTask = async (task) => {
    const promise = new Promise((resolve) => {
      delElArrOfTasks(task)
      resolve()
    })

    promise.then( () => router.go(-1) )

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Task deleted",
      showConfirmButton: false,
      timer: 2000
    });
  }
</script>

<style scoped>
  .delete_task {
    cursor: pointer;
    background-color: inherit;
    color: var(--black-color);
    width: fit-content;
    padding: 10px 20px;
    font-size: 20px;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid var(--main-background-color);
  }
  
  .delete_task:hover {
    border-bottom: 2px solid var(--black-color);
  }

  .delete_task img {
    width: 25px;
    margin-left: 8px;
  }
</style>
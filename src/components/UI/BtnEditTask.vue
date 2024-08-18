
<template>
  <div
    @click="editTask" 
    class="edit_task">
      <img src="/icons/icon-edit.png" alt="edit_task">
      edit task
  </div>
</template>

<script setup>

  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex' 

  import Swal from 'sweetalert2'

  const props = defineProps({
    theDay: String,
    idTheTask: Number,
    date: String
  })

  const router = useRouter()
  const store = useStore() 

  const editTaskItem = (task) => store.commit('editTaskItem', task)

  const objOfTasks = store.state.objOfTasks

  const editTask = async () => {
    const { value: formValues } = await Swal.fire({
      stopKeydownPropagation: true,
      confirmButtonText: 'EDIT',
      title: 'Edit task',
      showCancelButton: true,
      cancelButtonColor: '#f10606',
      showCloseButton: true,
      inputAutoTrim: true,
      html: `
        <input id="swal-input1" class="swal2-input" maxlength='60' placeholder="Task name" autofocus>
        <input id="swal-input2" class="swal2-input" maxlength='200' placeholder="Description of the task">
      `,
      didOpen: () => {
        document.getElementById("swal-input1").value = objOfTasks[props.theDay][props.idTheTask][0]
        document.getElementById("swal-input2").value = objOfTasks[props.theDay][props.idTheTask][1]

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
          props.date
        ];
      }
    })

    if (formValues) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task edited!",
        showConfirmButton: false,
        timer: 2000
      });

      editTaskItem({'day': props.theDay,'value': formValues, 'id': props.idTheTask})
      router.go(-1)
    }
  }
</script>

<style scoped>
  .edit_task {
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
  
  .edit_task:hover {
    border-bottom: 2px solid var(--black-color);
  }

  .edit_task img {
    width: 25px;
    margin-right: 8px;
  }
</style>

// функция добавления новой долгосрочной задачи 

import { computed } from "vue"
import Swal from 'sweetalert2'

export async function useAddNewUpcomingTask(store) {
  const pushToArrOfTasks = (item) => store.commit('pushToArrOfTasks', item)
  const updateUpcomingTasks = () => store.dispatch('updateUpcomingTasks')

  const { value: formValues } = await Swal.fire({
    stopKeydownPropagation: true,
    confirmButtonText: 'ADD',
    title: "New task",
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
      if(document.getElementById("swal-input1").value) {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ]
      } else {
        return false
      }
    }
  })

  if (formValues) {
    const { value: date } = await Swal.fire({
      title: "Task date",
      input: "date",
      didOpen: () => {
        const today = (new Date()).toISOString();
        Swal.getInput().min = today.split("T")[0];

        Swal.getPopup().addEventListener('keydown', (event) => {
        if(event.code === 'Enter' && document.getElementById("swal2-input").value) {
          Swal.clickConfirm()
        }
      })
      },
      preConfirm: () => {
        if(document.getElementById("swal2-input").value) {
          return document.getElementById("swal2-input").value
        } else {
          return false
        }
      }
    });

    if (date) {
      const correctDateFormat = computed( () => {
        let arr = date.split('-')
        return `${arr[2]}.${arr[1]}.${arr[0]}`
      })

      pushToArrOfTasks({'day': 'upcomingTasks', 'value': [formValues[0], formValues[1], correctDateFormat.value]})
      updateUpcomingTasks()

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Task added!",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }
}
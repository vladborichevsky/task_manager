
// функция добавления новой задачи 

import Swal from 'sweetalert2'
import { useGetDateString } from '../hooks/useGetDateString.js'

export async function useAddNewTask(store, theDay, index) {
  const pushToArrOfTasks = (item) => store.commit('pushToArrOfTasks', item)

  const { value: formValues } = await Swal.fire({
    stopKeydownPropagation: true,
    confirmButtonText: 'ADD',
    title: `New task for ${theDay}`,
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
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Task added!",
      showConfirmButton: false,
      timer: 2000
    });

    pushToArrOfTasks({'day': theDay, 'value': [formValues[0], formValues[1], useGetDateString(index)]})
  }
}
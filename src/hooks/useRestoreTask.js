
// функция восстановления задачи 

import { computed } from "vue"
import { useDeleteTask } from '../hooks/useDeleteTask.js'
import Swal from 'sweetalert2'

export async function useRestoreTask(store, router, theDay, idTheTask) {
  const pushToArrOfTasks = (item) => store.commit('pushToArrOfTasks', item)
  const objOfTasks = store.state.objOfTasks
  const title = objOfTasks[theDay]?.[idTheTask]?.[0]
  const description = objOfTasks[theDay]?.[idTheTask]?.[1]

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
  })

  if (date) {
    const correctDateFormat = computed( () => {
      let arr = date.split('-')
      return `${arr[2]}.${arr[1]}.${arr[0]}`
    })

    pushToArrOfTasks({'day': 'upcomingTasks', 'value': [title, description, correctDateFormat.value]})
    useDeleteTask(store, router, theDay, idTheTask)
    router.go(-1)

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Task restored!",
      showConfirmButton: false,
      timer: 2000
    });
  }
}

// функция восстановления задачи 
import { computed } from "vue"
import Swal from 'sweetalert2'

export async function useChangeTaskDate(store, router, theDay, idTheTask) {
  const objOfTasks = store.state.objOfTasks
  const title = objOfTasks[theDay]?.[idTheTask]?.[0]
  const description = objOfTasks[theDay]?.[idTheTask]?.[1]
  
  const editTaskItem = (item) => store.commit('editTaskItem', item)
  const updateUpcomingTasks = () => store.dispatch('updateUpcomingTasks')

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

    editTaskItem({'day': 'upcomingTasks', 'id': idTheTask, 'value': [title, description, correctDateFormat.value]})
    updateUpcomingTasks()

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Task date changed!",
      showConfirmButton: false,
      timer: 2000
    });

    router.go(-1)
  }
}
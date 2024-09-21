
// функция удаления задачи 

import Swal from 'sweetalert2'

export async function useDeleteTask(store, router, theDay, idTheTask) {
  const delElArrOfTasks = (item) => store.commit('delElArrOfTasks', item)
  const objOfTasks = store.state.objOfTasks

  const promise = new Promise((resolve) => {
    delElArrOfTasks({'day': theDay, 'value': objOfTasks[theDay][idTheTask]})
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
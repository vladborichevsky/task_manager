
// функция восстановления задачи 

import Swal from 'sweetalert2'

export async function useEditTask(store, router, theDay, idTheTask) {
  const objOfTasks = store.state.objOfTasks
  const date = objOfTasks[theDay]?.[idTheTask]?.[2]
  const editTaskItem = (item) => store.commit('editTaskItem', item)

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
      document.getElementById("swal-input1").value = objOfTasks[theDay][idTheTask][0]
      document.getElementById("swal-input2").value = objOfTasks[theDay][idTheTask][1]

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
        date
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

    editTaskItem({'day': theDay,'value': formValues, 'id': idTheTask})
    router.go(-1)
  }
}
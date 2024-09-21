
// слушатель событий нажатия клавиш 1-7

export const useNumKpressEventListener = function (theDay, Swal, addNewTask) {
  document.querySelector('body').addEventListener('keyup', (event) => {
    if(event.code === "Digit1" && theDay === 'monday') {
      if(!Swal.isVisible()) addNewTask()
    }

    if(event.code === "Digit2" && theDay === 'tuesday') {
      if(!Swal.isVisible()) addNewTask()
    }

    if(event.code === "Digit3" && theDay === 'wednesday') {
      if(!Swal.isVisible()) addNewTask()
    }

    if(event.code === "Digit4" && theDay === 'thursday') {
      if(!Swal.isVisible()) addNewTask()
    }

    if(event.code === "Digit5" && theDay === 'friday') {
      if(!Swal.isVisible()) addNewTask()
    }

    if(event.code === "Digit6" && theDay === 'saturday') {
      if(!Swal.isVisible()) addNewTask()
    }

    if(event.code === "Digit7" && theDay === 'sunday') {
      if(!Swal.isVisible()) addNewTask()
    }
  })
}
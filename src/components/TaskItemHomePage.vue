<template>
  <div
    draggable="true"
    ref="dragg"
    @dragstart.prevent="ondragstart"
    @click="$router.push(`/task/${props.theDay}_${props.id + 1}`)"
    class="task_item">
      {{ taskName }}
  </div>
</template>

<script setup>
  import { useStore } from 'vuex'  
  import { ref, computed } from 'vue'

  const props = defineProps({ 
    task: Array,
    theDay: String,
    dateString: String,
    id: Number
  })   

  const store = useStore() 

  const taskName = computed( ()=> {
    if(props.task[0].length > 18) {
      return props.task[0].slice(0, 18) + '...'
    } else {
      return props.task[0]
    }
  }) 

  // тот самый dragg-элемент
  const dragg = ref(null)
  // потенциальная цель переноса, над которой мы "пролетаем" прямо сейчас
  let currentDroppable = ref(null)

  const ondragstart = function(event) { // (1) отследить нажатие
    let shiftX = event.clientX - dragg.value.getBoundingClientRect().left
    let shiftY = event.clientY - dragg.value.getBoundingClientRect().top
    
    // (2) подготовить к перемещению:
    // разместить поверх остального содержимого и в абсолютных координатах
    dragg.value.style.position = 'absolute'
    dragg.value.style.zIndex = 1000
    
    // переместим в body, чтобы dragg-элемент был точно не внутри position:relative
    document.body.append(dragg.value)
    // и установим абсолютно спозиционированный dragg-элемент под курсор

    moveAt(event.pageX, event.pageY)

    // передвинуть dragg-элемент под координаты курсора
    // и сдвинуть на половину ширины/высоты для центрирования
    function moveAt(pageX, pageY) {
      dragg.value.style.left = pageX - shiftX + 'px'
      dragg.value.style.top = pageY - shiftY + 'px'
    }

    function onMouseMove(event) {      
      moveAt(event.pageX, event.pageY);

      dragg.value.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
      dragg.value.hidden = false
      // событие mousemove может произойти и когда указатель за пределами окна
      // (dragg-элемент перетащили за пределы экрана)

      // если clientX/clientY за пределами окна, elementFromPoint вернёт null
      if (!elemBelow) return

      // потенциальные цели переноса помечены классом .diary_item
      let droppableBelow = elemBelow.closest('.diary_item')

      if (currentDroppable.value != droppableBelow) {
        if (currentDroppable.value) {
          // логика обработки процесса "вылета" из droppable (удаляем подсветку)
          leaveDroppable(currentDroppable.value);
        }
        
        currentDroppable.value = droppableBelow;

        if (currentDroppable.value) {
          // логика обработки процесса, когда мы "влетаем" в элемент droppable
          enterDroppable(currentDroppable.value);
        }
      }
    }

    // (3) перемещать по экрану
    document.addEventListener('mousemove', onMouseMove)

    // (4) положить dragg-элемент, удалить более ненужные обработчики событий
    dragg.value.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove)
      dragg.value.onmouseup = null

      // этот блок кода нужен, чтобы, если пользователь оставил таску в непредусмотренном месте, то тоска просто возвращалась в свой список
      if (currentDroppable.value == null) {
        
        const updateArrOfTasks = () => store.dispatch('updateArrOfTasks', props.theDay)
        updateArrOfTasks()

        return false
      }

      // логика обработки процесса "вылета" из droppable (удаляем подсветку)
      leaveDroppable(currentDroppable.value)

      // в этой строчке мы получаем строку с датой того дня, куда пользователей перетащил таску
      const newDateString = currentDroppable.value.querySelectorAll('.diary_item_header-date')[0].innerText

      const editTaskItem = (task) => store.commit('editTaskItem', task)
      editTaskItem({'day': props.theDay,'value': [props.task[0], props.task[1], newDateString], 'id': props.id})

      // важен порядок вызова функций. Если сначала будет pushToArrOfTasks, а потом delElArrOfTasks, то, если пользователь в итоге решит оставить таску в текущем её списке - она удалится
      const delElArrOfTasks = () => store.commit('delElArrOfTasks', { 'day': props.theDay, 'value': props.task})
      delElArrOfTasks()

      const pushToArrOfTasks = () => store.commit('pushToArrOfTasks',  { 'day': currentDroppable.value.id, 'value': props.task }) 
      pushToArrOfTasks()

      const updateArrOfTasks = () => store.dispatch('updateArrOfTasks', props.theDay)
      updateArrOfTasks()
    }

  };

  function enterDroppable(elem) {
    elem.style.background = '#1b1919'
  }

  function leaveDroppable(elem) {
    elem.style.background = ''
  }
</script>

<style lang="scss" scoped>
  .task_item {
    width: 140px;
    cursor: pointer;
    background-color: $gray-color;
    padding: 15px 7px;
    border-radius: $border-radius;
    border: 1px solid $gray-color;
    margin: 5px 0;
  }

  .task_item:hover {
    border: 1px solid $blue-color;
  }
</style>
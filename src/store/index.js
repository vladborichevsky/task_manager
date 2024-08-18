
import { createStore } from "vuex" 

export default createStore( {
  state: () => ( { 
    objOfTasks: {
      'monday': [],
      'tuesday': [],
      'wednesday': [],
      'thursday': [],
      'friday': [],
      'saturday': [],
      'sunday': [],
      'outstandingTasks': [] 
    }
  }),

  mutations: {
    // функция, которая помещает сохранённые данные из localStorage в наш VueX
    setValuesFromLocalStorage(state, newValue) {
      state.objOfTasks = newValue
    },

    pushToArrOfTasks(state, {day, value}) {
      state.objOfTasks[day].push(value)
    },

    editTaskItem(state, {day, id, value}) {
      state.objOfTasks[day][id][0] = value[0]
      state.objOfTasks[day][id][1] = value[1]
      state.objOfTasks[day][id][2] = value[2]
    },

    delElArrOfTasks(state, {day, value}) {
      state.objOfTasks[day] = state.objOfTasks[day].filter(item => item != value)
    },

    clearArrOfTasks(state, day) {
      state.objOfTasks[day] = []
    }
  },

  actions: { 
    updateArrOfTasks({state, commit}, day) {
      let arr = state.objOfTasks[day]
      const promise = new Promise((resolve) => {
        commit('clearArrOfTasks', day)
        resolve(arr)
      })

      promise.then( arr => arr.forEach(item => commit('pushToArrOfTasks', {'day': day, 'value': item})) )
    },

    // функция, которая проверяет таски в каждом дне недели, и если срок выполнения какой-то таски прошёл, добавляет её в outstandingTasks 
    updateObjOfTasks({state, commit}) {
      const present = new Date()
      const presentDate = +present.getDate()
      const presentMonth = +present.getMonth() + 1
      
      for (let key in state.objOfTasks) {
        state.objOfTasks[key].forEach(item => {
          if(key == 'outstandingTasks') {
            return false
          } else {
            if(+item[2].split('.')[0] < presentDate && +item[2].split('.')[1] <= presentMonth) {
              commit('pushToArrOfTasks', {'day': 'outstandingTasks', 'value': item})
              commit('delElArrOfTasks', {'day': key, 'value': item})
            }
          }
        })
      }
    }

  }
})

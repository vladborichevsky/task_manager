
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
      'outstandingTasks': [],
      'upcomingTasks': []
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
      const presentYear = +present.getFullYear()
      
      for (let key in state.objOfTasks) {
        state.objOfTasks[key].forEach(item => {
          if(key == 'outstandingTasks' || key == 'upcomingTasks') {
            return false
          } else {

            if(+item[2].split('.')[2] >= presentYear && +item[2].split('.')[1] > presentMonth) {
              return false
            } else if(+item[2].split('.')[1] <= presentMonth && +item[2].split('.')[0] < presentDate) {
              commit('pushToArrOfTasks', {'day': 'outstandingTasks', 'value': item})
              commit('delElArrOfTasks', {'day': key, 'value': item})
            }
          }
        })
      }
    },

    updateUpcomingTasks({state, commit}) {
      let newArr = []

      state.objOfTasks.upcomingTasks.forEach(item => {
        newArr.push(item)
      })

      newArr.sort( (a, b) => +a[2].split('.')[0] - +b[2].split('.')[0])
      newArr.sort( (a, b) => +a[2].split('.')[1] - +b[2].split('.')[1])
      newArr.sort( (a, b) => +a[2].split('.')[2] - +b[2].split('.')[2])

      commit('clearArrOfTasks', 'upcomingTasks')

      newArr.forEach(item => commit('pushToArrOfTasks', {'day': 'upcomingTasks', 'value': item})) 
    }

  }
})
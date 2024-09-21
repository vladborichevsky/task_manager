import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import UIcomponents from '@/components/UI/index.js'
import store from '@/store/index.js'
import router from './router'

const app = createApp(App)

UIcomponents.forEach(compoment => {
  app.component(compoment.name, compoment)
})

app.use(store) 
app.use(router)

app.mount('#app')

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import TaskPage from '../pages/TaskPage.vue'
import OutstandingTasksPage from '../pages/OutstandingTasksPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },

    { 
      path: '/task/:theDay',
      component: TaskPage
    },

    { 
      path: '/outstanding_tasks',
      component: OutstandingTasksPage
    }
    
  ]
})

export default router

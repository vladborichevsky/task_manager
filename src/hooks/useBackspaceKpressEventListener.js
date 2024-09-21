
import { onMounted, onUnmounted } from 'vue'

// слушатель события нажатия клавиши Backspsce 
export const useBackspaceKpressEventListener = function (router, page) {
  onMounted(() => document.querySelector('body').addEventListener('keyup', (event) => {
    if(event.code === "Backspace") router.push(page)
  }))

  onUnmounted(() => document.querySelector('body').removeEventListener('keyup', (event) => {
    if(event.code === "Backspace") router.push(page)
  }))
}

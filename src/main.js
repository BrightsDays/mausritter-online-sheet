import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.scss'
import { createPinia } from 'pinia'
import Maska from 'maska'
import router from './router'

const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      if (!(el.id == event.target.id || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted: (el) => {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(Maska)
  .directive('click-outside', clickOutside)
  .mount('#app')

import { createApp, DirectiveBinding } from 'vue'
import App from './App.vue'
import './assets/style.scss'
import { createPinia } from 'pinia'
import Maska from 'maska'
import router from './router'

interface HTMLElementWithClickOutsideEvent extends HTMLElement {
  clickOutsideEvent?: (event: Event) => void
}

const clickOutside = {
  beforeMount(el: HTMLElementWithClickOutsideEvent, binding: DirectiveBinding) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el.id === (event.target as HTMLElement)?.id || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElementWithClickOutsideEvent) {
    document.removeEventListener('click', el.clickOutsideEvent!)
  },
}

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(Maska)
  .directive('click-outside', clickOutside)
  .mount('#app')

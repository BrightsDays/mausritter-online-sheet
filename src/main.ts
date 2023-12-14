import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.scss'
import { createPinia } from 'pinia'
import Maska from 'maska'
import router from './router'

const clickOutside = {
   beforeMount: (el: { clickOutsideEvent: { (event: Event): void; (this: Document, ev: MouseEvent): any }; id: any; contains: (arg0: EventTarget | null) => any }, binding: { value: () => void }) => {
     el.clickOutsideEvent = (event: Event) => {
       if (!(el === event.target || el.contains(event.target))) {
         binding.value()
       }
     }
     document.addEventListener("click", el.clickOutsideEvent)
   },
   unmounted: (el: { clickOutsideEvent: (this: Document, ev: MouseEvent) => any }) => {
     document.removeEventListener("click", el.clickOutsideEvent)
   }
 }

const app = createApp(App)

app.use(createPinia())
   .use(router)
   .use(Maska)
   .directive('click-outside', clickOutside)
   .mount('#app')

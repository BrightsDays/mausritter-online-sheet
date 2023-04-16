import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.scss'
import { createPinia } from 'pinia'
import Maska from 'maska'
import router from './router'

const app = createApp(App)

app.use(createPinia())
   .use(router)
   .use(Maska)
   .mount('#app')

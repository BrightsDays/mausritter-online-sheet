import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.scss'
import { createPinia } from 'pinia'
import Maska from 'maska'

const app = createApp(App)

app.use(createPinia())
   .use(Maska)
   .mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import './assets/style.scss'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
   .mount('#app')

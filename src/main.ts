import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './assets/style.scss'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(store)
   .use(createPinia())
   .mount('#app')

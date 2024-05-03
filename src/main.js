import './assets/main.css'
import ClickOutside from './components/clickOutsideDierctive.js'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.directive('click-outside', ClickOutside);
app.use(router)

app.mount('#app')

import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'

const app=createApp(App)
app.config.globalProperties.$axios=axios //挂载至全局
app.use(router)
app.mount('#app')
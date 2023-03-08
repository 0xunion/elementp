import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import 'element-plus/dist/index.css'
import store from './store'
import {
    registerTheme
} from './init'

import { api_get_user_info } from '@/api/auth'
import { isSuccess } from '@/api/utils'

registerTheme()

const app=createApp(App)

// set axios
axios.defaults.baseURL='http://union.exercise.back.srmxy.cn'
app.config.globalProperties.$axios=axios //挂载至全局

// login first
const load = async () => {
    const data = await api_get_user_info()
    if (isSuccess(data)) {
        store.commit('user/SET_USER', data.data)
    }

    app.use(router)
    app.use(store)
    app.mount('#app')
}

load()
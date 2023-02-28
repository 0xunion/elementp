import {createRouter,createWebHistory} from 'vue-router'

import routes from '@/router/routes/index'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        routes.admin,
        routes.bigscreen,
        routes.web,
        {
            path: '/',
            redirect: '/web'
        }
    ]
})
export default router
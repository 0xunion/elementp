enum WebRoutes {
    PATH = '/web',
    NAME = 'web',
}

export enum WebRoutesHome {
    PATH = '/web/home',
    NAME = 'web_home',
    FILE = '@/views/web/home/home.vue',
}

export enum WebRoutesAdmin {
    PATH = '/web/admin',
    NAME = 'web_admin',
    FILE = '@/views/web/admin/index.vue',
}

import { RouteRecordRaw } from 'vue-router'
import store from '@/store'

import {
    routes as admin_routes
} from '@/router/routes/admin/admin'

const requireAdmin = () => {
    return store.getters['user/isAdmin']
}

const notRequire = () => {
    return true
}

const routes: RouteRecordRaw = {
    path: WebRoutes.PATH,
    name: WebRoutes.NAME,
    component: () => import('@/views/web/index.vue'),
    children : [
        {
            path: WebRoutesHome.PATH,
            name: WebRoutesHome.NAME,
            component: () => import(WebRoutesHome.FILE),
            meta : {
                title: '个人中心',
                require: notRequire,
            }
        },
        {
            path: WebRoutesAdmin.PATH,
            name: WebRoutesAdmin.NAME,
            component: () => import(WebRoutesAdmin.FILE),
            meta : {
                title: '管理中心',
                require: requireAdmin,
            },
            children: admin_routes
        },
        {
            path: WebRoutes.PATH,
            redirect: WebRoutesHome.PATH
        }
    ]
}

export default routes
export const web_routes = routes.children as RouteRecordRaw[]
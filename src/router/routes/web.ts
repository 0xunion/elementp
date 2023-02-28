enum WebRoutes {
    PATH = '/web',
    NAME = 'web',
}

export enum WebRoutesHome {
    PATH = '/web/home',
    NAME = 'web_home',
    FILE = '@/views/web/home/home.vue',
}

import { RouteRecordRaw } from 'vue-router'
import store from '@/store'

const requireAdmin = () => {
    return store.getters['user/isAdmin']
}

const notRequire = () => {
    return true
}

import {
    Document as DocumentIcon,
    Menu as IconMenu,
    Location as IconLocation,
    Setting as IconSetting,
} from '@element-plus/icons-vue'

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
                icon: DocumentIcon,
            }
        },
        {
            path: WebRoutes.PATH,
            redirect: WebRoutesHome.PATH
        }
    ]
}

export default routes
export const web_routes = routes.children as RouteRecordRaw[]
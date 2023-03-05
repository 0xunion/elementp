enum BigScreenRoutes {
    PATH = '/bigscreen',
    NAME = 'bigscreen',
}

enum HelloRoute {
    PATH = '/bigscreen/hello',
    NAME = 'hello',
}

export enum LoginRoute {
    PATH = '/bigscreen/login',
    NAME = 'login',
}

export enum AttackRoute {
    PATH = '/bigscreen/attack/:id',
    NAME = 'bigscreen_attack',
}

enum InitRootRoute {
    PATH = '/bigscreen/init_root',
    NAME = 'init_root',
}

import {
    RouteRecordRaw
} from 'vue-router'

const routes: RouteRecordRaw = {
    path: BigScreenRoutes.PATH,
    name: BigScreenRoutes.NAME,
    component: () => import('@/views/bigscreen/index.vue'),
    children : [
        {
            path: HelloRoute.PATH,
            name: HelloRoute.NAME,
            component: () => import('@/views/bigscreen/home.vue')
        },
        {
            path: LoginRoute.PATH,
            name: LoginRoute.NAME,
            component: () => import('@/views/bigscreen/login.vue')
        },
        {
            path: InitRootRoute.PATH,
            name: InitRootRoute.NAME,
            component: () => import('@/views/bigscreen/init.vue')
        },
        {
            path: AttackRoute.PATH,
            name: AttackRoute.NAME,
            component: () => import('@/views/bigscreen/attack.vue')
        },
        {
            path: BigScreenRoutes.PATH,
            redirect: HelloRoute.PATH
        }
    ]
}

export default routes
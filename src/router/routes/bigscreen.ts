enum BigScreenRoutes {
    PATH = '/bigscreen',
    NAME = 'bigscreen',
}

enum HelloRoute {
    PATH = '/bigscreen/hello',
    NAME = 'hello',
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
            path: BigScreenRoutes.PATH,
            redirect: HelloRoute.PATH
        }
    ]
}

export default routes
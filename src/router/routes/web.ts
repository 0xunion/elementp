enum BigWebRoutes {
    PATH = '/web',
    NAME = 'web',
}

import {
    RouteRecordRaw
} from 'vue-router'

const routes: RouteRecordRaw = {
    path: BigWebRoutes.PATH,
    name: BigWebRoutes.NAME,
    component: () => import('@/views/web/index.vue')
}

export default routes
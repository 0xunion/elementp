enum AdminRoutes {
    PATH = '/admin',
    NAME = 'admin',
}

import {
    RouteRecordRaw
} from 'vue-router'

const routes: RouteRecordRaw = {
    path: AdminRoutes.PATH,
    name: AdminRoutes.NAME,
    component: () => import('@/views/admin/index.vue')
}

export default routes
import { RouteRecordRaw } from "vue-router";

export enum WebRoutesAdminGames {
    PATH = '/web/admin/games',
    NAME = 'web_admin_games',
    FILE = '@/views/web/admin/games.vue',
}

export enum WebRoutesAdminGameEditor {
    PATH = '/web/admin/game_editor/:id?',
    NAME = 'web_admin_game_editor',
    FILE = '@/views/web/admin/editor.vue',
}

export const routes: RouteRecordRaw[] = [
    {
        path: WebRoutesAdminGames.PATH,
        name: WebRoutesAdminGames.NAME,
        component: () => import(WebRoutesAdminGames.FILE),
        meta : {
            title: '比赛管理',
            require : () => true
        }
    },
    {
        path: WebRoutesAdminGameEditor.PATH,
        name: WebRoutesAdminGameEditor.NAME,
        component: () => import(WebRoutesAdminGameEditor.FILE),
        meta : {
            title: '比赛编辑',
            require : () => true
        }
    },
]
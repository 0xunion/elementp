import { RouteRecordRaw } from "vue-router";

export enum WebRoutesGamesList {
    PATH = '/web/games/list',
    NAME = 'web_games_list',
    FILE = '@/views/web/games/list.vue',
}

export enum WebRoutesGamesAttackerPage {
    PATH = '/web/games/attacker/:id?',
    NAME = 'web_games_attacker',
    FILE = '@/views/web/games/attacker_page.vue',
}

export enum WebRoutesGamesDefenderPage {
    PATH = '/web/games/defender/:id?',
    NAME = 'web_games_defender',
    FILE = '@/views/web/games/defender_page.vue',
}

export enum WebRoutesGamesJudgePage {
    PATH = '/web/games/judge/:id?',
    NAME = 'web_games_judge',
    FILE = '@/views/web/games/judge_page.vue',
}

export enum WebRoutesGamesReportEditor {
    PATH = '/web/games/report/editor/:game_id/:id?',
    NAME = 'web_games_report_editor',
    FILE = '@/views/web/games/report_editor.vue',
}

export enum WebRoutesGamesReportDetail {
    PATH = '/web/games/report/detail/:game_id/:id?',
    NAME = 'web_games_report_detail',
    FILE = '@/views/web/games/report_detail.vue',
}

export enum WebRoutesGamesAttackEditor {
    PATH = '/web/games/attack/editor/:game_id/:id?',
    NAME = 'web_games_attack_editor',
    FILE = '@/views/web/games/attack_editor.vue',
}

export enum WebRoutesGamesAttackDetail {
    PATH = '/web/games/attack/detail/:game_id/:id?',
    NAME = 'web_games_attack_detail',
    FILE = '@/views/web/games/attack_detail.vue',
}

export enum WebRoutesGamesJudgeReports {
    PATH = '/web/games/judge/reports/:id?',
    NAME = 'web_games_judge_reports',
    FILE = '@/views/web/games/judge_reports.vue',
}

export enum WebRoutesGamesJudgeReportDetail {
    PATH = '/web/games/judge/report/detail/:game_id/:id?',
    NAME = 'web_games_judge_report_detail',
    FILE = '@/views/web/games/judge_report.vue',
}

export enum WebRoutesGamesAttackReportDetail {
    PATH = '/web/games/attack/report/detail/:game_id/:id?',
    NAME = 'web_games_attack_report_detail',
    FILE = '@/views/web/games/report_detail.vue',
}

export enum WebRoutesGamesManagerAnalysis {
    PATH = '/web/games/manager/analysis/:id?',
    NAME = 'web_games_manager_analysis',
    FILE = '@/views/web/games/analysis.vue',
}

export enum WebRoutesGamesJudgeAttacks {
    PATH = '/web/games/judge/attacks/:id?',
    NAME = 'web_games_judge_attacks',
    FILE = '@/views/web/games/judge_attacks.vue',
}

export enum WebRoutesGamesDefenderReportEditor {
    PATH = '/web/games/defender/report/editor/:game_id/:id?',
    NAME = 'web_games_defender_report_editor',
    FILE = '@/views/web/games/defender_report_editor.vue',
}

export enum WebRoutesGamesDefenderReportDetail {
    PATH = '/web/games/defender/report/detail/:game_id/:id?',
    NAME = 'web_games_defender_report_detail',
    FILE = '@/views/web/games/defender_report.vue',
}

export enum WebRoutesGamesJudgeTracerReports {
    PATH = '/web/games/judge/tracer/reports/:id?',
    NAME = 'web_games_judge_trace_reports',
    FILE = '@/views/web/games/judge_trace_reports.vue',
}

export enum WebRoutesGamesJudgeTracerReportDetail {
    PATH = '/web/games/judge/tracer/report/detail/:game_id/:id?',
    NAME = 'web_games_judge_trace_report_detail',
    FILE = '@/views/web/games/judge_trace_report.vue',
}

export const routes: RouteRecordRaw[] = [
    {
        path: WebRoutesGamesList.PATH,
        name: WebRoutesGamesList.NAME,
        component: () => import(WebRoutesGamesList.FILE),
        meta : {
            title: '参赛列表',
            require : () => true
        }
    },
    {
        path: WebRoutesGamesAttackerPage.PATH,
        name: WebRoutesGamesAttackerPage.NAME,
        component: () => import(WebRoutesGamesAttackerPage.FILE),
        meta : {
            title: '攻击者页面',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesDefenderPage.PATH,
        name: WebRoutesGamesDefenderPage.NAME,
        component: () => import(WebRoutesGamesDefenderPage.FILE),
        meta : {
            title: '防御者页面',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesJudgePage.PATH,
        name: WebRoutesGamesJudgePage.NAME,
        component: () => import(WebRoutesGamesJudgePage.FILE),
        meta : {
            title: '裁判页面',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesReportEditor.PATH,
        name: WebRoutesGamesReportEditor.NAME,
        component: () => import(WebRoutesGamesReportEditor.FILE),
        meta : {
            title: '报告编辑',
            require : () => false
        }
    },
    {   
        path: WebRoutesGamesReportDetail.PATH,
        name: WebRoutesGamesReportDetail.NAME,
        component: () => import(WebRoutesGamesReportDetail.FILE),
        meta : {
            title: '报告详情',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesAttackEditor.PATH,
        name: WebRoutesGamesAttackEditor.NAME,
        component: () => import(WebRoutesGamesAttackEditor.FILE),
        meta : {
            title: '攻击编辑',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesAttackDetail.PATH,
        name: WebRoutesGamesAttackDetail.NAME,
        component: () => import(WebRoutesGamesAttackDetail.FILE),
        meta : {
            title: '攻击详情',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesJudgeReports.PATH,
        name: WebRoutesGamesJudgeReports.NAME,
        component: () => import(WebRoutesGamesJudgeReports.FILE),
        meta : {
            title: '裁判报告',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesJudgeReportDetail.PATH,
        name: WebRoutesGamesJudgeReportDetail.NAME,
        component: () => import(WebRoutesGamesJudgeReportDetail.FILE),
        meta : {
            title: '裁判报告详情',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesAttackReportDetail.PATH,
        name: WebRoutesGamesAttackReportDetail.NAME,
        component: () => import(WebRoutesGamesAttackReportDetail.FILE),
        meta : {
            title: '攻击报告详情',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesManagerAnalysis.PATH,
        name: WebRoutesGamesManagerAnalysis.NAME,
        component: () => import(WebRoutesGamesManagerAnalysis.FILE),
        meta : {
            title: '比赛分析',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesJudgeAttacks.PATH,
        name: WebRoutesGamesJudgeAttacks.NAME,
        component: () => import(WebRoutesGamesJudgeAttacks.FILE),
        meta : {
            title: '裁判攻击',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesDefenderReportEditor.PATH,
        name: WebRoutesGamesDefenderReportEditor.NAME,
        component: () => import(WebRoutesGamesDefenderReportEditor.FILE),
        meta : {
            title: '溯源报告编辑',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesDefenderReportDetail.PATH,
        name: WebRoutesGamesDefenderReportDetail.NAME,
        component: () => import(WebRoutesGamesDefenderReportDetail.FILE),
        meta : {
            title: '溯源报告详情',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesJudgeTracerReports.PATH,
        name: WebRoutesGamesJudgeTracerReports.NAME,
        component: () => import(WebRoutesGamesJudgeTracerReports.FILE),
        meta : {
            title: '裁判溯源报告',
            require : () => false
        }
    },
    {
        path: WebRoutesGamesJudgeTracerReportDetail.PATH,
        name: WebRoutesGamesJudgeTracerReportDetail.NAME,
        component: () => import(WebRoutesGamesJudgeTracerReportDetail.FILE),
        meta : {
            title: '裁判溯源报告详情',
            require : () => false
        }
    },
]
import { api_base } from './index'

// get all games list
export const api_get_games = (page: number, page_size: number) => api_base('/api/custom/all/game/list', 'GET', {
    page, page_size
})

// admin get all games list
export const api_admin_get_games = (page: number, page_size: number) => api_base('/api/custom/admin/game/list', 'GET', {
    page, page_size
})

// creeate game
/*
var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
   'name': '123123',
   'description': '123123',
   'header_html': '123123',
   'start_time': '2',
   'end_time': '22222222' 
});
var config = {
   method: 'post',
   url: 'http://union.exercise.back.srmxy.cn/api/custom/admin/game/create',
   headers: { 
      'Authorization': '{{token}}', 
      'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
   },
   data : data
};
 */
export const api_game_create = (name: string, description: string, header_html: string, start_time: number, end_time: number, position_code: string) => api_base('/api/custom/admin/game/create', 'POST', {
    name, description, header_html, start_time, end_time, position_code
})

export const api_game_detail = (game_id: string) => api_base('/api/custom/all/game/detail', 'GET', {
    game_id
})

export const api_game_update = (game_id: string, name: string, description: string, header_html: string, start_time: number, end_time: number) => api_base('/api/custom/admin/game/update', 'POST', {
    game_id, name, description, header_html, start_time, end_time
})

export const api_game_gamer_list = (game_id: string, page: number, page_size: number) => api_base('/api/custom/admin/gamer/list', 'GET', {
    game_id, page, page_size
})

export const api_game_red_team_rank = (game_id: string, page: number, page_size: number) => api_base('/api/custom/manage/rank/red_team', 'GET', {
    game_id, page, page_size
})

export const api_game_blue_team_rank = (game_id: string, page: number, page_size: number) => api_base('/api/custom/manage/rank/blue_team', 'GET', {
    game_id, page, page_size
})

export const api_game_red_team_template = (game_id: string) => api_base('/api/custom/admin/game/template/red_team', 'GET', {
    game_id
})

export const api_game_blue_team_template = (game_id: string) => api_base('/api/custom/admin/game/template/blue_team', 'GET', {
    game_id
})

export const api_game_denfeder_template = (game_id: string) => api_base('/api/custom/admin/game/template/defender', 'GET', {
    game_id
})

export const api_game_judge_template = (game_id: string) => api_base('/api/custom/admin/game/template/judge', 'GET', {
    game_id
})

export const api_game_part_a_template = (game_id: string) => api_base('/api/custom/admin/game/template/part_a', 'GET', {
    game_id
})

export const api_game_leader_template = (game_id: string) => api_base('/api/custom/admin/game/template/leader', 'GET', {
    game_id
})

export const api_game_import_defender = (game_id: string, defender_file_id: string) => api_base('/api/custom/admin/game/import/defender', 'POST', {
    game_id, defender_file_id
})

export const api_game_import_blue_team = (game_id: string, blue_team_file_id: string) => api_base('/api/custom/admin/game/import/blue_team', 'POST', {
    game_id, blue_team_file_id
})

export const api_game_import_red_team = (game_id: string, red_team_file_id: string) => api_base('/api/custom/admin/game/import/red_team', 'POST', {
    game_id, red_team_file_id
})

export const api_game_import_judge = (game_id: string, judge_file_id: string) => api_base('/api/custom/admin/game/import/judge', 'POST', {
    game_id, judge_file_id
})

export const api_game_import_leader = (game_id: string, leader_file_id: string) => api_base('/api/custom/admin/game/import/leader', 'POST', {
    game_id, leader_file_id
})

export const api_game_import_part_a = (game_id: string, part_a_file_id: string) => api_base('/api/custom/admin/game/import/part_a', 'POST', {
    game_id, part_a_file_id
})

export const api_game_attacker_report_list = (game_id: string, page: number, page_size: number) => api_base('/api/custom/attacker/report/list', 'GET', {
    game_id, page, page_size
})

export const api_game_attacker_report_detail = (game_id: string, report_id: string) => api_base('/api/custom/attacker/report/detail', 'GET', {
    game_id, report_id
})

export const api_game_attacker_report_delete = (game_id: string, report_id: string) => api_base('/api/custom/attacker/report/delete', 'POST', {
    game_id, report_id
})

export const api_game_attacker_attack_list = (game_id: string, page: number, page_size: number) => api_base('/api/custom/attacker/attack/list', 'GET', {
    game_id, page, page_size
})

export const api_game_attacker_attack_detail = (game_id: string, attack_id: string) => api_base('/api/custom/attacker/attack/detail', 'GET', {
    game_id, attack_id
})

export const api_game_attacker_report_section = (game_id: string) => api_base('/api/custom/attacker/report_section', 'GET', {
    game_id
})

export const api_game_attacker_attack_section = (game_id: string) => api_base('/api/custom/attacker/attack_section', 'GET', {
    game_id
})

export const api_game_attacker_report_commit = (game_id: string, defender_id: string, content: string, isolation_break: number, vuln_type: number, achievement_type: number, attack_type: number, uri: string, vuln_level: number, name: string) => api_base('/api/custom/attacker/report/commit', 'POST', {
    game_id, defender_id, content, isolation_break, vuln_type, achievement_type, attack_type, uri, vuln_level, name
})

export const api_game_attacker_list_defender = (game_id: string) => api_base('/api/custom/attacker/list_defender', 'GET', {
    game_id
})

export const api_game_attacker_attack_apply = (game_id: string, defender_id: string, reason: string) => api_base('/api/custom/attacker/attack/apply', 'POST', {
    game_id, defender_id, reason
})

export const api_game_manage_rank_red_team = (game_id: string, page: number, page_size: number) => api_base('/api/custom/manage/rank/red_team', 'GET', {
    game_id, page, page_size
})

export const api_game_manage_rank_blue_team = (game_id: string, page: number, page_size: number) => api_base('/api/custom/manage/rank/blue_team', 'GET', {
    game_id, page, page_size
})

export const api_game_attacker_statistics = (game_id: string) => api_base('/api/custom/attacker/statistics', 'GET', {
    game_id
})

export const api_game_manage_report_list = (game_id: string, page: number, page_size: number, order: number, state: number, title: string) => api_base('/api/custom/manage/report/list', 'GET', {
    game_id, page, page_size, order, state, title
})

export const api_game_manage_report_detail = (game_id: string, report_id: string) => api_base('/api/custom/manage/report/detail', 'GET', {
    game_id, report_id
})

export const api_game_manage_assets_list = (game_id: string, defender_id: string) => api_base('/api/custom/manage/assets/list', 'GET', {
    game_id, defender_id
})


export const api_game_manage_report_comment = (game_id: string, report_id: string, comment: string) => api_base('/api/custom/manage/report/comment', 'POST', {
    game_id, report_id, comment
})


export const api_game_manage_attack_accept = (game_id: string, attack_id: string) => api_base('/api/custom/manage/attack/accept', 'POST', {
    game_id, attack_id
})

export const api_game_manage_attack_reject = (game_id: string, attack_id: string, comment: string) => api_base('/api/custom/manage/attack/reject', 'POST', {
    game_id, attack_id, comment
})

export const api_game_manage_report_accept = (game_id: string, report_id: string, score: number, defender_score: number) => api_base('/api/custom/manage/report/accept', 'POST', {
    game_id, report_id, score, defender_score
})

export const api_game_manage_report_reject = (game_id: string, report_id: string, comment: string) => api_base('/api/custom/manage/report/reject', 'POST', {
    game_id, report_id, comment
})

export const api_game_attacker_report_appeal = (game_id: string, report_id: string, reason: string) => api_base('/api/custom/attacker/report/appeal', 'POST', {
    game_id, report_id, reason
})

export const api_game_manage_boardcast_publish = (game_id: string, content: string) => api_base('/api/custom/manage/boardcast/publish', 'POST', {
    game_id, content
})

export const api_game_manage_attack_list = (game_id: string, page: number, page_size: number, state: number, content: string) => api_base('/api/custom/manage/attack/list', 'GET', {
    game_id, page, page_size, state, content
})

export const api_game_defender_statistics = (game_id: string) => api_base('/api/custom/defender/statistics', 'GET', {
    game_id
})

export const api_game_manage_trace_report_list = (game_id: string, page: number, page_size: number, state: number, content: string) => api_base('/api/custom/manage/trace_report/list', 'GET', {
    game_id, page, page_size, state, content
})

export const api_game_manage_trace_report_detail = (game_id: string, report_id: string) => api_base('/api/custom/manage/trace_report/detail', 'GET', {
    game_id, report_id
})

export const api_game_manage_trace_report_accept = (game_id: string, report_id: string, score: number, attack_score: number) => api_base('/api/custom/manage/trace_report/accept', 'POST', {
    game_id, report_id, score, attack_score
})

export const api_game_manage_trace_report_reject = (game_id: string, report_id: string) => api_base('/api/custom/manage/trace_report/reject', 'POST', {
    game_id, report_id
})

export const api_game_defender_assets_list = (game_id: string, page: number, page_size: number) => api_base('/api/custom/defender/assets/list', 'GET', {
    game_id, page, page_size
})

export const api_game_defender_report_list = (game_id: string, page: number, page_size: number) => api_base('/api/custom/defender/report/list', 'GET', {
    game_id, page, page_size
})

export const api_game_defender_report_detail = (game_id: string, report_id: string) => api_base('/api/custom/defender/report/detail', 'GET', {
    game_id, report_id
})

export const api_game_defender_report_submit = (game_id: string, content: string, attack_team_id: string, title: string) => api_base('/api/custom/defender/report/submit', 'POST', {
    game_id, content, attack_team_id, title
})

export const api_game_defender_attacker_list = (game_id: string, page: number, page_size: number) => api_base('/api/custom/defender/attacker/list', 'GET', {
    game_id, page, page_size
})
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
export const api_game_create = (name: string, description: string, header_html: string, start_time: number, end_time: number) => api_base('/api/custom/admin/game/create', 'POST', {
    name, description, header_html, start_time, end_time
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

/**
 * var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
    
});
var config = {
   method: 'get',
   url: 'http://union.exercise.back.srmxy.cn/api/custom/admin/game/template/red_team?game_id=<game_id>',
   headers: { 
      'Authorization': '{{token}}', 
      'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
   },
   data : data
};

axios(config)
.then(function (response) {
   console.log(JSON.stringify(response.data));
})
.catch(function (error) {
   console.log(error);
});

 */
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
<template>
    <el-row>
        <el-col :span="24">
            <!-- title -->
            <h1>
                <span v-if="isNew">新建比赛</span>
                <span v-else>编辑比赛</span>
            </h1>
        </el-col>
        <el-divider />
        <el-col :span="24">
            <el-form :model="form" label-width="120px">
                <el-form-item label="比赛名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="比赛描述">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="比赛头部HTML">
                    <CodePad v-model:value="form.header_html"></CodePad>
                </el-form-item>
                <el-form-item label="比赛开始时间">
                    <el-date-picker
                        value-format="x"
                        v-model="form.start_time"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="比赛结束时间">
                    <el-date-picker
                        value-format="x"
                        v-model="form.end_time"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="12" v-if="!isNew">
            <el-divider />
            <h1>红队排名</h1>
            <el-table :data="redTeamsRank">
                <el-table-column prop="rank" label="排名">
                    <template #default="scope">
                        <!-- use index -->
                        <span>{{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="队伍名称"></el-table-column>
                <el-table-column prop="score" label="得分"></el-table-column>
            </el-table>
        </el-col>
        <el-col :span="12" v-if="!isNew">
            <el-divider />
            <h1>防守方排名</h1>
            <el-table :data="denfenderRank">
                <el-table-column prop="rank" label="排名">
                    <template #default="scope">
                        <!-- use index -->
                        <span>{{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="队伍名称"></el-table-column>
                <el-table-column prop="industry" label="所属行业"></el-table-column>
                <el-table-column prop="score" label="得分"></el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24" v-if="!isNew">
            <el-row>
                <el-col>
                    <el-divider />
                    <h1>防守单位操作</h1>
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-plus" @click="downloadTemplate('defender')">获取防守方模板</el-button>
                            <el-button type="primary" icon="el-icon-edit" @click="uploadTemplate('defender')">导入防守方</el-button>
                        </el-button-group>
                </el-col>
                <el-col>
                    <el-divider />
                    <h1>红队操作</h1>
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-plus" @click="downloadTemplate('red_team')">获取红队模板</el-button>
                            <el-button type="primary" icon="el-icon-edit" @click="uploadTemplate('red_team')">导入红队</el-button>
                        </el-button-group>
                </el-col>
                <el-col>
                    <el-divider />
                    <h1>蓝队操作</h1>
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-plus" @click="downloadTemplate('blue_team')">获取蓝队模板</el-button>
                            <el-button type="primary" icon="el-icon-edit" @click="uploadTemplate('blue_team')">导入蓝队</el-button>
                        </el-button-group>
                </el-col>
                <el-col>
                    <el-divider />
                    <h1>裁判操作</h1>
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-plus" @click="downloadTemplate('judge')">获取裁判模板</el-button>
                            <el-button type="primary" icon="el-icon-edit" @click="uploadTemplate('judge')">导入裁判</el-button>
                        </el-button-group>
                </el-col>
                <el-col>
                    <el-divider />
                    <h1>甲方操作</h1>
                        <el-button-group>
                            <el-button type="primary" icon="el-icon-plus" @click="downloadTemplate('part_a')">获取甲方模板</el-button>
                            <el-button type="primary" icon="el-icon-edit" @click="uploadTemplate('part_a')">导入甲方</el-button>
                        </el-button-group>
                </el-col>
            </el-row>
        </el-col>    
        <el-col :span="24">
            <el-divider />
            <h1>参赛人员</h1>
            <el-table :data="members">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="identity" label="角色">
                    <template #default="scope">
                        <!-- 
                            use el-tag
                            	GAMER_IDENTITY_ATTACKER = iota
                                GAMER_IDENTITY_DEFENDER
                                GAMER_IDENTITY_JUDGEMENT
                                GAMER_IDENTITY_CUSTOMER ==> leader
                                GAMER_IDENTITY_PARTA
                         -->
                        <el-tag v-if="scope.row.identity == 0" type="danger">攻击方</el-tag>
                        <el-tag v-else-if="scope.row.identity == 1" type="success">防守方</el-tag>
                        <el-tag v-else-if="scope.row.identity == 2" type="warning">裁判</el-tag>
                        <el-tag v-else-if="scope.row.identity == 3" type="info">领导</el-tag>
                        <el-tag v-else-if="scope.row.identity == 4" type="primary">甲方</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="score" label="分数"></el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted, watch, reactive, toRefs } from 'vue'
    import { useRouter } from 'vue-router'
    import { ElNotification } from 'element-plus'
    import CodePad from '@/components/codepad.vue'
    import { 
        api_game_create,
        api_game_detail,
        api_game_update,
        api_game_blue_team_rank,
        api_game_red_team_rank,
        api_game_gamer_list,
        api_game_blue_team_template,
        api_game_denfeder_template as api_game_defender_template,
        api_game_judge_template,
        api_game_leader_template,
        api_game_part_a_template,
        api_game_red_team_template,
        api_game_import_blue_team,
        api_game_import_defender,
        api_game_import_judge,
        api_game_import_leader,
        api_game_import_part_a,
        api_game_import_red_team,
    } from '@/api/game'
    import {
        api_admin_upload_file,
        api_download_file
    } from '@/api/file'
    import { isSuccess } from '@/api/utils'
    import { WebRoutesAdminGameEditor, WebRoutesAdminGames } from '@/router/routes/admin/admin'

    const router = useRouter()

    const form = ref({
        id : '',
        name : '',
        description : '',
        header_html : '',
        start_time : 0,
        end_time : 0,
    })


    const isNew = computed(() => {
        return form.value.id == ''
    })

    const submit = () => {
        if (isNew.value) {
            create_game()
        } else {
            update_game()
        }
    }

    const parseFloat2Int = (value : number) => {
        return parseInt(value + '')
    }

    const create_game = async () => {
        const data = await api_game_create(
            form.value.name, 
            form.value.description, 
            form.value.header_html, 
            parseFloat2Int(form.value.start_time / 1000),
            parseFloat2Int(form.value.end_time / 1000)
        )
        if(isSuccess(data)) {
            ElNotification.success({
                title: '提示',
                message: '创建成功，即将跳转到比赛列表'
            })
            router.push({
                name : WebRoutesAdminGames.NAME
            })
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }
    }

    const update_game = async () => {
        const data = await api_game_update(
            form.value.id,
            form.value.name, 
            form.value.description, 
            form.value.header_html, 
            parseFloat2Int(form.value.start_time / 1000),
            parseFloat2Int(form.value.end_time / 1000)
        )
        if(isSuccess(data)) {
            ElNotification.success({
                title: '提示',
                message: '更新成功'
            })
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }
    }

    const redTeamsRank = ref([])
    const denfenderRank = ref([])
    const members = ref([])

    const load_game = async () => {
        const data = await api_game_detail(form.value.id)
        if(isSuccess(data)) {
            form.value.name = data.data.game.name
            form.value.description = data.data.game.description
            form.value.header_html = data.data.game.header_html
            form.value.start_time = data.data.game.start_time * 1000
            form.value.end_time = data.data.game.end_time * 1000
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }

        // load red team and denfender rank
        const redTeamRankData = await api_game_red_team_rank(form.value.id, 1, 100)
        if(isSuccess(redTeamRankData)) {
            redTeamsRank.value = redTeamRankData.data.rank||[]
        } else {
            ElNotification.error({
                title: '提示',
                message: redTeamRankData.message
            })
        }

        const denfenderRankData = await api_game_blue_team_rank(form.value.id, 1, 100)
        if(isSuccess(denfenderRankData)) {
            denfenderRank.value = denfenderRankData.data.rank||[]
        } else {
            ElNotification.error({
                title: '提示',
                message: denfenderRankData.message
            })
        }

        // load members
        const membersData = await api_game_gamer_list(form.value.id, 1, 100)
        if(isSuccess(membersData)) {
            members.value = membersData.data.gamers||[]
        } else {
            ElNotification.error({
                title: '提示',
                message: membersData.message
            })
        }
    }

    const downloadTemplate = async (type: string) => {
        let data : any = null
        let filename = ''
        switch(type) {
            case 'red_team':
                data = await api_game_red_team_template(form.value.id)
                filename = '红队队员名单模板.xlsx'
                break
            case 'defender':
                data = await api_game_defender_template(form.value.id)
                filename = '防守方名单模板.xlsx'
                break
            case 'judge':
                data = await api_game_judge_template(form.value.id)
                filename = '裁判名单模板.xlsx'
                break
            case 'leader':
                data = await api_game_leader_template(form.value.id)
                filename = '领导模板.xlsx'
                break
            case 'part_a':
                data = await api_game_part_a_template(form.value.id)
                filename = '甲方名单模板.xlsx'
                break
            case 'blue_team':
                data = await api_game_blue_team_template(form.value.id)
                filename = '蓝队队员名单模板.xlsx'
                break
        }
        if(isSuccess(data)) {
            api_download_file(form.value.id, data.data.file_id, filename)
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }
    }

    const uploadFile = () => new Promise((resolve, reject) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.onchange = async (e) => {
            const file = (e.target as any).files[0]
            const data = await api_admin_upload_file(form.value.id, file)
            if(isSuccess(data)) {
                resolve(data.data)
            } else {
                ElNotification.error({
                    title: '提示',
                    message: data.message
                })
                reject()
            }
        }
        input.click()
    })

    const uploadTemplate = async (type: string) => {
        const file_id = await uploadFile() as string
        let data : any = null
        switch(type) {
            case 'red_team':
                data = await api_game_import_red_team(form.value.id, file_id)
                break
            case 'defender':
                data = await api_game_import_defender(form.value.id, file_id)
                break
            case 'judge':
                data = await api_game_import_judge(form.value.id, file_id)
                break
            case 'leader':
                data = await api_game_import_leader(form.value.id, file_id)
                break
            case 'part_a':
                data = await api_game_import_part_a(form.value.id, file_id)
                break
            case 'blue_team':
                data = await api_game_import_blue_team(form.value.id, file_id)
                break
        }
        if(isSuccess(data)) {
            ElNotification.success({
                title: '提示',
                message: '导入成功'
            })

            const file_id = data.data.file_id
            if (file_id != undefined && file_id != '000000000000000000000000') {
                api_download_file(form.value.id, file_id, '导入结果.xlsx')
            }

            load_game()
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }
    }

    onMounted(() => {
        const id = router.currentRoute.value.params.id
        // convert to string
        if (id != undefined) {
            form.value.id = id + ''
            load_game()
        }
    })

</script>
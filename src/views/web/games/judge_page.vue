<template>
    <el-row>
        <el-col :span="24">
            <h1>裁判面板</h1>
            <el-divider></el-divider>
        </el-col>
        <el-col :span="24">
            <h1>概况</h1>
        </el-col>
        <el-col :span="6" style="padding: 5px;">
            <CardInfo :title="'当前报告数量'" :content="reports_total" />
        </el-col>
        <el-col :span="6" style="padding: 5px;">
            <CardInfo :title="'未审核报告数量'" :content="reports_unverified" />
        </el-col>
        <el-col :span="6" style="padding: 5px;">
            <CardInfo :title="'当前攻击请求数量'" :content="attack_total" />
        </el-col>
        <el-col :span="6" style="padding: 5px;">
            <CardInfo :title="'未审核攻击数量'" :content="attack_unverified" />
        </el-col>
        <el-col :span="6" style="padding: 5px;">
            <CardInfo :title="'有效报告数'" :content="reports_accepted" />
        </el-col>
        <el-col :span="6" style="padding: 5px;">
            <CardInfo :title="'允许高危攻击数量'" :content="attack_accpeted" />
        </el-col>
        <el-col :span="6" style="padding: 5px;">
            <CardInfo :title="'参赛队伍数量'" :content="redteam_total" />
        </el-col>
        <el-col :span="6" style="padding: 5px;">
            <CardInfo :title="'参赛防守方数量'" :content="blueteam_total" />
        </el-col>
        <el-col :span="24">
            <el-divider></el-divider>
        </el-col>

        <el-col :span="24">
            <h1>排行榜</h1>
            <el-divider></el-divider>
        </el-col>
        <el-col :span="12" style="padding: 5px;">
            <h3>红队</h3>
            <el-table :data="red_team_rank" style="width: 100%">
                <el-table-column prop="name" label="队伍名称" />
                <el-table-column prop="score" label="得分" />
            </el-table>
        </el-col>
        <el-col :span="12" style="padding: 5px;">
            <h3>防守方</h3>
            <el-table :data="blue_team_rank" style="width: 100%">
                <el-table-column prop="name" label="单位名称" />
                <el-table-column prop="score" label="得分" />
            </el-table>
        </el-col>
        <el-col :span="24">
            <h1>报告审核与攻击审批</h1>
            <el-divider></el-divider>
            <el-button-group>
                <el-button type="primary" @click="toReports">查看报告</el-button>
                <el-button type="primary" @click="toAttacks">查看攻击</el-button>
                <el-button type="primary" @click="toTraceReports">查看溯源攻击</el-button>
                <el-button type="primary" @click="publishBoardcast">发布公告</el-button>
            </el-button-group>
        </el-col>
    </el-row>
    <el-dialog width="50%" v-model="boardcast_dialog" title="发布公告">
        <el-input v-model="boardcast" type="textarea" :autosize="{ minRows: 3, maxRows: 5 }"></el-input>
        <el-button type="primary" @click="publish">发布</el-button>
    </el-dialog>
</template>

<script setup lang="ts">
    import CardInfo from '@/components/cardinfo.vue'

    import { onMounted, ref, computed } from 'vue'
    import { useRouter } from 'vue-router'

    import {
        api_game_manage_rank_red_team,
        api_game_manage_rank_blue_team,
        api_game_manage_report_list,
        api_game_manage_boardcast_publish,
        api_game_manage_attack_list
    } from '@/api/game'

    import { WebRoutesGamesJudgeReports, WebRoutesGamesList, WebRoutesGamesJudgeAttacks, WebRoutesGamesJudgeTracerReports } from '@/router/routes/game'
    import { isSuccess } from '@/api/utils'
    import { ElNotification } from 'element-plus'

    const router = useRouter()

    const red_team_rank = ref([])
    const blue_team_rank = ref([])

    const reports = ref([] as any[])
    const attacks = ref([] as any[])

    const game_id = ref('')

    const boardcast_dialog = ref(false)
    const boardcast = ref('')

    const get_red_team_rank = async () => {
        const data = await api_game_manage_rank_red_team(game_id.value, 1, 20)
        if (isSuccess(data)) {
            red_team_rank.value = data.data.rank
        } else {
            ElNotification({
                title: '获取红队排行榜失败',
                message: data.message,
                type: 'error'
            })
        }
    }

    const get_blue_team_rank = async () => {
        const data = await api_game_manage_rank_blue_team(game_id.value, 1, 20)
        if (isSuccess(data)) {
            blue_team_rank.value = data.data.rank
        } else {
            ElNotification({
                title: '获取防守方排行榜失败',
                message: data.message,
                type: 'error'
            })
        }
    }

    const get_reports = async () => {
        const data = await api_game_manage_report_list(game_id.value, 1, 2000, 1, -1, "")
        if (isSuccess(data)) {
            reports.value = data.data.reports
        } else {
            ElNotification({
                title: '获取报告列表失败',
                message: data.message,
                type: 'error'
            })
        }
    }

    const get_attacks = async () => {
        const data = await api_game_manage_attack_list(game_id.value, 1, 2000, -1, "")
        if (isSuccess(data)) {
            attacks.value = data.data.attacks
        } else {
            ElNotification({
                title: '获取攻击列表失败',
                message: data.message,
                type: 'error'
            })
        }
    }

    const reports_total = computed(() => {
        return reports.value.length
    })

    const reports_unverified = computed(() => {
        return reports.value.filter((report) => {
            return report.state === 0
        }).length
    })

    const attack_total = computed(() => {
        return attacks.value.length
    })

    const attack_unverified = computed(() => {
        return attacks.value.filter((attack) => {
            return attack.state === 0
        }).length
    })

    const attack_accpeted = computed(() => {
        return attacks.value.filter((attack) => {
            return attack.state === 1
        }).length
    })

    const reports_accepted = computed(() => {
        return reports.value.filter((report) => {
            return report.state === 1
        }).length
    })

    const redteam_total = computed(() => {
        return red_team_rank.value.length
    })

    const blueteam_total = computed(() => {
        return blue_team_rank.value.length
    })

    const toReports = () => {
        router.push({
            path : WebRoutesGamesJudgeReports.PATH.replace(':id', game_id.value)
        })
    }

    const toAttacks = () => {
        router.push({
            path : WebRoutesGamesJudgeAttacks.PATH.replace(':id', game_id.value)
        })
    }

    const toTraceReports = () => {
        router.push({
            path : WebRoutesGamesJudgeTracerReports.PATH.replace(':id', game_id.value)
        })
    }

    const publishBoardcast = () => {
        boardcast_dialog.value = true
    }

    const publish = async () => {
        const data = await api_game_manage_boardcast_publish(game_id.value, boardcast.value)
        if (isSuccess(data)) {
            ElNotification({
                title: '发布公告成功',
                message: data.message,
                type: 'success'
            })
            boardcast_dialog.value = false
            boardcast.value = ''
        } else {
            ElNotification({
                title: '发布公告失败',
                message: data.message,
                type: 'error'
            })
        }
    }

    onMounted(() => {
        const id = router.currentRoute.value.params.id as string
        if (id) {
            game_id.value = id
            get_red_team_rank()
            get_blue_team_rank()
            get_reports()
            get_attacks()
        } else {
            router.push({
                path : WebRoutesGamesList.PATH
            })
        }
    })

</script>
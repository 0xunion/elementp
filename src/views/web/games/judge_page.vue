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
            </el-button-group>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import CardInfo from '@/components/cardinfo.vue'

    import { onMounted, ref, computed } from 'vue'
    import { useRouter } from 'vue-router'

    import {
        api_game_manage_rank_red_team,
        api_game_manage_rank_blue_team,
        api_game_manage_report_list
    } from '@/api/game'

    import { WebRoutesGamesJudgeReports, WebRoutesGamesList } from '@/router/routes/game'
    import { isSuccess } from '@/api/utils'
    import { ElNotification } from 'element-plus'

    const router = useRouter()

    const red_team_rank = ref([])
    const blue_team_rank = ref([])

    const reports = ref([] as any[])

    const game_id = ref('')

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
        const data = await api_game_manage_report_list(game_id.value, 1, 2000, 1)
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

    const reports_total = computed(() => {
        return reports.value.length
    })

    const reports_unverified = computed(() => {
        return reports.value.filter((report) => {
            return report.status === 0
        }).length
    })

    const attack_total = computed(() => {
        return 0
    })

    const attack_unverified = computed(() => {
        return 0
    })

    const attack_accpeted = computed(() => {
        return 0
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
        
    }

    onMounted(() => {
        const id = router.currentRoute.value.params.id as string
        if (id) {
            game_id.value = id
            get_red_team_rank()
            get_blue_team_rank()
            get_reports()
        } else {
            router.push({
                path : WebRoutesGamesList.PATH
            })
        }
    })

</script>
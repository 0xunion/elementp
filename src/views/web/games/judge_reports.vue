<template>
    <el-row>
        <el-col :span="24">
            <h1>报告面板</h1>
            <el-divider></el-divider>
        </el-col>
        <el-col :span="8" v-for="report in reports">
            <div class="judge_report">
                <cardinfo
                    :title="'时间：' + new Date(report.create_at * 1000).toLocaleString()"
                    :content="report.name"
                    :type="getCardType(report.state)"
                    @click="toReport(report.id)"
                ></cardinfo>
            </div>
        </el-col>
        <el-col :span="24">
            <div style="text-align: center;">
                <el-pagination
                    layout="prev, pager, next" :total="9999999"
                    v-model:current-page="page"
                >
                </el-pagination>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { api_game_manage_report_list } from '@/api/game'; 
import { ElNotification } from 'element-plus';
import { isSuccess } from '@/api/utils';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { WebRoutesGamesJudgeReportDetail } from '@/router/routes/game'

import cardinfo from '@/components/cardinfo.vue';

const router = useRouter()

const game_id = ref('')
const reports = ref([] as any[])
const page = ref(1)

const get_reports = async () => {
    const data = await api_game_manage_report_list(game_id.value, page.value, 30, 1)
    if (isSuccess(data)) {
        reports.value = data.data.reports
    } else {
        ElNotification({
            title: '获取评测报告列表失败',
            message: data.message,
            type: 'error'
        })
    }
}

const getCardType = (state: any) : string => {
    switch (state) {
        case 0:
            return 'info'
        case 1:
            return 'success'
        case 2:
            return 'danger'
        default:
            return ''
    }
}

const toReport = (id: string) => {
    router.push({
        path : WebRoutesGamesJudgeReportDetail.PATH.replace(':game_id', game_id.value).replace(':id', id)
    })
}

watch(page, () => {
    get_reports()
})

onMounted(() => {
    const id = router.currentRoute.value.params.id
    game_id.value = id + ''
    if (!game_id.value) {
        router.back()
    } else {
        get_reports()
    }
})
</script>

<style>
.el-pagination {
    padding: 5px;
    justify-content: center;
}

.judge_report {
    margin: 10px;
}
</style>
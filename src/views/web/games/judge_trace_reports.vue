<template>
    <el-row>
        <el-col :span="24">
            <h1>报告面板</h1>
            <el-divider></el-divider>
        </el-col>
        <el-col :span="24">
            <el-row>
                <el-col :span="8">
                    <el-select v-model="state" class="m-2" placeholder="Select">
                        <el-option
                            v-for="item in state_list"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        />
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-input v-model.lazy="title" class="m-2" placeholder="请输入标题"></el-input>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="24" v-for="report in reports">
            <el-row>
                <el-col :span="6">
                    <div class="judge_report">
                        <cardinfo
                            :title="'时间：' + new Date(report.create_at * 1000).toLocaleString()"
                            :content="report.title"
                            :type="getCardType(report.state)"
                            @click="toReport(report.id)"
                        ></cardinfo>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="judge_report_detail">
                        {{ getHtmlInnerText(report.content).slice(0, 200) + '...' }}
                    </div>
                </el-col>
            </el-row>
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
import { api_game_manage_trace_report_list } from '@/api/game'; 
import { ElNotification } from 'element-plus';
import { isSuccess } from '@/api/utils';
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { WebRoutesGamesJudgeTracerReportDetail } from '@/router/routes/game'
import { getHtmlInnerText } from '@/utils/html'

import cardinfo from '@/components/cardinfo.vue';

const router = useRouter()

const game_id = ref('')
const reports = ref([] as any[])
const page = ref(1)
const state = ref(-1)
const state_list = ref([
    {name: '全部', value: -1},
    {name: '未审核', value: 0},
    {name: '已通过', value: 1},
    {name: '未通过', value: 2},
])
const title = ref('')

const get_reports = async () => {
    const data = await api_game_manage_trace_report_list(game_id.value, page.value, 30, state.value, title.value)
    if (isSuccess(data)) {
        reports.value = data.data.reports
    } else {
        ElNotification({
            title: '获取溯源报告列表失败',
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

const getCardState = (state: any) : string => {
    switch (state) {
        case 0:
            return '未审核'
        case 1:
            return '已通过'
        case 2:
            return '未通过'
        default:
            return ''
    }
}

const toReport = (id: string) => {
    router.push({
        path : WebRoutesGamesJudgeTracerReportDetail.PATH.replace(':game_id', game_id.value).replace(':id', id)
    })
}

watch(page, () => {
    get_reports()
})

watch(state, () => {
    get_reports()
})

let title_timer: any = null
watch(title, () => {
    if (title_timer) {
        clearTimeout(title_timer)
    }
    title_timer = setTimeout(() => {
        get_reports()
    }, 500)
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

.judge_report_detail {
    margin: 10px;
    padding: 10px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background-color: #f9fafc;
}
</style>
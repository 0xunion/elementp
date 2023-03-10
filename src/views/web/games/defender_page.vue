<template>
    <el-row>
        <el-col :span="24">
            <h1>溯源报告</h1>
            <el-divider></el-divider>
            <el-button type="primary" @click="toNewReport">提交溯源报告</el-button>
        </el-col>
        <el-col :span="24">
            <el-table
                :data="reports"
                style="width: 100%"
            >
                <el-table-column
                    prop="id"
                    label="ID"
                />
                <el-table-column
                    prop="title"
                    label="标题"
                />
                <el-table-column
                    prop="state"
                    label="状态"
                >
                    <template #default="{ row }">
                        <el-tag v-if="row.state === 0" type="danger">未审核</el-tag>
                        <el-tag v-else-if="row.state === 1" type="success">已通过</el-tag>
                        <el-tag v-else-if="row.state === 2" type="danger">未通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="score"
                    label="得分"
                ></el-table-column>
                <el-table-column
                    prop="create_at"
                    label="提交时间"
                >
                    <template #default="{ row }">
                        {{ new Date(row.create_at * 1000).toLocaleString() }}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                >
                    <template #default="{ row }">
                        <el-button
                            type="primary"
                            size="mini"
                            @click="toReport(row.id)"
                        >
                            查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: center;width: 100%;">
                <el-pagination
                    layout="prev, pager, next"
                    v-model:current-page="page"
                    :total="100000"
                />
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import {
    api_game_defender_report_list
} from '@/api/game'
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
    WebRoutesGamesDefenderReportEditor, WebRoutesGamesDefenderReportDetail
} from '@/router/routes/game'

const router = useRouter()

const game_id = ref('')
const reports = ref([] as any[])
const page = ref(1)

watch(page, () => {
    get_reports()
})

const toNewReport = () => {
    router.push({
        path: WebRoutesGamesDefenderReportEditor.PATH.replace(':game_id', game_id.value).replace(':id', '')
    })
}

const toReport = (id: string) => {
    router.push({
        path: WebRoutesGamesDefenderReportDetail.PATH.replace(':game_id', game_id.value).replace(':id', id)
    })
}

const get_reports = async () => {
    const data = await api_game_defender_report_list(game_id.value, page.value, 20)
    if (data.code === 0) {
        reports.value = data.data.reports
    }
}

onMounted(() => {
    const id = router.currentRoute.value.params.id as string
    if (id) {
        game_id.value = id
        get_reports()
    } else {
        router.back()
    }
})

</script>
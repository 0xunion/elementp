<template>
    <el-row>
        <el-col :span="24">
            <div class="report_title">
                攻击报告 - {{ report.title }}
            </div>
            <el-divider></el-divider>
            <span class="report_time">
                提交时间：{{ new Date(report.create_at * 1000).toLocaleString() }}
            </span>
            <div class="report_state">
                状态：
                <el-tag type="success" v-if="report.state == 1">已通过</el-tag>
                <el-tag type="info" v-else-if="report.state == 0">待审核</el-tag>
                <el-tag type="danger" v-else-if="report.state == 2">已拒绝</el-tag>
            </div>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="18">
                    <div class="report_content">
                        <h3>
                            报告内容
                        </h3>
                        <div class="report_content_content">
                            <div v-html="xssFilter(report.content)"></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { 
    api_game_defender_report_detail
} from '@/api/game';
import { ElNotification } from 'element-plus';
import { isSuccess } from '@/api/utils';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { xssFilter } from '@/utils/xss';

const router = useRouter()

const game_id = ref('')
const report_id = ref('')

const report = ref({} as any)

const get_report = async () => {
    const data = await api_game_defender_report_detail(game_id.value, report_id.value)
    if (isSuccess(data)) {
        report.value = data.data.report
    } else {
        ElNotification({
            title: '获取评测报告失败',
            message: data.message,
            type: 'error'
        })
    }
}

onMounted(async () => {
    const rid = router.currentRoute.value.params.id
    const gid = router.currentRoute.value.params.game_id
    report_id.value = rid + ''
    game_id.value = gid + ''
    if (!report_id.value || !game_id.value) {
        router.back()
    } else {
        await get_report()
    }
})


</script>

<style lang="less">

.vuln_info_container {
    margin-top: 20px;
}

.vuln_info {
    margin-top: 20px;
}

.report_title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}

.report_time {
    font-size: 14px;
    color: #909399;
}

.report_state {
    font-size: 14px;
    color: #909399;
    margin-top: 10px;
}

.report_content {
    margin-top: 20px;
}

.report_content_title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
}

.report_content_content {
    font-size: 14px;
    color: #909399;
    margin-top: 10px;
}

.report_comments {
    margin-top: 20px;
    // with border
}

.report_comments_title {
    margin-bottom: .5rem;
}

.report_comments_content {
    margin-top: 10px;
}

.report_comments_commit {
    margin-top: 20px;
}

.report_comments_commit_input {
    margin-bottom: 10px;
}



</style>
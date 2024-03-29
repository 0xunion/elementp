<template>
    <el-row>
        <el-col :span="24">
            <div class="report_title">
                攻击报告 - {{ report.name }}
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
            <el-row class="vuln_info_container">
                <el-col :span="12">
                    <el-col class="vuln_info">
                        手法类型：
                        <el-tag v-for="attack_type in report_section.attack_type" v-show="report.attack_type == attack_type.value" type="info">
                            {{ attack_type.cn }}
                        </el-tag>
                    </el-col>
                    <el-col class="vuln_info">
                        突破隔离：
                        <el-tag v-for="isolation_break in report_section.isolation_break" v-show="report.isolation_break == isolation_break.value" type="success">
                            {{ isolation_break.cn }}
                        </el-tag>
                    </el-col >
                    <el-col class="vuln_info">
                        漏洞类型：
                        <el-tag v-for="vuln_type in report_section.vuln_type" v-show="report.vuln_type == vuln_type.value" type="warning">
                            {{ vuln_type.cn }}
                        </el-tag>
                    </el-col>
                    <el-col class="vuln_info">
                        漏洞等级：
                        <el-tag v-for="vuln_level in report_section.level" v-show="report.level == vuln_level.value" type="danger">
                            {{ vuln_level.cn }}
                        </el-tag>
                    </el-col>
                </el-col>
            </el-row>
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
                <el-col :span="24">
                    <div class="report_comments">
                        <el-divider></el-divider>
                        <h3 class="report_comments_title">
                            系统信息
                        </h3>
                        <div class="report_comments_content">
                            <el-table
                                :data="comments"
                                border
                                style="width: 100%"
                            >
                                <el-table-column
                                    prop="create_at"
                                    label="提交时间"
                                    width="200"
                                >
                                    <template #default="{ row }">
                                        {{ new Date(row.create_at * 1000).toLocaleString() }}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="role"
                                    label="角色"
                                    width="80"
                                >
                                    <template #default="{ row }">
                                        <el-tag type="success" v-if="row.role == 1">裁判</el-tag>
                                        <el-tag type="primary" v-else-if="row.role == 0">红队</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="content"
                                    label="内容"
                                ></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
                <el-col :span="24" v-if="report.state == 2">
                    <div class="report_actions">
                        <el-divider></el-divider>
                        <h3 class="report_actions_title">
                            操作
                        </h3>
                        <el-divider></el-divider>
                        <el-button
                            type="primary"
                            @click="openAppealDialog"
                        >
                            申诉
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-dialog
        v-model="appeal_dialog"
    >
        <el-form
            label-width="80px"
        >
            <el-form-item label="申诉理由">
                <el-input
                    type="textarea"
                    v-model="form.reason"
                    placeholder="请输入申诉理由"
                ></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="appeal_dialog = false">取 消</el-button>
            <el-button type="primary" @click="appeal">提 交</el-button>
        </span>
    </el-dialog>
</template>

<script setup lang="ts">
import { 
    api_game_attacker_report_section, 
    api_game_attacker_report_detail,
    api_game_attacker_report_appeal
} from '@/api/game';
import { ElNotification } from 'element-plus';
import { isSuccess } from '@/api/utils';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { xssFilter } from '@/utils/xss';

const router = useRouter()

const game_id = ref('')
const report_id = ref('')

class Section {
    name: string = ''
    value: number = 0
    cn: string = ''
}

const report_section = ref({
    achievement_type: [] as Section[],
    attack_type: [] as Section[],
    isolation_break: [] as Section[],
    level: [] as Section[],
    status: [] as Section[],
    vuln_type: [] as Section[],
})

const get_sections = async () => {
    const data = await api_game_attacker_report_section(game_id.value)
    if (isSuccess(data)) {
        report_section.value = data.data.sections
    }
}

const report = ref({} as any)
const comments = ref([] as any[])

const form = ref({
    reason : ''
})

const get_report = async () => {
    const data = await api_game_attacker_report_detail(game_id.value, report_id.value)
    if (isSuccess(data)) {
        report.value = data.data.report
        comments.value = [{
            role : 0,
            content: '提交了报告',
            create_at: report.value.create_at
        }]
        if (data.data.comments) {
            comments.value = comments.value.concat(data.data.comments)
        }
    } else {
        ElNotification({
            title: '获取评测报告失败',
            message: data.message,
            type: 'error'
        })
    }
}

const appeal_dialog = ref(false)

const openAppealDialog = () => {
    appeal_dialog.value = true
}

const appeal = async () => {
    const data = await api_game_attacker_report_appeal(game_id.value, report_id.value, form.value.reason)
    if (isSuccess(data)) {
        ElNotification({
            title: '申诉成功',
            message: '申诉成功，等待裁判处理',
            type: 'success'
        })
        appeal_dialog.value = false
        await get_report()
    } else {
        ElNotification({
            title: '申诉失败',
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
        get_sections()
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
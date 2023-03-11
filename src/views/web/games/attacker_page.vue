<template>
    <el-row>
        <el-col :span="24">
            <el-row>
                <el-col :span="24">
                    <h1>
                        信息概览
                    </h1>
                    <div>
                        队名 - {{ team.name }}
                    </div>
                    <div style="margin: 20px;">
                        <cardinfo title="当前得分" :content="team.score"></cardinfo>
                    </div>
                    <el-divider></el-divider>
                </el-col>
                <el-col :span="24">
                    <h1>
                        我提交的报告
                    </h1>
                </el-col>
                <el-col :span="24">
                    <el-divider></el-divider>
                    <el-button @click="toNewReport" type="primary">提交新报告</el-button>
                </el-col>
                <el-col :span="24">
                    <el-divider></el-divider>
                    <el-table
                        :data="reports"
                        style="width: 100%"
                    >
                        <el-table-column prop="name" label="标题"></el-table-column>
                        <el-table-column prop="level" label="漏洞等级">
                            <template #default="scope">
                                <el-tag v-for="item in sections.level" :key="item.value" v-show="item.value === scope.row.level" type="danger">{{ item.cn }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="vuln_type" label="漏洞类型">
                            <template #default="scope">
                                <el-tag v-for="item in sections.vuln_type" :key="item.value" v-show="item.value === scope.row.vuln_type" type="info">{{ item.cn }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="attack_type" label="攻击类型">
                            <template #default="scope">
                                <el-tag v-for="item in sections.attack_type" :key="item.value" v-show="item.value === scope.row.attack_type" type="success">{{ item.cn }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="isolation_break" label="隔离突破">
                            <template #default="scope">
                                <el-tag v-for="item in sections.isolation_break" :key="item.value" v-show="item.value === scope.row.isolation_break" type="warning">{{ item.cn }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="achievement_type" label="成果类型">
                            <template #default="scope">
                                <el-tag v-for="item in sections.achievement_type" :key="item.value" v-show="item.value === scope.row.achievement_type" type="primary">{{ item.cn }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="uri" label="URI"></el-table-column>
                        <el-table-column prop="create_at" label="创建时间">
                            <template #default="scope">
                                <span>{{ new Date(scope.row.create_at * 1000).toLocaleString() }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state" label="状态">
                            <template #default="scope">
                                <el-tag v-for="item in sections.status" :key="item.value" v-show="item.value === scope.row.state" :type="['info', 'success', 'danger'][item.value]">{{ item.cn }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-button type="text" @click="toReportDetail(scope.row.id)">详情</el-button>
                                <el-button type="text" @click="deleteReport(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- set pagination -->
                    <div style="text-align: center;">
                        <el-pagination
                            layout="prev, pager, next" :total="5000000"
                            v-model:current-page="reports_page"
                        >
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="24">
            <el-row>
                <el-col :span="24">
                    <h1>
                        我提交的攻击申请
                    </h1>
                </el-col>
                <el-col :span="24">
                    <el-divider></el-divider>
                    <el-button @click="toNewAttack" type="primary">申请高危攻击</el-button>
                </el-col>
                <el-col :span="24">
                    <el-divider></el-divider>
                    <el-table
                        :data="attacks"
                        style="width: 100%"
                    >
                        <el-table-column prop="id" label="申请ID"></el-table-column>
                        <el-table-column prop="reason" label="申请理由">
                            <template #default="scope">
                                <span>{{ scope.row.reason.length > 20 ? scope.row.reason.slice(0, 20) + '...' : scope.row.reason }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="create_at" label="创建时间">
                            <template #default="scope">
                                <span>{{ new Date(scope.row.create_at * 1000).toLocaleString() }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state" label="状态">
                            <template #default="scope">
                                <el-tag v-for="item in sections.status" :key="item.value" v-show="item.value === scope.row.state" :type="['info', 'success', 'danger'][item.value]">{{ item.cn }}</el-tag>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- set pagination -->
                    <div style="text-align: center;">
                        <el-pagination
                            layout="prev, pager, next" :total="5000000"
                            v-model:current-page="attacks_page"
                        >
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
    import { useRouter } from 'vue-router'
    import { 
        WebRoutesGamesReportEditor, 
        WebRoutesGamesAttackEditor, 
        WebRoutesGamesList, 
        WebRoutesGamesAttackReportDetail, 
        WebRoutesGamesJudgeAttacks 
    } from '@/router/routes/game'
    import { ref, onMounted, watch } from 'vue'

    import { 
        api_game_attacker_attack_list,
        api_game_attacker_report_delete, 
        api_game_attacker_report_list,
        api_game_attacker_report_section,
        api_game_attacker_self
    } from '@/api/game';
    import { isSuccess } from '@/api/utils';
    import { ElNotification } from 'element-plus';

    import cardinfo from '@/components/cardinfo.vue';

    class Section {
        name: string = ''
        value: number = 0
        cn: string = ''
    }

    const sections = ref({
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
            sections.value = data.data.sections
        }
    }

    const router = useRouter()

    const game_id = ref('')

    const toNewReport = () => {
        router.push({
            path : WebRoutesGamesReportEditor.PATH.replace(':game_id', game_id.value).replace(':id', '')
        })
    }
    const toNewAttack = () => {
        router.push({
            path : WebRoutesGamesAttackEditor.PATH.replace(':game_id', game_id.value).replace(':id', '')
        })
    }
    const toReportDetail = (id: string) => {
        router.push({
            path : WebRoutesGamesAttackReportDetail.PATH.replace(':game_id', game_id.value).replace(':id', id)
        })
    }

    const reports = ref([])
    const attacks = ref([])
    const team = ref({} as any)

    const reports_page = ref(1)
    const attacks_page = ref(1)

    watch(reports_page, () => {
        getReports()
    })

    watch(attacks_page, () => {
        getAttacks()
    })

    const getReports = async () => {
        const data = await api_game_attacker_report_list(game_id.value, reports_page.value, 20)
        if (isSuccess(data)) {
            reports.value = data.data.reports
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }
    }

    const getTeam = async () => {
        const data = await api_game_attacker_self(game_id.value)
        if (isSuccess(data)) {
            team.value = data.data.team
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }
    }

    const getAttacks = async () => {
        const data = await api_game_attacker_attack_list(game_id.value, attacks_page.value, 20)
        if (isSuccess(data)) {
            attacks.value = data.data.attacks
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }
    }

    const deleteReport = async (id: string) => {
        const data = await api_game_attacker_report_delete(game_id.value, id)
        if (isSuccess(data)) {
            ElNotification.success({
                title: '提示',
                message: '删除成功'
            })
            getReports()
        } else {
            ElNotification.error({
                title: '提示',
                message: data.message
            })
        }
    }

    onMounted(() => {
        const id = router.currentRoute.value.params.id as string
        if (id) {
            game_id.value = id
            getReports()
            getAttacks()
            getTeam()
        } else {
            router.push({
                path : WebRoutesGamesList.PATH
            })
        }

        get_sections()
    })

</script>

<style>
.el-pagination {
    padding: 5px;
    justify-content: center;
}
</style>
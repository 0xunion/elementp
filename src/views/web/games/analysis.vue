<template>
    <el-row>
        <el-col :span="24">
            <div class="statistics_basic">
                <div class="statistics_basic-title">
                    {{ game.name }}
                </div>
                <el-divider></el-divider>
                <div>
                    <el-icon>
                        <Paperclip></Paperclip>
                    </el-icon> 总隐患提交数量：{{ reports.length }} | 确认通过的隐患数量：{{ statistics_total_success_reports }}
                </div>
                <el-divider></el-divider>
                <div>
                    <el-icon>
                        <Medal></Medal>
                    </el-icon> 最佳攻击队: {{ statistics_best_red_team.name }} | 最佳防守队: {{ statistics_best_blue_team.name }}
                </div>
                <el-divider></el-divider>
            </div>
        </el-col>
        <el-col :span="24">
            <div class="section_header">
                近期隐患
            </div>
            <el-carousel :interval="4000" height="500px" class="analysis-carousel-item">
                <el-carousel-item v-for="item in staistics_reports_accepted_raw.slice(0, 10)" :key="item.id">
                    <div class="analysis-carousel-item-title">
                        <span>隐患标题 - {{ item.name }}</span>
                    </div>
                    <div class="analysis-carousel-item">
                        <div v-html="xssFilter(item.content)"></div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-col>
        <el-col :span="8">
            <piechart :options="statistics_vuln_type" style="height: 300px;"></piechart>
        </el-col>
        <el-col :span="8">
            <piechart :options="statistics_attack_type" style="height: 300px;"></piechart>
        </el-col>
        <el-col :span="8">
            <piechart :options="statistics_level" style="height: 300px;"></piechart>
        </el-col>
        <el-col :span="8">
            <piechart :options="statistics_isolation_break" style="height: 300px;"></piechart>
        </el-col>
        <el-col :span="8">
            <piechart :options="statistics_status" style="height: 300px;"></piechart>
        </el-col>
        <el-col :span="24">
            <linechart :options="statistics_reports_commits" style="height: 300px;"></linechart>
        </el-col>
        <el-col :span="24">
            <el-row>
                <el-col :span="24">
                    <div class="section_header">
                        红队排行TOP10 - 隐患提交
                    </div>
                </el-col>
                <el-col :span="12" v-for="redteam in statistics_red_team_break.slice(0, 10)">
                    <div class="analysis-redteam">
                        <span class="analysis-redteam-name">
                            {{ redteam.name }} - {{ redteam.accepted }}份通过的隐患
                        </span>
                        <el-progress
                            :text-inside="true"
                            :stroke-width="18"
                            :percentage="redteam.accepted / statistics_total_success_reports * 100"
                            status="success"
                        ></el-progress>
                        <el-progress
                            :text-inside="true"
                            :stroke-width="18"
                            :percentage="redteam.value / reports.length * 100"
                            status="info"
                        >
                            总隐患数量：{{ redteam.value }}
                        </el-progress>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="24">
            <el-row>
                <el-col :span="24">
                    <div class="section_header">
                        红队排行TOP10 - 分数
                    </div>
                </el-col>
                <el-col :span="24" v-for="redteam in red_team.slice(0, 10)">
                    <div class="analysis-redteam">
                        <span class="analysis-redteam-name">
                            {{ redteam.name }} - {{ redteam.score }}分
                        </span>
                        <el-progress
                            :text-inside="true"
                            :stroke-width="18"
                            :percentage="redteam.score / statistics_red_team_max_score * 100"
                            status="exception"
                        >
                            {{ redteam.score }}分
                        </el-progress>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="24">
            <el-row>
                <el-col :span="24">
                    <div class="section_header">
                        蓝队排行TOP10 - 分数
                    </div>
                </el-col>
                <el-col :span="24" v-for="blueteam in blue_team.slice(0, 10)">
                    <div class="analysis-redteam">
                        <span class="analysis-redteam-name">
                            {{ blueteam.name }} - {{ blueteam.score }}分
                        </span>
                        <el-progress
                            :text-inside="true"
                            :stroke-width="18"
                            :percentage="blueteam.score / statistics_blue_team_max_score * 100"
                            status="danger"
                        >
                            {{ blueteam.score }}分
                        </el-progress>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import {
    api_game_manage_report_list,
    api_game_manage_rank_blue_team,
    api_game_manage_rank_red_team,
    api_game_attacker_report_section,
    api_game_detail
} from '@/api/game'
import { ElNotification } from 'element-plus'
import { isSuccess } from '@/api/utils'
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { xssFilter } from '@/utils/xss'

import piechart from '@/components/piechart.vue'
import linechart from '@/components/linechart.vue'
import {
    PieChartsOptions
} from '@/components/piechart.vue'
import {
    LineChartsOptions
} from '@/components/linechart.vue'

import {
    Medal, Paperclip
} from '@element-plus/icons'

const router = useRouter()

const game_id = ref('')

const game = ref({} as any)

const reports = ref([] as any[])

const blue_team = ref([] as any[])
const red_team = ref([] as any[])

const statistics_vuln_type = computed(() => {
    const data = [] as any[]
    report_section.value.vuln_type.forEach((item: any) => {
        data.push({
            name: item.cn,
            value: item.value,
            count: 0
        })
    })

    reports.value.forEach((item: any) => {
        data.forEach((d: any) => {
            if (d.value === item.vuln_type) {
                d.count += 1
            }
        })
    })

    return {
        title: '漏洞类型',
        data: data.map((item: any) => {
            return {
                name: item.name,
                value: item.count
            }
        }) 
    } as PieChartsOptions
})

const statistics_attack_type = computed(() => {
    const data = [] as any[]
    report_section.value.attack_type.forEach((item: any) => {
        data.push({
            name: item.cn,
            value: item.value,
            count: 0
        })
    })

    reports.value.forEach((item: any) => {
        data.forEach((d: any) => {
            if (d.value === item.attack_type) {
                d.count += 1
            }
        })
    })

    return {
        title: '攻击手法',
        data: data.map((item: any) => {
            return {
                name: item.name,
                value: item.count
            }
        }) 
    } as PieChartsOptions
})

const statistics_level = computed(() => {
    const data = [] as any[]
    report_section.value.level.forEach((item: any) => {
        data.push({
            name: item.cn,
            value: item.value,
            count: 0
        })
    })

    reports.value.forEach((item: any) => {
        data.forEach((d: any) => {
            if (d.value === item.level) {
                d.count += 1
            }
        })
    })

    return {
        title: '漏洞等级',
        data: data.map((item: any) => {
            return {
                name: item.name,
                value: item.count
            }
        }) 
    } as PieChartsOptions
})

const statistics_isolation_break = computed(() => {
    const data = [] as any[]
    report_section.value.isolation_break.forEach((item: any) => {
        data.push({
            name: item.cn,
            value: item.value,
            count: 0
        })
    })

    reports.value.forEach((item: any) => {
        data.forEach((d: any) => {
            if (d.value === item.isolation_break) {
                d.count += 1
            }
        })
    })

    return {
        title: '突破隔离',
        data: data.map((item: any) => {
            return {
                name: item.name,
                value: item.count
            }
        }) 
    } as PieChartsOptions
})

const statistics_status = computed(() => {
    const data = [] as any[]
    report_section.value.status.forEach((item: any) => {
        data.push({
            name: item.cn,
            value: item.value,
            count: 0
        })
    })

    reports.value.forEach((item: any) => {
        data.forEach((d: any) => {
            if (d.value === item.state) {
                d.count += 1
            }
        })
    })

    return {
        title: '隐患状态',
        data: data.map((item: any) => {
            return {
                name: item.name,
                value: item.count
            }
        }) 
    } as PieChartsOptions
})

const statistics_red_team_break = computed(() => {
    const redteam = red_team.value

    const data = [] as any[]
    redteam.forEach((item: any) => {
        data.push({
            id: item.id,
            name: item.name,
            value: 0,
            accepted: 0,
        })
    })

    reports.value.forEach((item: any) => {
        if(item.state == 1) {
            data.forEach((d: any) => {
                if (d.id === item.attack_team_id) {
                    d.accepted += 1
                    d.value += 1
                }
            })
        } else {
            data.forEach((d: any) => {
                if (d.id === item.attack_team_id) {
                    d.value += 1
                }
            })
        }
    })

    return data
})

const statistics_reports_commits = computed(() => {
    const commits_line = [] as any[]
    const accepted_line = [] as any[]

    reports.value.forEach((item: any) => {
        const datetime = new Date(item.create_at * 1000)
        const date = datetime.getFullYear() + '-' + (datetime.getMonth() + 1) + '-' + datetime.getDate() + ' ' + datetime.getHours()
        // check if the last item is the same date
        if (commits_line.length > 0 && commits_line[commits_line.length - 1].date === date) {
            commits_line[commits_line.length - 1].value += 1
        } else {
            commits_line.push({
                date: date,
                value: 1
            })
        }

        if (item.state == 1) {
            if (accepted_line.length > 0 && accepted_line[accepted_line.length - 1].date === date) {
                accepted_line[accepted_line.length - 1].value += 1
            } else {
                accepted_line.push({
                    date: date,
                    value: 1
                })
            }
        }
    })


    return {
        title: '隐患提交时间线',
        data: [{
            name: '隐患提交',
            data: commits_line
        }, {
            name: '隐患接受',
            data: accepted_line
        }]
    } as LineChartsOptions
})

const staistics_reports_accepted_raw = computed(() => {
    return reports.value.filter((item: any) => {
        return item.state == 1
    })
})

const statistics_total_success_reports = computed(() => {
    return reports.value.filter((item: any) => {
        return item.state == 1
    }).length
})

const statistics_red_team_max_score = computed(() => {
    let max = 0
    red_team.value.forEach((item: any) => {
        if (item.score > max) {
            max = item.score
        }
    })
    return max
})

const statistics_blue_team_max_score = computed(() => {
    let max = 0
    blue_team.value.forEach((item: any) => {
        if (item.score > max) {
            max = item.score
        }
    })
    return max
})

const statistics_best_red_team = computed(() => {
    let max = 0
    let best = {} as any
    red_team.value.forEach((item: any) => {
        if (item.score > max) {
            max = item.score
            best = item
        }
    })

    if (max === 0) {
        return {
            name: '暂无',
            score: 0
        }
    }
    return best
})

const statistics_best_blue_team = computed(() => {
    let max = 0
    let best = {} as any
    blue_team.value.forEach((item: any) => {
        if (item.score > max) {
            max = item.score
            best = item
        }
    })

    if (max === 0) {
        return {
            name: '暂无',
            score: 0
        }
    }
    return best
})

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

const get_reports = async () => {
    const data = await api_game_manage_report_list(game_id.value, 1, 3000, 1, -1, "")
    if (isSuccess(data)) {
        reports.value = data.data.reports
    } else {
        ElNotification({
            title: '获取评测隐患列表失败',
            message: data.message,
            type: 'error'
        })
    }
}

const get_blue_team = async () => {
    const data = await api_game_manage_rank_blue_team(game_id.value, 1, 1000)
    if (isSuccess(data)) {
        blue_team.value = data.data.rank
    } else {
        ElNotification({
            title: '获取蓝队排名失败',
            message: data.message,
            type: 'error'
        })
    }
}

const get_red_team = async () => {
    const data = await api_game_manage_rank_red_team(game_id.value, 1, 1000)
    if (isSuccess(data)) {
        red_team.value = data.data.rank
    } else {
        ElNotification({
            title: '获取红队排名失败',
            message: data.message,
            type: 'error'
        })
    }
}

const get_game = async () => {
    const data = await api_game_detail(game_id.value)
    if (isSuccess(data)) {
        game.value = data.data.game
    } else {
        ElNotification({
            title: '获取比赛信息失败',
            message: data.message,
            type: 'error'
        })
    }
}

onMounted(async () => {
    const id = router.currentRoute.value.params.id
    game_id.value = id + ''
    if (!game_id.value) {
        router.back()
    } else {
        await get_sections()
        get_reports()
        get_blue_team()
        get_red_team()
        get_game()
    }
})


</script>

<style>
.statistics_basic {
    width: 100%;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 50px;
    color: cornflowerblue;
}

.analysis-carousel-item {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin: 20px;
}

.analysis-carousel-item-title {
    font-size: 16px;
    font-weight: 600;
    color: rgb(0,138,205);
    margin: 10px;
}

.statistics_basic-title {
    color: rgb(0,138,205);
    font-size: 30px;
}

.analysis-redteam {
    margin: 20px;
}

.analysis-redteam-name {
    padding: 0;
    font-weight: bolder;
    color: gray;
    border: 5px;
    padding: 5px;
    line-height: 25px;
    font-size: 14px;
}

.section_header {
    font-size: 16px;
    font-weight: bolder;
    color: rgb(0,138,205);
    margin: 10px;
    font-weight: 800;
    font-size: 18px;
}
</style>
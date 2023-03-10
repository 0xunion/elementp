<template>
    <div class="defender-page">
        <div class="title">
            {{ game.name }}
        </div>
        <div class="container">
            <div class="attack">
                <div class="mini-title text-white text-right padding-10 text-bold">
                    Team Ranking 攻击团队排名
                </div>
                <div class="margin-20">
                    <div class="team-bottom" v-for="team, i in statistics.attackers.slice(0, 2)">
                        <el-row>
                            <el-col :span="12">
                                <div class="text-white text-bold padding-10 margin-20">
                                    <span class="text-score"> No.{{ i + 1}} </span> - <span class="text-primary"> {{ team.name }} </span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="text-right text-white padding-10 margin-20 text-score">{{ team.score }}</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="margin-10 back-shadow padding-20" style="width: 90%; height: 300px; margin-top: 50px;">
                        <el-row>
                            <el-col :span="12">
                                <div class="text-center">
                                    <div class="text-primary">攻击次数</div>
                                    <div class="text-white text-score">
                                        {{ statistics_success_reports }} 次
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="text-center">
                                    <div class="text-primary">突破单位</div>
                                    <div class="text-white text-score">
                                        {{ statistics_attacked }} 家
                                    </div>
                                </div>
                            </el-col>
                            <el-col :span="24">
                                <div class="radar"></div>
                            </el-col>
                            <el-col :span="24">
                                <div class="text-center text-primary" style="font-size: 24px;">
                                    {{ is_end ? '攻击结束' : 'ATTACKING! 攻击中！' }}
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="team-bottom" v-for="team, i in statistics.attackers.slice(2, 6)">
                        <el-row>
                            <el-col :span="12">
                                <div class="text-white text-bold padding-10 margin-20">
                                    <span class="text-score"> No.{{ i + 3 }} </span> - <span class="text-primary"> {{ team.name }} </span>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="text-right text-white padding-10 margin-20 text-score">{{ team.score }}</div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="map">
                <div id="defender_map" style="width: 100%; height: 1000px;"></div>
                <div style="position: absolute; bottom: 90px; width: 100%;">
                    <el-row>
                        <el-col :span="4"
                            v-for="item in statistics_top_6_vuln_type"
                        >
                            <textbox
                                :title="item.name"
                                :value="item.value"
                            ></textbox>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="defender">
                <div class="mini-title-reverse text-white text-left padding-10 text-bold">
                    隐患情况 Vulnerability Situation
                </div>
                <el-row style="margin-top: 10px;">
                    <el-col :span="2">
                        <el-divider direction="vertical" style="height: 50px;"></el-divider>
                    </el-col>
                    <el-col :span="10">
                        <div class="text-left">
                            <div class="text-primary">报告提交次数</div>
                            <div class="text-white text-score">
                                {{ statistics_total_reports }} 次
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="2">
                        <el-divider direction="vertical" style="height: 50px;"></el-divider>
                    </el-col>
                    <el-col :span="10">
                        <div class="text-left">
                            <div class="text-primary">已通过 <span class="text-white">{{ statistics_success_reports }}</span></div>
                            <div class="text-primary">未通过 <span class="text-white">{{ statistics_fail_reports }}</span></div>
                        </div>
                    </el-col>
                    <el-col :span="24" class="margin-20">
                        <el-row>
                            <el-col :span="6" v-for="item in statistics_top_4_vuln_level">
                                <el-progress
                                    type="dashboard"
                                    :color="colors"
                                    :percentage="item.percentage_value"
                                >
                                    <div class="text-primary">{{ item.name }}</div>
                                    <div class="text-score text-white">
                                        {{ item.value }}
                                    </div>
                                </el-progress>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <div class="mini-title-reverse text-white text-left padding-10 text-bold">
                    攻破情况 Breakdown Situation
                </div>
                <el-row>
                    <el-col :span="12">
                        <div class="circle" style="width: 300px; height: 300px;">
                            <div class="text-white text-center text-score" style="line-height: 300px;">
                                {{ (statistics_isolation_break / statistics_success_reports * 100).toFixed(2) }}%
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                            <el-col :span="24" v-for="item in statistics_top_5_industry">
                                <el-row class="text-primary" style="margin: 5px;">
                                    <el-col :span="12" class="text-left">
                                        {{ item.name }}
                                    </el-col>
                                    <el-col :span="12" class="text-right">
                                        {{ item.value }}
                                    </el-col>
                                </el-row>
                                <el-progress
                                    :percentage="item.percentage_value"
                                    :text-inside="true"
                                    :stroke-width="15"
                                    :color="colors"
                                ></el-progress>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <div class="mini-title-reverse text-white text-left padding-10 text-bold">
                    蓝队排名 Defender Ranking
                </div>
                <el-row>
                    <el-col :span="24">
                        <div class="team-bottom" v-for="team, i in statistics.defenders.slice(0, 4)">
                            <el-row>
                                <el-col :span="12">
                                    <div class="text-white text-bold padding-10 margin-20">
                                        <span class="text-score"> No.{{ i + 1}} </span> - <span class="text-primary"> {{ team.name }} </span>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="text-right text-white padding-10 margin-20 text-score">{{ team.score }}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { 
    api_game_detail,
    api_game_defender_statistics,
    api_game_attacker_report_section
} from '@/api/game'
import {
    get_region as api_get_region
} from '@/api/map'
import { isSuccess } from '@/api/utils';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router'
import textbox from './components/textbox.vue';
import {
    EChartsOption
} from 'echarts'

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]

const router = useRouter()

class Section {
    name: string = ''
    value: number = 0
    cn: string = ''
}

let map = null as any
const map_options : EChartsOption = {
    tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
            const value = params.value
            if (value) {
                return value[2]
            }
        }
    },
    visualMap: {
        min: 0,
        max: 100,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'],
        calculable: true,
        inRange: {
            color: ['#e6f7ff', '#1890FF','#0050b3'] // 渐变颜色
        }
    },
    series: [
        {
            name: '地图',
            type: 'map',
            mapType: 'xxxx',
            zoom: 1,
            label: {
                normal: {
                    show: true,
                    color: '#fff',
                    fontSize: 12,
                },
                emphasis: {
                    show: true,
                    color: '#fff',
                    fontSize: 12,
                },
            },
            itemStyle: {
                normal: {
                    areaColor: '#0f2c70aa',
                    borderColor: '#111',
                },
                emphasis: {
                    areaColor: '#0f2c70',
                },
            },
            data: [],
        },
    ],
}
const refreshMap = () => {
    if (map) {
        map.setOption(map_options)
    } else {
        map = echarts.init(document.getElementById('defender_map') as HTMLDivElement)
        map.setOption(map_options)
    }
}

const game_id = ref('')
const game = ref({} as any)
const is_end = ref(false)
const statistics = ref({
    reports : {
        total: 0,
        accepted: 0,
        rejected: 0,
        unverified: 0,
        isolation_break: 0,
    },
    attack_types : [] as any[],
    vuln_types : [] as any[],
    vuln_levels : [] as any[],
    attackers : [] as any[],
    industry : [] as any[],
    defenders : [] as any[],
    sections : {
        vuln_type: [] as Section[],
        vuln_level: [] as Section[],
    },
    attacked: [] as any[],
})

const statistics_success_reports = computed(() => {
    return statistics.value.reports.accepted
})

const statistics_fail_reports = computed(() => {
    return statistics.value.reports.rejected
})

const statistics_unverified_reports = computed(() => {
    return statistics.value.reports.unverified
})

const statistics_total_reports = computed(() => {
    return statistics.value.reports.total
})

const statistics_attacked = computed(() => {
    return statistics.value.attacked.filter((item: any) => {
        return item.count > 0
    }).length
})

const statistics_isolation_break = computed(() => {
    return statistics.value.reports.isolation_break
})

const statistics_top_4_vuln_level = computed(() => {
    const vuln_level = statistics.value.vuln_levels.sort((a: any, b: any) => {
        return b.count - a.count
    }).slice(0, 4)

    const total = vuln_level.reduce((total: number, item: any) => {
        return total + item.count
    }, 0)

    return vuln_level.map((item: any) => ({
        name : statistics.value.sections.vuln_level.find((section: Section) => section.value === item.value)?.cn || '未知',
        value : item.count,
        percentage : total === 0 ? 0 : (item.count / total * 100).toFixed(2) + '%',
        percentage_value : total === 0 ? 0 : (item.count / total * 100).toFixed(2),
    }))
})

const statistics_top_5_industry = computed(() => {
    const industry = statistics.value.industry.sort((a: any, b: any) => {
        return b.count - a.count
    }).slice(0, 5)

    const total = industry.reduce((total: number, item: any) => {
        return total + item.count
    }, 0)

    return industry.map((item: any) => ({
        name : item.value,
        value : item.count,
        percentage : total === 0 ? 0 : (item.count / total * 100).toFixed(2) + '%',
        percentage_value : total === 0 ? 0 : (item.count / total * 100).toFixed(2),
    }))
})

const statistics_top_6_vuln_type = computed(() => {
    const vuln_type = statistics.value.vuln_types.sort((a: any, b: any) => {
        return b.count - a.count
    }).slice(0, 6)

    const total = vuln_type.reduce((total: number, item: any) => {
        return total + item.count
    }, 0)

    return vuln_type.map((item: any) => ({
        name : statistics.value.sections.vuln_type.find((section: Section) => section.value === item.value)?.cn || '未知',
        value : item.count,
        percentage : total === 0 ? 0 : (item.count / total * 100).toFixed(2) + '%',
        percentage_value : total === 0 ? 0 : (item.count / total * 100).toFixed(2),
    }))
})

const get_statistics = async () => {
    const data = await api_game_defender_statistics(game_id.value)
    if (isSuccess(data)) {
        statistics.value.attackers = data.data.statistics.rank.red_team
        statistics.value.defenders = data.data.statistics.rank.blue_team
        statistics.value.attacked = data.data.statistics.defender_reverse_rank
        statistics.value.reports.total = data.data.statistics.reports.total
        statistics.value.reports.accepted = data.data.statistics.reports.accepted
        statistics.value.reports.rejected = data.data.statistics.reports.rejected
        statistics.value.reports.unverified = data.data.statistics.reports.unverified
        statistics.value.reports.isolation_break = data.data.statistics.reports.isolation_break
        statistics.value.attack_types = data.data.statistics.attack_types.gimmack
        statistics.value.vuln_types = data.data.statistics.attack_types.vuln_type
        statistics.value.vuln_levels = data.data.statistics.attack_types.vuln_level
        statistics.value.industry = data.data.statistics.attack_types.industry
    } else {
        ElNotification({
            title: '获取统计信息失败',
            message: data.message,
            type: 'error'
        })
    }
}

const get_attacker_report_section = async () => {
    const data = await api_game_attacker_report_section(game_id.value)
    if (isSuccess(data)) {
        statistics.value.sections.vuln_level = data.data.sections.level
        statistics.value.sections.vuln_type = data.data.sections.vuln_type
    } else {
        ElNotification({
            title: '获取攻击报告失败',
            message: data.message,
            type: 'error'
        })
    }
}

const get_map = async () => {
    const data = await api_get_region(game.value.position_code) as any
    echarts.registerMap('xxxx', data)
    refreshMap()
}

const get_game = async () => {
    const data = await api_game_detail(game_id.value)
    if (isSuccess(data)) {
        game.value = data.data.game
        const end_time = new Date(game.value.end_time * 1000)
        const now = new Date()
        is_end.value = now.getTime() > end_time.getTime()
        if (!is_end.value) {
            setTimeout(() => {
                is_end.value = true
            }, end_time.getTime() - now.getTime() + 1000)
        }

        get_map()
    } else {
        ElNotification({
            title: '获取比赛信息失败',
            message: data.message,
            type: 'error'
        })
    }
}

let timer: any = null
onMounted(() => {
    const id = router.currentRoute.value.params.id as string
    if (id) {
        game_id.value = id
        get_game()
        get_statistics()
        get_attacker_report_section()
        timer = setInterval(() => {
            get_statistics()
        }, 100000)
    } else {
        router.back()
    }

    get_game()
})
onUnmounted(() => {
    clearInterval(timer)
})

</script>

<style lang="less">
* {
    font-family: 'Microsoft YaHei';
}
@font-face {
    font-family: 'Digial-7';
    src: url('./assets/digital-7.ttf') format('truetype');
}

.text-primary {
    color: #409eff;
}

.text-deep-primary {
    color: #3a8ee6;
}

.text-white {
    color: #fff;
}

.padding-20 {
    padding: 20px;
}

.padding-10 {
    padding: 10px;
}

.padding-left-10 {
    padding-left: 10px;
}

.padding-left-20 {
    padding-left: 20px;
}

.padding-right-10 {
    padding-right: 10px;
}

.margin-10 {
    margin: 10px;
}

.margin-20 {
    margin: 20px;
}

.text-bold {
    font-weight: 600;
}

.text-score {
    font-size: 28px;
}

div, span {
    font-family: 'Digial-7';
}

.mini-title {
    background-image: url('./assets/mintitle.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.mini-title-reverse {
    background-image: url('./assets/mintitle-reverse.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.team-bottom {
    background-image: url('./assets/linx.png');
    background-size: 100% 20px;
    background-repeat: no-repeat;
    background-position: bottom;
    padding-bottom: 5px;
}

.back-shadow {
    background-image: url('./assets/back-shadow.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.circle {
    background-image: url('./assets/progress_circle.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
}

.text-right {
    text-align: right;
}

.text-center {
    text-align: center;
}

.text-left {
    text-align: left;
}

.defender-page {
    width: calc(100% - 40px);
    padding: 20px;
    height: 100%;
    background-image: url('./assets/defender-background.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .radar {
        margin: 0 auto;
        width: calc(8em);
        height: calc(8em);
        font-size: 28px;
        position: relative;
        background: 
            linear-gradient(
                90deg,
                transparent 49.75%,
                rgb(0, 40, 100) 49.75%,
                rgb(0, 27, 100) 50.25%,
                transparent 50.25%),
            linear-gradient(
                transparent 49.75%,
                rgb(0, 40, 100) 49.75%,
                rgb(0, 27, 100) 50.25%,
                transparent 50.25%),
            repeating-radial-gradient(
                transparent 0, 
                transparent 0.95em, 
                rgb(0, 77, 100) 49.75%,
                rgb(0, 60, 100) 50.25%,);
        border-radius: 50%;
    }

    .radar::before {
        content: '';
        position: absolute;
        width: calc(6.5em / 2);
        height: calc(6.5em / 2);
        top: calc(1.5em / 2);
        left: calc(1.5em / 2);
        /*border: 1px solid white;*/
        background: linear-gradient(
                45deg,
                rgba(0, 0, 0, 0) 50%,
                rgba(0, 192, 0, 1) 100%
            );
        border-radius: 100% 0 0 0;
        animation: 
        scaning 5s linear infinite;
        transform-origin: 100% 100%;
    }

    @keyframes scaning {
        to {
            transform: rotate(360deg);
        }
    }

    .title {
        width: 100%;
        height: 5%;
        color: #fff;
        font-size: 30px;
        text-align: center;
        font-weight: 600;
        background-image: url('./assets/defender-title.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .container {
        width: 100%;
        height: 95%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .attack {
            width: 30%;
            height: 100%;
            padding: 10px;
        }

        .map {
            width: 40%;
            height: 100%;
            padding: 10px;
            position: relative;
        }

        .defender {
            width: 30%;
            height: 100%;
            padding: 10px;
        }
    }
}
</style>
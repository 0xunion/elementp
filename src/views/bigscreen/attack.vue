<template>
    <div class="attack_page">
        <div class="attack_top">
            0xUn1on网络安全攻防平台
        </div>
        <div class="attack_body">
            <div class="attack_page_left">
                <div class="attack_page_left_top">
                    <div class="attack_page_left_top_item">
                        <textbox title="距离结束还有" :value="statistics.remainder_time"></textbox>
                    </div>
                    <div class="attack_page_left_top_item">
                        <textbox title="攻击队" :value="statistics.attacker"></textbox>
                    </div>
                    <div class="attack_page_left_top_item">
                        <textbox title="防守队" :value="statistics.defender"></textbox>
                    </div>
                    <div class="attack_page_left_top_item">
                        <textbox title="报告数" :value="statistics.reports"></textbox>
                    </div>
                    <div class="attack_page_left_top_item">
                        <textbox title="隐患数" :value="statistics.dangers"></textbox>
                    </div>
                    <div class="attack_page_left_top_item">
                        <textbox title="突破隔离" :value="statistics.isolation"></textbox>
                    </div>
                </div>
                <div class="attack_page_left_map">
                    <div class="attack_page_left_map_container">
                        <div class="attack_page_left_map_container_inner">
                            <VueEcharts :option="map_options" style="height: 100%; width: 100%;" ref="map"></VueEcharts>
                        </div>
                    </div>
                </div>
                <div class="attack_page_left_bottom">
                    <div class="attack_page_left_bottom_item">
                        <div class="attack_page_left_bottom_item_title">
                            手法统计
                        </div>
                        <div class="attack_page_left_bottom_item_body">
                            <div class="attack_page_attack_type"
                                v-for="item in attack_types"
                            >
                                <div class="attack_page_attack_type_name">
                                    {{ item.cn }} : 
                                </div>
                                <div class="attack_page_attack_type_value">
                                    <span v-for="gimmack in statistics.attack_types" v-show="gimmack.value == item.value">
                                        {{ gimmack.count }}
                                    </span>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div class="attack_page_left_bottom_item">
                        <div class="attack_page_left_bottom_item_title">
                            通知
                        </div>
                    </div>
                    <div class="attack_page_left_bottom_item">
                        <div class="attack_page_left_bottom_item_title">
                            被攻击行业统计
                        </div>
                        <div class="attack_page_left_bottom_item_body">
                            <div class="attack_page_industry" v-for="(item, idx) in statistics.industry" v-show="idx < 4" :label="item.value">
                                <div class="attack_page_industry_name">
                                    {{ item.value }} :
                                </div>
                                <el-progress 
                                    class="attack_page_industry_value"
                                    :percentage="industry_percent(item.count)" 
                                    :stroke-width="20" 
                                    :text-inside="true"
                                ></el-progress>
                            </div>
                        </div>
                    </div>
                    <div class="attack_page_left_bottom_item">
                        <div class="attack_page_left_bottom_item_title">
                            发现问题单位
                        </div>
                    </div>
                </div>
            </div>
            <div class="attack_page_right">
                <div class="attack_page_right_red_rank attack_page_right_item">
                    <div class="attack_page_left_bottom_item_title">
                        红队排名
                    </div>
                    <ul>
                        <li v-for="red in statistics.red_teams">
                            <div class="attack_page_right_red_rank_item">
                                <div class="attack_page_right_red_rank_item_name">
                                    {{ red.name }}
                                </div>
                                <div class="attack_page_right_red_rank_item_score">
                                    {{ red.score }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="attack_page_right_blue_rank attack_page_right_item">
                    <div class="attack_page_left_bottom_item_title">
                        蓝队排名
                    </div>
                    <ul>
                        <li v-for="blue in statistics.blue_teams">
                            <div class="attack_page_right_red_rank_item">
                                <div class="attack_page_right_red_rank_item_name">
                                    {{ blue.name }}
                                </div>
                                <div class="attack_page_right_red_rank_item_score">
                                    {{ blue.score }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="attack_page_right_attack_types attack_page_right_item">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import textbox from './components/textbox.vue';
    import { ref, onMounted, computed, reactive, onBeforeUnmount } from 'vue'
    import { api_game_attacker_statistics, api_game_attacker_report_section } from '@/api/game'
    import { useRouter } from 'vue-router';
    import { isSuccess } from '@/api/utils';
    import { VueEcharts } from 'vue3-echarts';
    import type { EChartsOption } from 'echarts'
    import 'echarts-gl'
    import * as echarts from 'echarts'
    import geoMap from '@/assets/random_map.geojson?raw'

    const geoJson = JSON.parse(geoMap)

    echarts.registerMap('random_map', geoJson)

    const router = useRouter()

    class Gimmack {
        value: number = 0
        count: number = 0
    }

    class Industry {
        value: string = ''
        count: number = 0
    }

    const statistics = ref({
        remainder_time: '00:00:00',
        attacker: 0,
        defender: 0,
        reports : 0,
        dangers: 0,
        isolation: 0,
        attack_types: [] as Gimmack[],
        industry: [] as Industry[],
        red_teams : [] as any[],
        blue_teams : [] as any[],
    })

    const total_industry = computed(() => {
        let total = 0
        statistics.value.industry.forEach(item => {
            total += item.count
        })
        return total
    })

    const industry_percent = (value: number) => {
        return (value / total_industry.value) * 100
    }

    const industry_format = (value: number) => {
        return ((value / total_industry.value) * 100).toFixed(2) + '%'
    }

    class Section {
        name: string = ''
        value: number = 0
        cn: string = ''
    }

    const attack_types = ref([] as Section[])

    const game_id = ref('')

    const red_team_map_choice = ref({} as any) // team_id => geojson_feature_index
    
    const get_statistics = async () => {
        const data = await api_game_attacker_statistics(game_id.value)
        if (isSuccess(data)) {
            statistics.value.dangers = data.data.statistics.reports.accepted
            statistics.value.isolation = data.data.statistics.reports.isolation_break
            statistics.value.reports = data.data.statistics.reports.total
            statistics.value.attack_types = data.data.statistics.attack_types.gimmack
            statistics.value.industry = data.data.statistics.attack_types.industry.sort((a: Industry, b: Industry) => {
                return b.count - a.count
            })

            statistics.value.attacker = data.data.statistics.rank.red_team.length
            statistics.value.defender = data.data.statistics.rank.blue_team.length

            statistics.value.red_teams = data.data.statistics.rank.red_team
            statistics.value.blue_teams = data.data.statistics.rank.blue_team

            // refresh map options
            const redteams = data.data.statistics.rank.red_team

            redteams.forEach((item: any) => {
                // check if team_id in red_team_map_choice
                if (red_team_map_choice.value[item.id] === undefined) {
                    // if not, choose a random index, and ensure it is not in red_team_map_choice
                    let index = Math.floor(Math.random() * geoJson.features.length)
                    while (red_team_map_choice.value[index] !== undefined) {
                        index = Math.floor(Math.random() * geoJson.features.length)
                    }
                    red_team_map_choice.value[item.id] = index
                }

                // set height
                geoJson.features[red_team_map_choice.value[item.id]].properties.height = item.score + 10
                // set name

                // check if name is already set
                if (geoJson.features[red_team_map_choice.value[item.id]].properties.name.indexOf('-') === -1) {
                    geoJson.features[red_team_map_choice.value[item.id]].properties.name += '-' + item.name
                }
            })

            // set data
            map_options.series[0].data = geoJson.features.map(function (feature: any) {
                return {
                    name: feature.properties.name,
                    value: feature.properties.height,
                    height: Math.min(
                        40,
                        feature.properties.height / get_geojson_max_height() * 40
                    )
                };
            })

            // set visualMap
            map_options.visualMap.max = get_geojson_max_height()
        }
    }

    const get_attack_types = async () => {
        const data = await api_game_attacker_report_section(game_id.value)
        if (isSuccess(data)) {
            attack_types.value = data.data.sections.attack_type
        }
    }

    const get_geojson_max_height = ():number => {
        let max = 0
        geoJson.features.forEach((item: any) => {
            if (item.properties.height > max) {
                max = item.properties.height
            }
        })

        return max
    }

    const map_options : EChartsOption = {
        visualMap: {
            show: true,
            min: 0.4,
            max: get_geojson_max_height(),
            inRange: {
            color: [
                '#d7302799',
                '#31369599',
              ]
            },
          },
        series: [
          {
            type: 'map3D',
            map: 'random_map',
            shading: 'realistic',
            realisticMaterial: {
                roughness: 0.6,
                textureTiling: 20
            },
            postEffect: {
                enable: true,
                bloom: {
                enable: false
                },
                SSAO: {
                enable: true,
                quality: 'medium',
                radius: 10,
                intensity: 1.2
                },
                depthOfField: {
                enable: false,
                focalRange: 5,
                fstop: 1,
                blurRadius: 6
                }
            },
            viewControl: {
                minBeta: -360,
                maxBeta: 360 * 1000000,
                autoRotate: true,
                autoRotateSpeed: 5,
            },
            label: {
                show: true,
                distance: 10,
                formatter: function (params: any) {
                    return params.name
                },
            },
            itemStyle: {
                color: '#313695',
                opacity: 0.6,
                borderWidth: 0.8,
                borderColor: '#31369599'
            },
            silent: true,
            instancing: true,
            boxHeight: 20,
            data: geoJson.features.map(function (feature: any) {
                return {
                    name: feature.properties.name,
                    value: feature.properties.height,
                    height: Math.min(
                        40,
                        feature.properties.height / get_geojson_max_height() * 40
                    )
                };
            })
          },
        ],
        tooltip: {
            show: true,
            formatter: function (params: any) {
                return params.name + ' : ' + params.value
            }
        } 
    }

    const map = ref(null as any)

    let timer: any = null

    onMounted(async () => {
        const id = router.currentRoute.value.params.id
        const gid = id + ''
        if(gid != '') {
            game_id.value = gid
            await get_attack_types()
            await get_statistics()

            timer = setInterval(async () => {
                await get_statistics()
                map.value.refreshOption(map_options)
            }, 70000)
            
            map.value.refreshOption(map_options)
        }
    })

    onBeforeUnmount(() => {
        clearInterval(timer)
    })
</script>

<style lang="less">
    /**
    <div class="attack_page_right">
                <div class="attack_page_right_red_rank attack_page_right_item">
                    <div class="attack_page_left_bottom_item_title">
                        红队排名
                    </div>
                    <ul>
                        <li v-for="red in statistics.red_teams">
                            <div class="attack_page_right_red_rank_item">
                                <div class="attack_page_right_red_rank_item_name">
                                    {{ red.name }}
                                </div>
                                <div class="attack_page_right_red_rank_item_score">
                                    {{ red.score }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="attack_page_right_blue_rank attack_page_right_item">
                    <div class="attack_page_left_bottom_item_title">
                        蓝队排名
                    </div>
                    <ul>
                        <li v-for="blue in statistics.blue_teams">
                            <div class="attack_page_right_red_rank_item">
                                <div class="attack_page_right_red_rank_item_name">
                                    {{ blue.name }}
                                </div>
                                <div class="attack_page_right_red_rank_item_score">
                                    {{ blue.score }}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="attack_page_right_attack_types attack_page_right_item">
                    
                </div>
            </div> */
    .attack_page_right {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        ul {
            list-style: none;
            padding-left: 40px;
            padding-right: 40px;
            margin: 0;

            li {
                width: 100%;
                height: 40px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                padding-left: 20px;
                padding-right: 20px;
                font-size: 16px;
                color: #fff;
                font-weight: 700;

                &:nth-child(odd) {
                    background-color: rgba(255, 255, 255, 0.1);
                }

                .attack_page_right_red_rank_item {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }

                .attack_page_right_red_rank_item_name {
                    width: 50%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                }
            }
        }
    }

    .attack_page_industry {
        width: 100%;
        height: 25%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .attack_page_industry_name {
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 18px;
        color: #fff;
        font-weight: 600;
        margin-right: 20px;
    }

    .attack_page_industry_value {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .el-progress-bar__inner {
            background-color: rgb(48, 109, 179);
        }
    }

    .attack_page_left_bottom_item_body {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    .attack_page_attack_type {
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .attack_page_attack_type_name {
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        font-size: 18px;
        color: #fff;
        font-weight: 600;
        margin-right: 20px;
    }

    .attack_page_attack_type_value {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 18px;
        color: rgb(7,231,252);
        font-weight: 600;
    }

    .attack_page {
        width: calc(100% - 40px);
        height: 100%;
        background-image: url('./assets/background.png');
        background-size: 100% 100%;
        padding: 0 20px;
    }

    .attack_top {
        background-image: url('./assets/topbar.png');
        background-size: 100% 100%;
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        color: #fff;
        font-weight: 600;
    }
    
    .attack_body {
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .attack_page_left {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .attack_page_left_top {
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .attack_page_left_top_item{
        width: 16.66666666%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }

    .attack_page_left_map {
        margin: 20px;
        width: 100%;
        height: 50%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-size: 100% 100%;
    }
    .attack_page_left_map_container {
        margin: 10px;
        width: 100%;
        height: 100%;
        background-image: url('./assets/map.png');
        background-size: 100% 100%;
    }
    .attack_page_left_map_container_inner {
        width: calc(100% - 40px);
        height: calc(100% - 40px);
        margin: 20px;
    }
    .attack_page_left_bottom {
        width: 100%;
        height: 30%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .attack_page_right {
        width: 30%;
        height: 90%;
    }

    .attack_page_left_bottom_item {
        margin: 10px;
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-image: url('./assets/map.png');
        background-size: 100% 100%;
    }

    .attack_page_left_bottom_item_title {
        width: 100%;
        height: 20%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-image: url('./assets/title.png');
        background-size: 100% 100%;
        color: rgb(7,233,253);
        font-weight: 800;
        /* font-family: 微软雅黑; */
        font-size: 20px;
    }

    .attack_page_right_red_rank {
        width: 100%;
        height: 30%;
    }

    .attack_page_right_blue_rank {
        width: 100%;
        height: 30%;
    }

    .attack_page_right_attack_types {
        width: 100%;
        height: 40%;
    }

    .attack_page_right_item {
        margin: 10px;
        width: 100%;
        background-image: url('./assets/map.png');
        background-size: 100% 100%;
    }


</style>
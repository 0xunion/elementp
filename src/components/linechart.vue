<template>
    <div ref="charts"></div>
</template>

<script lang="ts">
export class LineChartsOptions {
    title: string
    data : {
        name: string
        data: {
            value: number
            date: string
        }[]
    }[]

    constructor() {
        this.title = 'ECharts 入门示例'
        this.data = [
            {
                name: '直接访问',
                data: [
                    { value: 335, date: 'Mon' },
                    { value: 310, date: 'Tue' },
                    { value: 234, date: 'Wed' },
                    { value: 135, date: 'Thu' },
                    { value: 1548, date: 'Fri' },
                    { value: 1548, date: 'Sat' },
                    { value: 1548, date: 'Sun' }
                ]
            },
            {
                name: '邮件营销',
                data: [
                    { value: 335, date: 'Mon' },
                    { value: 310, date: 'Tue' },
                    { value: 234, date: 'Wed' },
                    { value: 135, date: 'Thu' },
                    { value: 1548, date: 'Fri' },
                    { value: 1548, date: 'Sat' },
                    { value: 1548, date: 'Sun' }
                ]
            }
        ]
    }
}
</script>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import * as echarts from 'echarts'

import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';

const props = defineProps({
    options: {
        type: LineChartsOptions,
        default: new LineChartsOptions()
    }
})

const options = ref({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        orient: 'vertical',
        right: 0
    },
    // set grid
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    // zoom
    dataZoom: [
        {
            type: 'inside',
            start: 0,
            end: 100
        },
        {
            start: 0,
            end: 10
        }
    ],
    // set x axis
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    // set y axis
    yAxis: {
        type: 'value'
    },
    // set series
    series: []
});

const charts = ref(null)
let echart_instance:any = null

watch(props, () => {
    options.value.title.text = props.options.title
    options.value.legend.data = props.options.data.map(item => item.name)
    options.value.xAxis.data = props.options.data[0].data.map(item => item.date)
    options.value.series = props.options.data.map(item => {
        return {
            name: item.name,
            type: 'line',
            data: item.data.map(item => item.value)
        }
    })

    if (echart_instance) echart_instance.setOption(options.value)
}, { deep: true, immediate: true })

onMounted(() => {
    echart_instance = echarts.init(charts.value, 'theme')
    echart_instance.setOption(options.value)
})

</script>
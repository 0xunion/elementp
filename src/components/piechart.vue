<template>
    <div ref="charts"></div>
</template>

<script lang="ts">
export class PieChartsOptions {
    title: string
    data: {
        value: number
        name: string
    }[]

    constructor() {
        this.title = 'ECharts 入门示例'
        this.data = [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
        ]
    }
}
</script>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import * as echarts from 'echarts'

import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';

const props = defineProps({
    options: {
        type: PieChartsOptions,
        default: new PieChartsOptions()
    }
})

const options = ref({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        orient: 'vertical',
        right: 0
    },
    // set grid
    series: [{
        type: 'pie',
        // set radius
        radius: '55%',
        // set center
        center : ['40%', '60%'],
        data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
        ]
    }],
});

const charts = ref(null)
const echart_instance = ref(null)

watch(props, () => {
    options.value.title.text = props.options.title
    options.value.series[0].data = props.options.data
    options.value.legend.data = props.options.data.map((item: any) => {
        return item.name
    })

    if (echart_instance.value) {
        echart_instance.value.setOption(options.value)
    }
    
}, { deep: true, immediate: true })

onMounted(() => {
    echart_instance.value = echarts.init(charts.value, 'theme')
    echart_instance.value.setOption(options.value)
})

</script>
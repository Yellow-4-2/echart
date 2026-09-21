<template>
  <DetailLayout
    title="抽检情况详情"
    :left-top="{ title: '年度抽检趋势', sub: '2018-2025', option: bigTrendOption }"
    :left-bottom-1="{ title: '线上抽检分布', sub: '各品类', option: onlinePieOption }"
    :left-bottom-2="{ title: '线下抽检分布', sub: '各品类', option: offlinePieOption }"
    :right-panels="[
      { title: '月度同比', sub: '线上 vs 线下', option: yoyBarOption },
      { title: '合格率趋势', sub: '近12月', option: passLineOption },
      { title: '问题类型分布', sub: 'TOP10', option: issueBarOption },
      { title: '抽检区域排行', sub: 'TOP10', option: regionRankOption }
    ]"
  />
</template>

<script setup lang="ts">
import DetailLayout from '../components/DetailLayout.vue'
import type { EChartsOption } from 'echarts'

const gridBase = { top: 40, right: 20, bottom: 30, left: 45 }
const tooltip = {
  backgroundColor: 'rgba(8,20,50,0.92)', borderColor: '#36d1dc', borderWidth: 1,
  textStyle: { color: '#c9d8ff', fontSize: 12 }
}
const darkAxis = {
  axisLine: { lineStyle: { color: '#1f3a7a' } },
  axisLabel: { color: '#8aa4d6', fontSize: 11 }, axisTick: { show: false }
}
const darkY = { axisLine: { show: false }, axisLabel: { color: '#8aa4d6', fontSize: 11 },
  splitLine: { lineStyle: { color: 'rgba(31,58,122,0.25)', type: 'dashed' as const } }
}

// 大图：7年柱状+折线
const bigTrendOption: EChartsOption = {
  grid: gridBase, tooltip: { ...tooltip, trigger: 'axis' },
  legend: { top: 4, right: 10, textStyle: { color: '#8aa4d6', fontSize: 11 }, itemWidth: 10, itemHeight: 10 },
  xAxis: { type: 'category', data: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'], ...darkAxis },
  yAxis: [
    { type: 'value', name: '万件', ...darkY },
    { type: 'value', name: '环比%', min: 0, max: 150, ...darkY, splitLine: { show: false } }
  ],
  series: [
    { name: '线上', type: 'bar', barWidth: '14%', data: [1200, 1800, 2100, 2500, 2200, 2800, 3100],
      itemStyle: { borderRadius: [4,4,0,0], color: { type:'linear', x:0,y:0,x2:0,y2:1,
        colorStops:[{offset:0,color:'#5ff2ff'},{offset:1,color:'#1a73c2'}] } } },
    { name: '线下', type: 'bar', barWidth: '14%', data: [900, 1200, 1000, 1400, 1100, 1350, 1500],
      itemStyle: { borderRadius: [4,4,0,0], color: { type:'linear', x:0,y:0,x2:0,y2:1,
        colorStops:[{offset:0,color:'#ffb38e'},{offset:1,color:'#d96a3a'}] } } },
    { name: '线上环比', type: 'line', yAxisIndex: 1, smooth: true, symbol: 'circle', symbolSize: 6,
      data: [0, 50, 70, 95, 80, 110, 125],
      lineStyle: { color: '#4ade80', width: 2, shadowColor: 'rgba(74,222,128,0.6)', shadowBlur: 8 },
      itemStyle: { color: '#4ade80', borderColor: '#0b1b3a', borderWidth: 1.5 } },
    { name: '线下环比', type: 'line', yAxisIndex: 1, smooth: true, symbol: 'circle', symbolSize: 6,
      data: [0, 40, 60, 75, 65, 80, 90],
      lineStyle: { color: '#f7b733', width: 2, shadowColor: 'rgba(247,183,51,0.6)', shadowBlur: 8 },
      itemStyle: { color: '#f7b733', borderColor: '#0b1b3a', borderWidth: 1.5 } }
  ]
}

const onlinePieOption: EChartsOption = {
  tooltip: { ...tooltip, trigger: 'item' },
  series: [{ type: 'pie', radius: ['35%','60%'], center:['50%','50%'],
    label: { formatter: '{b}\n{d}%', color:'#c9d8ff', fontSize: 10 },
    data: [
      { value: 35, name: '服装鞋包', itemStyle:{color:'#5ff2ff'} },
      { value: 25, name: '食品饮料', itemStyle:{color:'#36d1dc'} },
      { value: 20, name: '家居用品', itemStyle:{color:'#4ade80'} },
      { value: 12, name: '数码家电', itemStyle:{color:'#a78bfa'} },
      { value: 8, name: '美妆个护', itemStyle:{color:'#ff6fa5'} }
    ]
  }]
}
const offlinePieOption: EChartsOption = {
  tooltip: { ...tooltip, trigger: 'item' },
  series: [{ type: 'pie', radius: ['35%','60%'], center:['50%','50%'],
    label: { formatter: '{b}\n{d}%', color:'#c9d8ff', fontSize: 10 },
    data: [
      { value: 30, name: '服装鞋包', itemStyle:{color:'#ffb38e'} },
      { value: 28, name: '食品饮料', itemStyle:{color:'#f7b733'} },
      { value: 22, name: '家居用品', itemStyle:{color:'#ff8a5b'} },
      { value: 13, name: '数码家电', itemStyle:{color:'#ff4d6d'} },
      { value: 7, name: '美妆个护', itemStyle:{color:'#ff6fa5'} }
    ]
  }]
}

const yoyBarOption: EChartsOption = {
  grid: gridBase, tooltip: { ...tooltip, trigger: 'axis' },
  legend: { top: 4, right: 10, textStyle: { color: '#8aa4d6', fontSize: 11 }, itemWidth: 10, itemHeight: 10 },
  xAxis: { type: 'category', data: ['1月','2月','3月','4月','5月','6月'], ...darkAxis },
  yAxis: { type: 'value', ...darkY },
  series: [
    { name: '线上同比', type: 'bar', barWidth: '30%', data: [5, 12, 8, 15, 20, 18],
      itemStyle: { borderRadius:[3,3,0,0], color:'#5ff2ff' } },
    { name: '线下同比', type: 'bar', barWidth: '30%', data: [3, 8, 6, 10, 14, 12],
      itemStyle: { borderRadius:[3,3,0,0], color:'#ffb38e' } }
  ]
}
const passLineOption: EChartsOption = {
  grid: gridBase, tooltip: { ...tooltip, trigger: 'axis' },
  xAxis: { type: 'category', boundaryGap:false, data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], ...darkAxis },
  yAxis: { type: 'value', min: 85, max: 100, ...darkY },
  series: [{ type: 'line', smooth: true, symbol:'circle', symbolSize: 6, name:'合格率%',
    data: [92, 93, 91, 94, 95, 93, 96, 97, 95, 96, 97, 98],
    lineStyle: { color:'#4ade80', width:2.5, shadowColor:'rgba(74,222,128,0.6)', shadowBlur:8 },
    itemStyle: { color:'#4ade80', borderColor:'#fff', borderWidth:1 },
    areaStyle: { color:{ type:'linear',x:0,y:0,x2:0,y2:1, colorStops:[{offset:0,color:'rgba(74,222,128,0.35)'},{offset:1,color:'rgba(74,222,128,0.02)'}] } }
  }]
}
const issueBarOption: EChartsOption = {
  grid: { top: 10, right: 20, bottom: 14, left: 80 },
  tooltip: { ...tooltip, trigger: 'axis', axisPointer:{ type:'shadow' } },
  xAxis: { type: 'value', show:false, ...darkAxis },
  yAxis: { type: 'category', inverse:true,
    data: ['材质问题','标签不合规','虚标成分','功能失效','安全隐患','色差问题','异味问题','缺斤少两','包装破损','其他'],
    axisLine:{show:false}, axisTick:{show:false}, axisLabel:{color:'#8aa4d6', fontSize:11} },
  series: [{ type:'bar', barWidth:12,
    data: [180,150,130,110,95,80,65,50,40,30],
    itemStyle: { borderRadius:[0,4,4,0],
      color:{ type:'linear',x:0,y:0,x2:1,y2:0, colorStops:[{offset:0,color:'#ff4d6d'},{offset:1,color:'#ff8a5b'}] }
    },
    label: { show:true, position:'right', formatter:'{c}', color:'#c9d8ff', fontSize:11, fontWeight:700 }
  }]
}
const regionRankOption: EChartsOption = {
  grid: { top: 10, right: 40, bottom: 14, left: 60 },
  tooltip: { ...tooltip, trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'value', show: false, ...darkAxis },
  yAxis: { type: 'category', inverse: true,
    data: ['上海', '北京', '杭州', '广州', '深圳', '成都', '武汉', '西安', '南京', '重庆'],
    axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#8aa4d6', fontSize: 11 } },
  series: [{ type: 'bar', barWidth: 12,
    data: [295, 260, 245, 220, 210, 160, 140, 120, 100, 85],
    itemStyle: { borderRadius: [0, 4, 4, 0],
      color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
        colorStops: [{ offset: 0, color: '#36d1dc' }, { offset: 1, color: '#ff4d6d' }] } },
    label: { show: true, position: 'right', formatter: '{c}', color: '#c9d8ff', fontSize: 11, fontWeight: 700 }
  }]
}
</script>

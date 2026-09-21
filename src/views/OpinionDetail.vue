<template>
  <DetailLayout
    title="舆情数据分布详情"
    :left-top="{ title: '舆情情感趋势', sub: '2018-2025', option: sentimentOption }"
    :left-bottom-1="{ title: '正面/中性/负面占比', sub: '实时', option: pieOption }"
    :left-bottom-2="{ title: '渠道来源分布', sub: '近一年', option: channelOption }"
    :right-panels="[
      { title: '月度舆情量', sub: '近12月', option: monthlyOption },
      { title: '热点话题TOP10', sub: '近一周', option: topicOption },
      { title: '品牌舆情排行', sub: '热度', option: brandOption },
      { title: '舆情预警等级', sub: '实时', option: alertOption }
    ]"
  />
</template>

<script setup lang="ts">
import DetailLayout from '../components/DetailLayout.vue'
import type { EChartsOption } from 'echarts'

const g = { top: 40, right: 20, bottom: 30, left: 45 }
const t = { backgroundColor:'rgba(8,20,50,0.92)', borderColor:'#36d1dc', borderWidth:1, textStyle:{ color:'#c9d8ff', fontSize:12 } }
const a = { axisLine:{ lineStyle:{ color:'#1f3a7a' } }, axisLabel:{ color:'#8aa4d6', fontSize:11 }, axisTick:{ show:false } }
const ay = { axisLine:{ show:false }, axisLabel:{ color:'#8aa4d6', fontSize:11 }, splitLine:{ lineStyle:{ color:'rgba(31,58,122,0.25)', type:'dashed' as const } } }

const sentimentOption: EChartsOption = {
  grid: g, tooltip:{ ...t, trigger:'axis' },
  legend:{ top:4, right:10, textStyle:{ color:'#8aa4d6', fontSize:11 }, itemWidth:10, itemHeight:10, icon:'circle' },
  xAxis:{ type:'category', boundaryGap:false, data:['2018','2019','2020','2021','2022','2023','2024'], ...a },
  yAxis:{ type:'value', name:'占比%', min:0, max:60, ...ay },
  series:[
    { name:'正面', type:'line', smooth:true, symbol:'circle', symbolSize:7,
      data:[10,12,14,13,15,16,18],
      lineStyle:{ color:'#4ade80', width:2.5, shadowColor:'rgba(74,222,128,0.6)', shadowBlur:8 },
      itemStyle:{ color:'#4ade80', borderColor:'#0b1b3a', borderWidth:1.5 },
      areaStyle:{ color:{ type:'linear', x:0,y:0,x2:0,y2:1,
        colorStops:[{offset:0,color:'rgba(74,222,128,0.35)'},{offset:1,color:'rgba(74,222,128,0.02)'}] } } },
    { name:'中性', type:'line', smooth:true, symbol:'circle', symbolSize:7,
      data:[45,46,48,49,50,48,49],
      lineStyle:{ color:'#f7b733', width:2.5, shadowColor:'rgba(247,183,51,0.6)', shadowBlur:8 },
      itemStyle:{ color:'#f7b733', borderColor:'#0b1b3a', borderWidth:1.5 },
      areaStyle:{ color:{ type:'linear', x:0,y:0,x2:0,y2:1,
        colorStops:[{offset:0,color:'rgba(247,183,51,0.32)'},{offset:1,color:'rgba(247,183,51,0.02)'}] } } },
    { name:'负面', type:'line', smooth:true, symbol:'circle', symbolSize:7,
      data:[45,42,38,38,35,36,33],
      lineStyle:{ color:'#ff4d6d', width:2.5, shadowColor:'rgba(255,77,109,0.6)', shadowBlur:8 },
      itemStyle:{ color:'#ff4d6d', borderColor:'#0b1b3a', borderWidth:1.5 },
      areaStyle:{ color:{ type:'linear', x:0,y:0,x2:0,y2:1,
        colorStops:[{offset:0,color:'rgba(255,77,109,0.35)'},{offset:1,color:'rgba(255,77,109,0.02)'}] } } }
  ]
}

const pieOption: EChartsOption = {
  tooltip:{ ...t, trigger:'item', formatter:'{b}: {d}%' },
  series:[{ type:'pie', radius:['35%','62%'], center:['50%','50%'],
    label:{ formatter:'{b}\n{d}%', color:'#c9d8ff', fontSize:11 },
    data:[
      { value:13.91, name:'正面', itemStyle:{ color:'#4ade80' } },
      { value:49.13, name:'中性', itemStyle:{ color:'#f7b733' } },
      { value:36.96, name:'负面', itemStyle:{ color:'#ff4d6d' } }
    ]
  }]
}
const channelOption: EChartsOption = {
  grid: { top:10, right:20, bottom:14, left:70 },
  tooltip:{ ...t, trigger:'axis', axisPointer:{ type:'shadow' } },
  xAxis:{ type:'value', show:false, ...a },
  yAxis:{ type:'category', inverse:true,
    data:['微博','微信','抖音','小红书','B站','知乎','贴吧','其他'],
    axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'#8aa4d6', fontSize:11 } },
  series:[{ type:'bar', barWidth:12,
    data:[320,280,250,220,180,140,100,80],
    itemStyle:{ borderRadius:[0,4,4,0], color:{ type:'linear',x:0,y:0,x2:1,y2:0,
      colorStops:[{offset:0,color:'#36d1dc'},{offset:1,color:'#a78bfa'}] } },
    label:{ show:true, position:'right', formatter:'{c}', color:'#c9d8ff', fontSize:11, fontWeight:700 }
  }]
}

const monthlyOption: EChartsOption = {
  grid: g, tooltip:{ ...t, trigger:'axis' },
  xAxis:{ type:'category', data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], ...a },
  yAxis:{ type:'value', ...ay },
  series:[{ type:'bar', barWidth:'40%', data:[850,720,900,980,1050,1120,1200,1150,1080,980,920,880],
    itemStyle:{ borderRadius:[4,4,0,0], color:{ type:'linear',x:0,y:0,x2:0,y2:1,
      colorStops:[{offset:0,color:'#5ff2ff'},{offset:1,color:'#1a73c2'}] } } }]
}
const topicOption: EChartsOption = {
  grid:{ top:10, right:40, bottom:14, left:100 },
  tooltip:{ ...t, trigger:'axis', axisPointer:{ type:'shadow' } },
  xAxis:{ type:'value', show:false, ...a },
  yAxis:{ type:'category', inverse:true,
    data:['价格虚标','虚假宣传','货不对板','售后推诿','假货问题','发货延迟','退货难','质量瑕疵','安全隐患','其他'],
    axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'#8aa4d6', fontSize:10 } },
  series:[{ type:'bar', barWidth:10,
    data:[95,88,80,75,70,62,55,48,40,30],
    itemStyle:{ borderRadius:[0,3,3,0], color:{ type:'linear',x:0,y:0,x2:1,y2:0,
      colorStops:[{offset:0,color:'#ff6fa5'},{offset:1,color:'#ff4d6d'}] } },
    label:{ show:true, position:'right', formatter:'{c}°', color:'#c9d8ff', fontSize:10 }
  }]
}
const brandOption: EChartsOption = {
  tooltip:{ ...t, trigger:'axis' },
  grid: g,
  xAxis:{ type:'category', data:['品牌A','品牌B','品牌C','品牌D','品牌E','品牌F','品牌G','品牌H','品牌I','品牌J'], ...a },
  yAxis:{ type:'value', name:'热度', ...ay },
  series:[{ type:'bar', barWidth:'45%',
    data:[320,280,250,220,180,150,120,100,80,60],
    itemStyle:{ borderRadius:[4,4,0,0], color:{ type:'linear',x:0,y:0,x2:0,y2:1,
      colorStops:[{offset:0,color:'#f7b733'},{offset:1,color:'#d99a1a'}] } } }]
}
const alertOption: EChartsOption = {
  tooltip:{ ...t, trigger:'item' },
  series:[{ type:'pie', radius:['0%','65%'], center:['50%','50%'], label:{ show:true, color:'#c9d8ff', fontSize:11 },
    data:[
      { value:5, name:'红色预警', itemStyle:{ color:'#ff4d6d' } },
      { value:12, name:'橙色预警', itemStyle:{ color:'#ff8a5b' } },
      { value:28, name:'黄色预警', itemStyle:{ color:'#f7b733' } },
      { value:55, name:'蓝色预警', itemStyle:{ color:'#36d1dc' } }
    ]
  }]
}
</script>

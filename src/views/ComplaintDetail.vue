<template>
  <DetailLayout
    title="消费投诉详情"
    :left-top="{ title: '投诉趋势分析', sub: '2017-2024', option: trendOption }"
    :left-bottom-1="{ title: '投诉类型占比', sub: '近一年', option: typePieOption }"
    :left-bottom-2="{ title: '处理时效分布', sub: '各环节', option: processBarOption }"
    :right-panels="[
      { title: '月度投诉量', sub: '近12月', option: monthlyBarOption },
      { title: '受理/处置率', sub: '趋势', option: rateLineOption },
      { title: '热门投诉词云', sub: 'TOP', option: hotWordOption },
      { title: '区域投诉排行', sub: 'TOP10', option: regionRankOption }
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

const trendOption: EChartsOption = {
  grid: g, tooltip: { ...t, trigger:'axis' }, legend: { top:4, right:10, textStyle:{ color:'#8aa4d6', fontSize:11 }, itemWidth:8, itemHeight:8, icon:'circle' },
  xAxis: { type:'category', boundaryGap:false, data:['2017','2018','2019','2020','2021','2022','2023','2024'], ...a },
  yAxis: { type:'value', name:'万件', ...ay },
  series: [
    { name:'投诉量', type:'line', smooth:true, symbol:'circle', symbolSize:7, data:[5,15,30,60,95,120,145,160],
      lineStyle:{ color:'#ff6fa5', width:2.5, shadowColor:'rgba(255,111,165,0.6)', shadowBlur:8 },
      itemStyle:{ color:'#ff6fa5', borderColor:'#fff', borderWidth:1.5 },
      areaStyle:{ color:{ type:'linear',x:0,y:0,x2:0,y2:1, colorStops:[{offset:0,color:'rgba(255,111,165,0.45)'},{offset:1,color:'rgba(255,111,165,0.02)'}] } } },
    { name:'受理量', type:'line', smooth:true, symbol:'circle', symbolSize:7, data:[4,12,25,50,85,105,130,145],
      lineStyle:{ color:'#36d1dc', width:2.5, shadowColor:'rgba(54,209,220,0.6)', shadowBlur:8 },
      itemStyle:{ color:'#36d1dc', borderColor:'#fff', borderWidth:1.5 },
      areaStyle:{ color:{ type:'linear',x:0,y:0,x2:0,y2:1, colorStops:[{offset:0,color:'rgba(54,209,220,0.4)'},{offset:1,color:'rgba(54,209,220,0.02)'}] } } },
    { name:'处置量', type:'line', smooth:true, symbol:'circle', symbolSize:7, data:[2,8,18,40,70,90,115,130],
      lineStyle:{ color:'#ffb38e', width:2.5, shadowColor:'rgba(255,179,142,0.6)', shadowBlur:8 },
      itemStyle:{ color:'#ffb38e', borderColor:'#fff', borderWidth:1.5 },
      areaStyle:{ color:{ type:'linear',x:0,y:0,x2:0,y2:1, colorStops:[{offset:0,color:'rgba(255,179,142,0.35)'},{offset:1,color:'rgba(255,179,142,0.02)'}] } } }
  ]
}

const typePieOption: EChartsOption = {
  tooltip: { ...t, trigger:'item' },
  series: [{ type:'pie', radius:['32%','58%'], center:['50%','50%'], roseType:'radius',
    label:{ formatter:'{b}\n{d}%', color:'#c9d8ff', fontSize:10 },
    data:[
      { value:35, name:'虚假宣传', itemStyle:{ color:'#ff4d6d' } },
      { value:28, name:'质量问题', itemStyle:{ color:'#ff8a5b' } },
      { value:22, name:'售后纠纷', itemStyle:{ color:'#f7b733' } },
      { value:15, name:'价格欺诈', itemStyle:{ color:'#36d1dc' } },
      { value:10, name:'其他', itemStyle:{ color:'#5ff2ff' } }
    ]
  }]
}

const processBarOption: EChartsOption = {
  grid: g, tooltip: { ...t, trigger:'axis' },
  xAxis: { type:'category', data:['接收','分派','核实','调解','结案'], ...a },
  yAxis: { type:'value', name:'小时', ...ay },
  series: [{ type:'bar', barWidth:'35%', data:[2,8,24,48,12],
    itemStyle:{ borderRadius:[4,4,0,0], color:{ type:'linear',x:0,y:0,x2:0,y2:1,
      colorStops:[{offset:0,color:'#a78bfa'},{offset:1,color:'#6c4ad8'}] } },
    label:{ show:true, position:'top', formatter:'{c}h', color:'#c9d8ff', fontSize:11, fontWeight:700 }
  }]
}

const monthlyBarOption: EChartsOption = {
  grid: g, tooltip: { ...t, trigger:'axis' },
  xAxis: { type:'category', data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], ...a },
  yAxis: { type:'value', ...ay },
  series: [{ type:'bar', barWidth:'45%', data:[120,98,135,150,168,180,195,210,185,170,155,140],
    itemStyle:{ borderRadius:[4,4,0,0], color:{ type:'linear',x:0,y:0,x2:0,y2:1,
      colorStops:[{offset:0,color:'#ff6fa5'},{offset:1,color:'#ff4d6d'}] } } }]
}
const rateLineOption: EChartsOption = {
  grid: g, tooltip: { ...t, trigger:'axis' }, legend:{ top:4, right:10, textStyle:{ color:'#8aa4d6', fontSize:11 }, itemWidth:8, itemHeight:8 },
  xAxis: { type:'category', boundaryGap:false, data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], ...a },
  yAxis: { type:'value', min:80, max:100, name:'%', ...ay },
  series: [
    { name:'受理率', type:'line', smooth:true, symbol:'circle', symbolSize:5, data:[90,92,91,93,94,95,96,95,94,95,96,97],
      lineStyle:{ color:'#36d1dc', width:2 }, itemStyle:{ color:'#36d1dc' } },
    { name:'处置率', type:'line', smooth:true, symbol:'circle', symbolSize:5, data:[75,78,80,82,84,85,86,87,86,88,89,90],
      lineStyle:{ color:'#4ade80', width:2 }, itemStyle:{ color:'#4ade80' } }
  ]
}
const hotWordOption: EChartsOption = {
  tooltip: { ...t },
  series: [{ type:'pie', radius:['0%','70%'], center:['50%','50%'], label:{ show:true, color:'#c9d8ff', fontSize:12 },
    itemStyle:{ borderColor:'rgba(8,18,45,0.8)', borderWidth:2 },
    data:[
      { value:400, name:'退款难', itemStyle:{ color:'#ff4d6d' } },
      { value:320, name:'假货', itemStyle:{ color:'#ff8a5b' } },
      { value:280, name:'发货慢', itemStyle:{ color:'#f7b733' } },
      { value:220, name:'质量差', itemStyle:{ color:'#a78bfa' } },
      { value:180, name:'客服不理', itemStyle:{ color:'#36d1dc' } },
      { value:140, name:'运费争议', itemStyle:{ color:'#5ff2ff' } },
      { value:100, name:'价格波动', itemStyle:{ color:'#4ade80' } },
      { value:80, name:'其他', itemStyle:{ color:'#8aa4d6' } }
    ]
  }]
}
const regionRankOption: EChartsOption = {
  grid: { top:10, right:30, bottom:14, left:60 },
  tooltip: { ...t, trigger:'axis', axisPointer:{ type:'shadow' } },
  xAxis: { type:'value', show:false, ...a },
  yAxis: { type:'category', inverse:true,
    data:['杭州','上海','北京','广州','深圳','成都','武汉','西安','南京','重庆'],
    axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'#8aa4d6', fontSize:11 } },
  series: [{ type:'bar', barWidth:12,
    data:[320,290,270,250,230,180,160,140,120,100],
    itemStyle:{ borderRadius:[0,4,4,0], color:{ type:'linear',x:0,y:0,x2:1,y2:0,
      colorStops:[{offset:0,color:'#ff6fa5'},{offset:1,color:'#36d1dc'}] } },
    label:{ show:true, position:'right', formatter:'{c}', color:'#c9d8ff', fontSize:11, fontWeight:700 }
  }]
}
</script>

<template>
  <DetailLayout
    title="产品召回详情"
    :left-top="{ title: '召回统计总览', sub: '年度趋势', option: trendOption }"
    :left-bottom-single="{ title: '产品召回列表', sub: '实时更新', comp: ProductRecall }"
    :right-panels="[
      { title: '召回原因分布', sub: 'TOP', option: reasonOption },
      { title: '召回品类占比', sub: '近一年', option: categoryOption },
      { title: '月度召回量', sub: '近12月', option: monthlyOption },
      { title: '涉事企业排行', sub: 'TOP10', option: companyOption }
    ]"
  />
</template>

<script setup lang="ts">
import DetailLayout from '../components/DetailLayout.vue'
import ProductRecall from '../components/ProductRecall.vue'
import type { EChartsOption } from 'echarts'

const g = { top: 40, right: 20, bottom: 30, left: 45 }
const t = { backgroundColor:'rgba(8,20,50,0.92)', borderColor:'#36d1dc', borderWidth:1, textStyle:{ color:'#c9d8ff', fontSize:12 } }
const a = { axisLine:{ lineStyle:{ color:'#1f3a7a' } }, axisLabel:{ color:'#8aa4d6', fontSize:11 }, axisTick:{ show:false } }
const ay = { axisLine:{ show:false }, axisLabel:{ color:'#8aa4d6', fontSize:11 }, splitLine:{ lineStyle:{ color:'rgba(31,58,122,0.25)', type:'dashed' as const } } }

const trendOption: EChartsOption = {
  grid: g, tooltip: { ...t, trigger:'axis' },
  legend:{ top:4, right:10, textStyle:{ color:'#8aa4d6', fontSize:11 }, itemWidth:10, itemHeight:10 },
  xAxis: { type:'category', data:['2019','2020','2021','2022','2023','2024'], ...a },
  yAxis: [ { type:'value', name:'起数', ...ay }, { type:'value', name:'件数(万)', ...ay, splitLine:{ show:false } } ],
  series: [
    { name:'召回起数', type:'bar', barWidth:'16%', data:[120,145,180,210,250,280],
      itemStyle:{ borderRadius:[4,4,0,0], color:'#ff4d6d' } },
    { name:'涉及企业', type:'bar', barWidth:'16%', data:[85,100,130,155,180,200],
      itemStyle:{ borderRadius:[4,4,0,0], color:'#f7b733' } },
    { name:'召回数量(万)', type:'line', yAxisIndex:1, smooth:true, symbol:'circle', symbolSize:6,
      data:[15,22,35,48,62,75], lineStyle:{ color:'#36d1dc', width:2 }, itemStyle:{ color:'#36d1dc' } }
  ]
}

const reasonOption: EChartsOption = {
  tooltip: { ...t, trigger:'item' },
  series:[{ type:'pie', radius:['30%','55%'], roseType:'area', center:['50%','50%'],
    label:{ formatter:'{b}\n{c}起', color:'#c9d8ff', fontSize:10 },
    data:[
      { value:65, name:'安全隐患', itemStyle:{ color:'#ff4d6d' } },
      { value:50, name:'质量缺陷', itemStyle:{ color:'#ff8a5b' } },
      { value:40, name:'虚假宣传', itemStyle:{ color:'#f7b733' } },
      { value:28, name:'不达标', itemStyle:{ color:'#a78bfa' } },
      { value:22, name:'设计问题', itemStyle:{ color:'#36d1dc' } },
      { value:15, name:'其他', itemStyle:{ color:'#5ff2ff' } }
    ]
  }]
}
const categoryOption: EChartsOption = {
  tooltip:{ ...t, trigger:'item' },
  series:[{ type:'pie', radius:['32%','60%'], center:['50%','50%'],
    label:{ formatter:'{b}\n{d}%', color:'#c9d8ff', fontSize:10 },
    data:[
      { value:32, name:'电子电器', itemStyle:{ color:'#ff4d6d' } },
      { value:25, name:'食品饮料', itemStyle:{ color:'#f7b733' } },
      { value:18, name:'儿童用品', itemStyle:{ color:'#36d1dc' } },
      { value:12, name:'汽车配件', itemStyle:{ color:'#a78bfa' } },
      { value:8, name:'家居用品', itemStyle:{ color:'#4ade80' } },
      { value:5, name:'其他', itemStyle:{ color:'#8aa4d6' } }
    ]
  }]
}
const monthlyOption: EChartsOption = {
  grid: g, tooltip:{ ...t, trigger:'axis' },
  xAxis:{ type:'category', data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], ...a },
  yAxis:{ type:'value', ...ay },
  series:[{ type:'bar', barWidth:'40%', data:[18,15,22,25,28,32,35,30,26,24,20,22],
    itemStyle:{ borderRadius:[4,4,0,0], color:{ type:'linear',x:0,y:0,x2:0,y2:1,
      colorStops:[{offset:0,color:'#ff4d6d'},{offset:1,color:'#8a1a3a'}] } } }]
}
const companyOption: EChartsOption = {
  grid:{ top:10, right:40, bottom:14, left:80 },
  tooltip:{ ...t, trigger:'axis', axisPointer:{ type:'shadow' } },
  xAxis:{ type:'value', show:false, ...a },
  yAxis:{ type:'category', inverse:true,
    data:['XX电子','YY食品','ZZ家居','AA母婴','BB数码','CC汽车','DD美妆','EE服饰','FF玩具','GG家电'],
    axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'#8aa4d6', fontSize:11 } },
  series:[{ type:'bar', barWidth:12,
    data:[45,38,32,28,25,22,20,18,15,12],
    itemStyle:{ borderRadius:[0,4,4,0], color:{ type:'linear',x:0,y:0,x2:1,y2:0,
      colorStops:[{offset:0,color:'#ff4d6d'},{offset:1,color:'#f7b733'}] } },
    label:{ show:true, position:'right', formatter:'{c}起', color:'#c9d8ff', fontSize:10 }
  }]
}
</script>

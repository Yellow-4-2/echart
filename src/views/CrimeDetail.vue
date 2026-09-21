<template>
  <DetailLayout
    title="违法信息详情"
    :left-top="{ title: '违法类型总览', sub: '横向排行', option: mainBarOption }"
    :left-bottom-1="{ title: '月度违法趋势', sub: '近12月', option: monthlyOption }"
    :left-bottom-2="{ title: '违法类型占比', sub: '实时', option: typePieOption }"
    :right-panels="[
      { title: '虚假宣传分析', sub: 'TOP', option: xuanchuanOption },
      { title: '贬低他人案例', sub: 'TOP10', option: biedeOption },
      { title: '专利违规明细', sub: '近一年', option: zhuanliOption },
      { title: '使用极限词统计', sub: 'TOP', option: jixianOption }
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

// 主图：横向条形图 (首页同款但更详细)
const mainBarOption: EChartsOption = {
  grid:{ top:10, right:60, bottom:14, left:100 },
  tooltip:{ ...t, trigger:'axis', axisPointer:{ type:'shadow' } },
  xAxis:{ type:'value', max:620, axisLine:{ show:false }, axisLabel:{ color:'#8aa4d6', fontSize:11 }, splitLine:{ lineStyle:{ color:'rgba(31,58,122,0.2)', type:'dashed' as const } } },
  yAxis:{ type:'category', inverse:true,
    data:['虚假宣传','贬低他人','专利违规','使用极限词','虚假抢购','价格欺诈','质量问题','售后纠纷','发货延迟','其他'],
    axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'#c9d8ff', fontSize:12 } },
  series:[{ type:'bar', barWidth:16,
    data:[
      { value:567, itemStyle:{ color:{ type:'linear',x:0,y:0,x2:1,y2:0, colorStops:[{offset:0,color:'#ff4d6d'},{offset:1,color:'#d96a3a'}] }, borderRadius:[0,4,4,0], shadowColor:'#d96a3a', shadowBlur:8 } },
      { value:30, itemStyle:{ color:{ type:'linear',x:0,y:0,x2:1,y2:0, colorStops:[{offset:0,color:'#f7b733'},{offset:1,color:'#d99a1a'}] }, borderRadius:[0,4,4,0] } },
      { value:27, itemStyle:{ color:{ type:'linear',x:0,y:0,x2:1,y2:0, colorStops:[{offset:0,color:'#36d1dc'},{offset:1,color:'#1a73c2'}] }, borderRadius:[0,4,4,0] } },
      { value:19, itemStyle:{ color:{ type:'linear',x:0,y:0,x2:1,y2:0, colorStops:[{offset:0,color:'#a78bfa'},{offset:1,color:'#6c4ad8'}] }, borderRadius:[0,4,4,0] } },
      { value:11, itemStyle:{ color:{ type:'linear',x:0,y:0,x2:1,y2:0, colorStops:[{offset:0,color:'#4ade80'},{offset:1,color:'#16a34a'}] }, borderRadius:[0,4,4,0] } },
      { value:9, itemStyle:{ color:'#5ff2ff', borderRadius:[0,4,4,0] } },
      { value:8, itemStyle:{ color:'#ff6fa5', borderRadius:[0,4,4,0] } },
      { value:7, itemStyle:{ color:'#ffb38e', borderRadius:[0,4,4,0] } },
      { value:5, itemStyle:{ color:'#8aa4d6', borderRadius:[0,4,4,0] } },
      { value:4, itemStyle:{ color:'#6b85b8', borderRadius:[0,4,4,0] } }
    ],
    label:{ show:true, position:'right', formatter:'{c}', color:'#c9d8ff', fontWeight:700, fontSize:14 }
  }]
}

const monthlyOption: EChartsOption = {
  grid: g, tooltip:{ ...t, trigger:'axis' },
  xAxis:{ type:'category', boundaryGap:false, data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], ...a },
  yAxis:{ type:'value', ...ay },
  series:[{ type:'line', smooth:true, symbol:'circle', symbolSize:6,
    data:[35,28,42,48,55,62,68,60,52,45,40,38],
    lineStyle:{ color:'#ff4d6d', width:2.5, shadowColor:'rgba(255,77,109,0.6)', shadowBlur:8 },
    itemStyle:{ color:'#ff4d6d', borderColor:'#fff', borderWidth:1.5 },
    areaStyle:{ color:{ type:'linear',x:0,y:0,x2:0,y2:1, colorStops:[{offset:0,color:'rgba(255,77,109,0.45)'},{offset:1,color:'rgba(255,77,109,0.02)'}] } }
  }]
}
const typePieOption: EChartsOption = {
  tooltip:{ ...t, trigger:'item' },
  series:[{ type:'pie', radius:['32%','58%'], center:['50%','50%'],
    label:{ formatter:'{b}\n{d}%', color:'#c9d8ff', fontSize:10 },
    data:[
      { value:567, name:'虚假宣传', itemStyle:{ color:'#ff4d6d' } },
      { value:30, name:'贬低他人', itemStyle:{ color:'#f7b733' } },
      { value:27, name:'专利违规', itemStyle:{ color:'#36d1dc' } },
      { value:19, name:'使用极限词', itemStyle:{ color:'#a78bfa' } },
      { value:11, name:'其他', itemStyle:{ color:'#4ade80' } }
    ]
  }]
}

const xuanchuanOption: EChartsOption = {
  grid:{ top:10, right:30, bottom:14, left:80 },
  tooltip:{ ...t, trigger:'axis', axisPointer:{ type:'shadow' } },
  xAxis:{ type:'value', show:false, ...a },
  yAxis:{ type:'category', inverse:true,
    data:['夸大功效','虚构荣誉','虚假承诺','伪造资质','暗示疗效','其他'],
    axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'#8aa4d6', fontSize:11 } },
  series:[{ type:'bar', barWidth:12,
    data:[220,150,100,60,30,7],
    itemStyle:{ borderRadius:[0,4,4,0], color:{ type:'linear',x:0,y:0,x2:1,y2:0,
      colorStops:[{offset:0,color:'#ff4d6d'},{offset:1,color:'#ff8a5b'}] } },
    label:{ show:true, position:'right', formatter:'{c}', color:'#c9d8ff', fontSize:11, fontWeight:700 }
  }]
}
const biedeOption: EChartsOption = {
  grid:{ top:10, right:30, bottom:14, left:80 },
  tooltip:{ ...t, trigger:'axis', axisPointer:{ type:'shadow' } },
  xAxis:{ type:'value', show:false, ...a },
  yAxis:{ type:'category', inverse:true,
    data:['品牌A','品牌B','品牌C','品牌D','品牌E','品牌F','品牌G','品牌H','品牌I','品牌J'],
    axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'#8aa4d6', fontSize:10 } },
  series:[{ type:'bar', barWidth:10,
    data:[8,6,5,4,3,2,2,2,1,1],
    itemStyle:{ borderRadius:[0,3,3,0], color:{ type:'linear',x:0,y:0,x2:1,y2:0,
      colorStops:[{offset:0,color:'#f7b733'},{offset:1,color:'#d99a1a'}] } }
  }]
}
const zhuanliOption: EChartsOption = {
  grid: g, tooltip:{ ...t, trigger:'axis' },
  legend:{ top:4, right:10, textStyle:{ color:'#8aa4d6', fontSize:11 }, itemWidth:8, itemHeight:8 },
  xAxis:{ type:'category', data:['实用新型','外观设计','发明专利','商标','版权'], ...a },
  yAxis:{ type:'value', ...ay },
  series:[
    { name:'侵权', type:'bar', barWidth:'25%', data:[8,6,5,4,3],
      itemStyle:{ borderRadius:[3,3,0,0], color:'#ff4d6d' } },
    { name:'假冒', type:'bar', barWidth:'25%', data:[5,7,3,4,2],
      itemStyle:{ borderRadius:[3,3,0,0], color:'#f7b733' } }
  ]
}
const jixianOption: EChartsOption = {
  tooltip:{ ...t, trigger:'item' },
  series:[{ type:'pie', radius:['0%','65%'], center:['50%','50%'], label:{ show:true, color:'#c9d8ff', fontSize:11 },
    data:[
      { value:45, name:'最', itemStyle:{ color:'#ff4d6d' } },
      { value:32, name:'第一', itemStyle:{ color:'#ff8a5b' } },
      { value:22, name:'国家级', itemStyle:{ color:'#f7b733' } },
      { value:18, name:'最高级', itemStyle:{ color:'#a78bfa' } },
      { value:12, name:'独家', itemStyle:{ color:'#36d1dc' } },
      { value:8, name:'其他', itemStyle:{ color:'#8aa4d6' } }
    ]
  }]
}
</script>

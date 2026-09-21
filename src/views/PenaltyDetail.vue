<template>
  <DetailLayout
    title="行政处罚详情"
    :left-top="{ title: '行政处罚年度趋势', sub: '2018-2024', option: trendOption }"
    :left-bottom-1="{ title: '处罚类型分布', sub: 'TOP', option: typePieOption }"
    :left-bottom-2="{ title: '处罚金额区间', sub: '万元', option: amountOption }"
    :right-panels="[
      { title: '月度处罚量', sub: '近12月', option: monthlyOption },
      { title: '违规主体排行', sub: 'TOP10', option: subjectOption },
      { title: '处罚结果占比', sub: '实时', option: resultOption },
      { title: '区域处罚排行', sub: 'TOP10', option: regionRankOption }
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
  grid: g, tooltip:{ ...t, trigger:'axis' },
  xAxis:{ type:'category', data:['2018','2019','2020','2021','2022','2023','2024'], ...a },
  yAxis:{ type:'value', name:'件', max:400, ...ay },
  series:[{ type:'bar', barWidth:'28%', data:[220,191,264,327,280,310,295],
    itemStyle:{ borderRadius:[8,8,0,0], color:(p: { dataIndex: number }) => {
      const colors = ['#8aa4d6','#a78bfa','#36d1dc','#ff6fa5','#4ade80','#5ff2ff','#f7b733']
      return { type:'linear',x:0,y:0,x2:0,y2:1, colorStops:[{offset:0,color:colors[p.dataIndex]},{offset:1,color:'rgba(8,18,45,0.05)'}] }
    }, shadowBlur:10 },
    label:{ show:true, position:'top', formatter:'{c}', color:'#c9d8ff', fontWeight:700, fontSize:12 }
  } as any]
}

const typePieOption: EChartsOption = {
  tooltip:{ ...t, trigger:'item' },
  series:[{ type:'pie', radius:['32%','58%'], center:['50%','50%'],
    label:{ formatter:'{b}\n{c}件', color:'#c9d8ff', fontSize:10 },
    data:[
      { value:120, name:'虚假宣传', itemStyle:{ color:'#ff4d6d' } },
      { value:95, name:'违反广告法', itemStyle:{ color:'#ff8a5b' } },
      { value:75, name:'质量不合格', itemStyle:{ color:'#f7b733' } },
      { value:55, name:'价格欺诈', itemStyle:{ color:'#a78bfa' } },
      { value:40, name:'食品安全', itemStyle:{ color:'#36d1dc' } },
      { value:30, name:'其他', itemStyle:{ color:'#5ff2ff' } }
    ]
  }]
}
const amountOption: EChartsOption = {
  grid: g, tooltip:{ ...t, trigger:'axis' },
  xAxis:{ type:'category', data:['<1万','1-5万','5-10万','10-50万','50-100万','>100万'], ...a },
  yAxis:{ type:'value', ...ay },
  series:[{ type:'bar', barWidth:'50%', data:[180,120,85,50,20,8],
    itemStyle:{ borderRadius:[4,4,0,0], color:{ type:'linear',x:0,y:0,x2:0,y2:1,
      colorStops:[{offset:0,color:'#a78bfa'},{offset:1,color:'#6c4ad8'}] } } }]
}

const monthlyOption: EChartsOption = {
  grid: g, tooltip:{ ...t, trigger:'axis' },
  xAxis:{ type:'category', data:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], ...a },
  yAxis:{ type:'value', ...ay },
  series:[{ type:'bar', barWidth:'40%', data:[28,22,32,35,38,42,45,40,35,32,28,25],
    itemStyle:{ borderRadius:[4,4,0,0], color:{ type:'linear',x:0,y:0,x2:0,y2:1,
      colorStops:[{offset:0,color:'#ff6fa5'},{offset:1,color:'#ff4d6d'}] } } }]
}
const subjectOption: EChartsOption = {
  grid:{ top:10, right:40, bottom:14, left:80 },
  tooltip:{ ...t, trigger:'axis', axisPointer:{ type:'shadow' } },
  xAxis:{ type:'value', show:false, ...a },
  yAxis:{ type:'category', inverse:true,
    data:['XX电商','YY品牌','ZZ平台','AA店铺','BB企业','CC机构','DD个人','EE微商','FF作坊','GG其他'],
    axisLine:{ show:false }, axisTick:{ show:false }, axisLabel:{ color:'#8aa4d6', fontSize:10 } },
  series:[{ type:'bar', barWidth:10,
    data:[55,45,38,32,28,22,18,15,12,8],
    itemStyle:{ borderRadius:[0,3,3,0], color:{ type:'linear',x:0,y:0,x2:1,y2:0,
      colorStops:[{offset:0,color:'#ff4d6d'},{offset:1,color:'#f7b733'}] } },
    label:{ show:true, position:'right', formatter:'{c}件', color:'#c9d8ff', fontSize:10 }
  }]
}
const resultOption: EChartsOption = {
  tooltip:{ ...t, trigger:'item' },
  series:[{ type:'pie', radius:['0%','65%'], center:['50%','50%'], label:{ show:true, color:'#c9d8ff', fontSize:11 },
    data:[
      { value:45, name:'罚款', itemStyle:{ color:'#ff4d6d' } },
      { value:25, name:'警告', itemStyle:{ color:'#f7b733' } },
      { value:18, name:'没收', itemStyle:{ color:'#a78bfa' } },
      { value:8, name:'停业整顿', itemStyle:{ color:'#36d1dc' } },
      { value:4, name:'吊销执照', itemStyle:{ color:'#4ade80' } }
    ]
  }]
}
const regionRankOption: EChartsOption = {
  grid: { top: 10, right: 40, bottom: 14, left: 60 },
  tooltip: { ...t, trigger: 'axis', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'value', show: false, ...a },
  yAxis: { type: 'category', inverse: true,
    data: ['上海', '北京', '杭州', '深圳', '广州', '成都', '武汉', '西安', '南京', '重庆'],
    axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: '#8aa4d6', fontSize: 11 } },
  series: [{ type: 'bar', barWidth: 12,
    data: [280, 250, 230, 210, 190, 140, 120, 100, 85, 70],
    itemStyle: { borderRadius: [0, 4, 4, 0],
      color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
        colorStops: [{ offset: 0, color: '#ff6fa5' }, { offset: 1, color: '#a78bfa' }] } },
    label: { show: true, position: 'right', formatter: '{c}件', color: '#c9d8ff', fontSize: 11, fontWeight: 700 }
  }]
}
</script>

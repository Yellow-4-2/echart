import type { EChartsOption } from 'echarts'

// 通用动画配置
const anim = {
  animationDuration: 1200,
  animationEasing: 'cubicOut' as const,
  animationDelay: (idx: number) => idx * 80
}

// 通用 axis 配置
const darkAxis = {
  axisLine: { lineStyle: { color: '#1f3a7a' } },
  axisLabel: { color: '#8aa4d6', fontSize: 11 },
  axisTick: { show: false }
}
const darkYAxis = {
  axisLine: { show: false },
  axisLabel: { color: '#8aa4d6', fontSize: 11 },
  splitLine: { lineStyle: { color: 'rgba(31, 58, 122, 0.25)', type: 'dashed' as const } }
}

// 通用 tooltip
const tooltip = {
  backgroundColor: 'rgba(8, 20, 50, 0.92)',
  borderColor: '#36d1dc',
  borderWidth: 1,
  textStyle: { color: '#c9d8ff', fontSize: 12 },
  extraCssText: 'box-shadow: 0 0 18px rgba(54, 209, 220, 0.35); backdrop-filter: blur(4px);'
}

const linearColor = (from: string, to: string) => ({
  type: 'linear' as const, x: 0, y: 0, x2: 0, y2: 1,
  colorStops: [{ offset: 0, color: from }, { offset: 1, color: to }]
})

/* ============================================================
   左栏 1：抽检情况 —— 柱+折线 组合图
   线上/线下 柱状 + 线上环比/线下环比 折线
   ============================================================ */
export const useInspectOption = (): EChartsOption => {
  return {
    ...anim,
    grid: { top: 48, right: 28, bottom: 30, left: 45 },
    tooltip: { ...tooltip, trigger: 'axis' },
    legend: {
      data: ['线上', '线下', '线上环比', '线下环比'],
      top: 4, right: 6,
      itemWidth: 10, itemHeight: 10,
      textStyle: { color: '#8aa4d6', fontSize: 11 }
    },
    xAxis: { type: 'category', data: ['2018年', '2019年', '2020年', '2021年', '2022年'], ...darkAxis },
    yAxis: [
      { type: 'value', name: '数量/万', nameTextStyle: { color: '#6b85b8', fontSize: 11 }, ...darkYAxis },
      { type: 'value', name: '环比/%', nameTextStyle: { color: '#6b85b8', fontSize: 11 }, min: 0, max: 120, ...darkYAxis, splitLine: { show: false } }
    ],
    series: [
      {
        name: '线上', type: 'bar', barWidth: '16%', barGap: '10%',
        data: [1200, 1800, 2100, 2500, 2200],
        itemStyle: { borderRadius: [3, 3, 0, 0], ...linearColor('#5ff2ff', '#1a73c2') }
      },
      {
        name: '线下', type: 'bar', barWidth: '16%',
        data: [900, 1200, 1000, 1400, 1100],
        itemStyle: { borderRadius: [3, 3, 0, 0], ...linearColor('#ffb38e', '#d96a3a') }
      },
      {
        name: '线上环比', type: 'line', yAxisIndex: 1, smooth: true, symbol: 'circle', symbolSize: 6,
        data: [0, 50, 70, 95, 80],
        lineStyle: { color: '#4ade80', width: 2, shadowColor: 'rgba(74,222,128,0.6)', shadowBlur: 8 },
        itemStyle: { color: '#4ade80', borderColor: '#0b1b3a', borderWidth: 1.5 }
      },
      {
        name: '线下环比', type: 'line', yAxisIndex: 1, smooth: true, symbol: 'circle', symbolSize: 6,
        data: [0, 40, 60, 75, 65],
        lineStyle: { color: '#f7b733', width: 2, shadowColor: 'rgba(247,183,51,0.6)', shadowBlur: 8 },
        itemStyle: { color: '#f7b733', borderColor: '#0b1b3a', borderWidth: 1.5 }
      }
    ]
  }
}

/* ============================================================
   左栏 2：消费投诉 —— 堆叠面积图
   投诉量 / 受理量 / 处置量
   ============================================================ */
export const useComplaintOption = (): EChartsOption => {
  return {
    ...anim,
    grid: { top: 42, right: 22, bottom: 30, left: 40 },
    tooltip: { ...tooltip, trigger: 'axis' },
    legend: {
      data: ['投诉量', '受理量', '处置量'],
      top: 4, right: 6,
      textStyle: { color: '#8aa4d6', fontSize: 11 },
      itemWidth: 8, itemHeight: 8, icon: 'circle'
    },
    xAxis: { type: 'category', boundaryGap: false, data: ['2017年', '2018年', '2019年', '2020年', '2021年'], ...darkAxis },
    yAxis: { type: 'value', name: '万件', nameTextStyle: { color: '#6b85b8', fontSize: 11 }, ...darkYAxis },
    series: [
      {
        name: '投诉量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
        data: [5, 15, 30, 60, 95],
        lineStyle: { color: '#ff6fa5', width: 2 },
        itemStyle: { color: '#ff6fa5', borderColor: '#fff', borderWidth: 1 },
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(255,111,165,0.5)' }, { offset: 1, color: 'rgba(255,111,165,0.02)' }] }
        }
      },
      {
        name: '受理量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
        data: [4, 12, 25, 50, 85],
        lineStyle: { color: '#36d1dc', width: 2 },
        itemStyle: { color: '#36d1dc', borderColor: '#fff', borderWidth: 1 },
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(54,209,220,0.45)' }, { offset: 1, color: 'rgba(54,209,220,0.02)' }] }
        }
      },
      {
        name: '处置量', type: 'line', smooth: true, symbol: 'circle', symbolSize: 6,
        data: [2, 8, 18, 40, 70],
        lineStyle: { color: '#ffb38e', width: 2 },
        itemStyle: { color: '#ffb38e', borderColor: '#fff', borderWidth: 1 },
        areaStyle: {
          color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: 'rgba(255,179,142,0.4)' }, { offset: 1, color: 'rgba(255,179,142,0.02)' }] }
        }
      }
    ]
  }
}

/* ============================================================
   右栏 1：舆情数据分布 —— 饼图 + 底部时间线
   ============================================================ */
export const useOpinionOption = (): EChartsOption => {
  return {
    ...anim,
    tooltip: { ...tooltip, trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    grid: { top: 10, right: 10, bottom: 80, left: 10, containLabel: false },
    legend: { show: false },
    series: [
      {
        name: '舆情分布',
        type: 'pie',
        radius: ['38%', '62%'],
        center: ['50%', '42%'],
        label: {
          formatter: '{b}\n{d}%',
          color: '#c9d8ff',
          fontSize: 11,
          lineHeight: 16
        },
        labelLine: { lineStyle: { color: '#3a5a9c' } },
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(8, 18, 45, 0.8)',
          borderWidth: 2
        },
        emphasis: { scale: true, scaleSize: 8 },
        data: [
          { value: 13.91, name: '正面', itemStyle: { color: '#4ade80' } },
          { value: 49.13, name: '中性', itemStyle: { color: '#f7b733' } },
          { value: 36.96, name: '负面', itemStyle: { color: '#ff4d6d' } }
        ]
      }
    ],
    // 底部时间轴
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    graphic: ([
      {
        type: 'group',
        left: 'center', bottom: 14,
        children: [
          // 轴线
          {
            type: 'line',
            shape: { x1: -110, y1: 0, x2: 110, y2: 0 },
            style: { stroke: 'rgba(54,209,220,0.35)', lineWidth: 1 }
          },
          // 时间刻度
          { type: 'text', position: [-110, 14], style: { text: '2018', fill: '#6b85b8', fontSize: 11 } },
          { type: 'text', position: [-55, 14], style: { text: '2019', fill: '#6b85b8', fontSize: 11 } },
          { type: 'text', position: [0, 14], style: { text: '2020', fill: '#5ff2ff', fontSize: 12, fontWeight: 700 } },
          { type: 'text', position: [55, 14], style: { text: '2021', fill: '#6b85b8', fontSize: 11 } },
          { type: 'text', position: [110, 14], style: { text: '2022', fill: '#6b85b8', fontSize: 11 } },
          // 节点（2020 高亮为蓝色）
          { type: 'circle', position: [-110, 0], shape: { r: 3 }, style: { fill: '#8aa4d6' } },
          { type: 'circle', position: [-55, 0], shape: { r: 3 }, style: { fill: '#8aa4d6' } },
          { type: 'circle', position: [0, 0], shape: { r: 5 }, style: { fill: '#5ff2ff', shadowColor: 'rgba(95,242,255,0.8)', shadowBlur: 8 } },
          { type: 'circle', position: [55, 0], shape: { r: 3 }, style: { fill: '#8aa4d6' } },
          { type: 'circle', position: [110, 0], shape: { r: 3 }, style: { fill: '#8aa4d6' } }
        ]
      }
    ] as any)
  }
}

/* ============================================================
   右栏 2：行政处罚 —— 山峰面积图
   多组数据堆叠的三角形/山峰状 area
   ============================================================ */
export const usePenaltyOption = (): EChartsOption => {
  // 用堆叠柱状图模拟山峰效果
  // 每一列：主山峰 + 两侧 0 + 顶部数字 markPoint
  const years = ['2018', '2019', '2020', '2021', '2022']
  const heights = [220, 191, 264, 327, 128]
  const colors = ['#8aa4d6', '#a78bfa', '#36d1dc', '#ff6fa5', '#8aa4d6']
  return {
    ...anim,
    grid: { top: 28, right: 20, bottom: 28, left: 40 },
    tooltip: { ...tooltip, trigger: 'axis' },
    xAxis: { type: 'category', data: years, ...darkAxis },
    yAxis: { type: 'value', name: '件', nameTextStyle: { color: '#6b85b8', fontSize: 11 }, max: 350, ...darkYAxis },
    series: [
      {
        type: 'bar',
        barWidth: '26%',
        barGap: '10%',
        data: heights.map((v, i) => ({
          value: v,
          itemStyle: {
            borderRadius: [8, 8, 0, 0],
            color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [{ offset: 0, color: colors[i] }, { offset: 1, color: 'rgba(8,18,45,0.05)' }] },
            shadowColor: colors[i],
            shadowBlur: 10
          }
        })),
        label: {
          show: true, position: 'top',
          formatter: '{c}',
          color: '#c9d8ff', fontWeight: 700, fontSize: 13
        }
      }
    ]
  }
}

/* ============================================================
   右栏 3：违法信息 —— 横向条形图（渐变色条 + 数字标签）
   ============================================================ */
export const useCrimeOption = (): EChartsOption => {
  const rows = [
    { name: '虚假宣传', value: 567, from: '#ff4d6d', to: '#d96a3a' },
    { name: '贬低他人', value: 30, from: '#f7b733', to: '#d99a1a' },
    { name: '专利违规', value: 27, from: '#36d1dc', to: '#1a73c2' },
    { name: '使用极限词', value: 19, from: '#a78bfa', to: '#6c4ad8' },
    { name: '虚假抢购', value: 11, from: '#4ade80', to: '#16a34a' }
  ]
  return {
    ...anim,
    grid: { top: 10, right: 50, bottom: 14, left: 80 },
    tooltip: { ...tooltip, trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'value', show: false, max: 620,
      axisLine: { show: false }, axisLabel: { show: false }, splitLine: { show: false }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: rows.map((r) => r.name),
      axisLine: { show: false }, axisTick: { show: false },
      axisLabel: { color: '#8aa4d6', fontSize: 12 }
    },
    series: [
      {
        name: '违法信息',
        type: 'bar',
        barWidth: 16,
        data: rows.map((r) => ({
          value: r.value,
          itemStyle: {
            color: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [{ offset: 0, color: r.from }, { offset: 1, color: r.to }] },
            borderRadius: [0, 4, 4, 0],
            shadowColor: r.to, shadowBlur: 8
          }
        })),
        // 右侧数字标签
        label: {
          show: true, position: 'right',
          formatter: '{c}',
          color: '#c9d8ff', fontWeight: 700, fontSize: 14
        }
      }
    ]
  }
}

/* ============================================================
   遗留保留（中栏不再使用，但导出保留）
   ============================================================ */
export const useRadarOption = (): EChartsOption => ({ ...anim })
export const useGaugeOption = (): EChartsOption => ({ ...anim })

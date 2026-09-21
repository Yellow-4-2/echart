import type { EChartsOption } from 'echarts'

// 通用动画配置：错峰入场 + 缓动
const anim = {
  animationDuration: 1200,
  animationEasing: 'cubicOut' as const,
  animationDelay: (idx: number) => idx * 80
}

// 通用 tooltip 配置
const tooltip = {
  trigger: 'axis' as const,
  backgroundColor: 'rgba(8, 20, 50, 0.92)',
  borderColor: '#36d1dc',
  borderWidth: 1,
  textStyle: { color: '#c9d8ff', fontSize: 12 },
  extraCssText: 'box-shadow: 0 0 18px rgba(54, 209, 220, 0.35); backdrop-filter: blur(4px);'
}

export const useBarOption = (): EChartsOption => {
  return {
    ...anim,
    grid: { top: 40, right: 20, bottom: 30, left: 45 },
    tooltip,
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisLine: { lineStyle: { color: '#1f3a7a' } },
      axisLabel: { color: '#8aa4d6' },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: '#8aa4d6' },
      splitLine: { lineStyle: { color: 'rgba(31, 58, 122, 0.25)', type: 'dashed' } }
    },
    series: [
      {
        name: '访问量',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130],
        barWidth: '46%',
        // 顶部圆角 + 阴影发光
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#5ff2ff' },
              { offset: 0.5, color: '#36d1dc' },
              { offset: 1, color: '#1a73c2' }
            ]
          },
          shadowColor: 'rgba(54, 209, 220, 0.55)',
          shadowBlur: 12
        },
        // hover 时变亮
        emphasis: {
          itemStyle: { shadowBlur: 22, shadowColor: 'rgba(95, 242, 255, 0.85)' }
        },
        // 顶部 markPoint 标记最大值
        markPoint: {
          symbol: 'pin',
          symbolSize: 38,
          label: { color: '#0b1b3a', fontSize: 10, fontWeight: 700 },
          itemStyle: { color: '#5ff2ff', shadowColor: 'rgba(95, 242, 255, 0.7)', shadowBlur: 10 },
          data: [{ type: 'max', name: '峰值' }]
        },
        markLine: {
          symbol: 'none',
          lineStyle: { color: '#ff8a5b', type: 'dashed', width: 1.5 },
          label: { color: '#ff8a5b', formatter: '均值 {c}' },
          data: [{ type: 'average', name: '均值' }]
        }
      }
    ]
  }
}

export const useLineOption = (): EChartsOption => {
  return {
    ...anim,
    grid: { top: 40, right: 30, bottom: 30, left: 45 },
    tooltip,
    legend: { data: ['收入', '支出'], right: 10, top: 6, textStyle: { color: '#8aa4d6' }, icon: 'roundRect' },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: { lineStyle: { color: '#1f3a7a' } },
      axisLabel: { color: '#8aa4d6' },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: '#8aa4d6' },
      splitLine: { lineStyle: { color: 'rgba(31, 58, 122, 0.25)', type: 'dashed' } }
    },
    series: [
      {
        name: '收入',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        // 端点名称
        endLabel: { show: true, color: '#36d1dc', fontWeight: 700, formatter: '{a}' },
        data: [320, 332, 301, 334, 390, 330, 320],
        lineStyle: { color: '#36d1dc', width: 2.5, shadowColor: 'rgba(54, 209, 220, 0.6)', shadowBlur: 10 },
        itemStyle: { color: '#36d1dc', borderColor: '#fff', borderWidth: 1.5 },
        emphasis: { scale: 1.4, focus: 'series' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(54, 209, 220, 0.55)' },
              { offset: 1, color: 'rgba(54, 209, 220, 0)' }
            ]
          }
        }
      },
      {
        name: '支出',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        endLabel: { show: true, color: '#ff8a5b', fontWeight: 700, formatter: '{a}' },
        data: [220, 182, 191, 234, 290, 330, 310],
        lineStyle: { color: '#ff8a5b', width: 2.5, shadowColor: 'rgba(255, 138, 91, 0.6)', shadowBlur: 10 },
        itemStyle: { color: '#ff8a5b', borderColor: '#fff', borderWidth: 1.5 },
        emphasis: { scale: 1.4, focus: 'series' },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(255, 138, 91, 0.5)' },
              { offset: 1, color: 'rgba(255, 138, 91, 0)' }
            ]
          }
        }
      }
    ]
  }
}

export const usePieOption = (): EChartsOption => {
  return {
    ...anim,
    tooltip: { ...tooltip, trigger: 'item' },
    legend: { bottom: 5, textStyle: { color: '#8aa4d6' }, itemWidth: 10, itemHeight: 10, icon: 'circle' },
    // 中心总计文字
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    graphic: ([
      {
        type: 'text', left: 'center', top: '40%',
        style: { text: '总量', fill: '#6b85b8', fontSize: 13, textAlign: 'center' }
      },
      {
        type: 'text', left: 'center', top: '47%',
        style: { text: '3,147', fill: '#5ff2ff', fontSize: 22, fontWeight: 700, textAlign: 'center' }
      }
    ] as any),
    series: [
      {
        name: '渠道占比',
        type: 'pie',
        roseType: 'radius',
        radius: ['40%', '72%'],
        center: ['50%', '46%'],
        avoidLabelOverlap: true,
        // 每个扇形外发光
        itemStyle: {
          borderRadius: 6,
          borderColor: 'rgba(8, 18, 45, 0.6)',
          borderWidth: 2,
          shadowBlur: 14,
          shadowColor: 'rgba(54, 209, 220, 0.4)'
        },
        label: { color: '#c9d8ff', formatter: '{b}\n{d}%' },
        labelLine: { lineStyle: { color: '#3a5a9c' }, length: 8, length2: 12 },
        // hover 扇形外扩
        emphasis: {
          scale: true,
          scaleSize: 10,
          label: { color: '#fff', fontWeight: 700 },
          itemStyle: { shadowBlur: 24, shadowColor: 'rgba(95, 242, 255, 0.8)' }
        },
        data: [
          { value: 1048, name: '搜索引擎', itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#5ff2ff' }, { offset: 1, color: '#1a73c2' }] } } },
          { value: 735, name: '直接访问', itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#7fb0ff' }, { offset: 1, color: '#3a5a9c' }] } } },
          { value: 580, name: '邮件营销', itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#c4adff' }, { offset: 1, color: '#6c4ad8' }] } } },
          { value: 484, name: '联盟广告', itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ffb38e' }, { offset: 1, color: '#d96a3a' }] } } },
          { value: 300, name: '视频投放', itemStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ffe08a' }, { offset: 1, color: '#d99a1a' }] } } }
        ]
      }
    ]
  }
}

export const useRadarOption = (): EChartsOption => {
  return {
    ...anim,
    tooltip: { ...tooltip, trigger: 'item' },
    legend: { bottom: 5, textStyle: { color: '#8aa4d6' }, icon: 'circle' },
    radar: {
      center: ['50%', '48%'],
      radius: '62%',
      indicator: [
        { name: '销售', max: 100 },
        { name: '管理', max: 100 },
        { name: '技术', max: 100 },
        { name: '客服', max: 100 },
        { name: '研发', max: 100 },
        { name: '市场', max: 100 }
      ],
      axisName: { color: '#8aa4d6' },
      splitLine: { lineStyle: { color: 'rgba(54, 209, 220, 0.25)' } },
      splitArea: { areaStyle: { color: ['rgba(31, 58, 122, 0.08)', 'rgba(31, 58, 122, 0.18)'] } },
      axisLine: { lineStyle: { color: 'rgba(54, 209, 220, 0.35)' } }
    },
    series: [
      {
        name: '能力评估',
        type: 'radar',
        symbol: 'circle',
        symbolSize: 6,
        data: [
          {
            value: [85, 72, 90, 60, 78, 88],
            name: '本月',
            lineStyle: { color: '#36d1dc', width: 2, shadowColor: 'rgba(54, 209, 220, 0.6)', shadowBlur: 8 },
            itemStyle: { color: '#5ff2ff', borderColor: '#fff', borderWidth: 1 },
            areaStyle: {
              color: {
                type: 'radial', x: 0.5, y: 0.5, r: 0.8,
                colorStops: [
                  { offset: 0, color: 'rgba(54, 209, 220, 0.5)' },
                  { offset: 1, color: 'rgba(54, 209, 220, 0.05)' }
                ]
              }
            }
          },
          {
            value: [70, 65, 75, 80, 60, 72],
            name: '上月',
            lineStyle: { color: '#ff8a5b', width: 2, shadowColor: 'rgba(255, 138, 91, 0.6)', shadowBlur: 8 },
            itemStyle: { color: '#ffb38e', borderColor: '#fff', borderWidth: 1 },
            areaStyle: {
              color: {
                type: 'radial', x: 0.5, y: 0.5, r: 0.8,
                colorStops: [
                  { offset: 0, color: 'rgba(255, 138, 91, 0.4)' },
                  { offset: 1, color: 'rgba(255, 138, 91, 0.05)' }
                ]
              }
            }
          }
        ]
      }
    ]
  }
}

export const useGaugeOption = (): EChartsOption => {
  return {
    ...anim,
    series: [
      {
        name: '设备使用率',
        type: 'gauge',
        center: ['50%', '55%'],
        radius: '85%',
        // 渐变进度条
        progress: {
          show: true,
          width: 16,
          roundCap: true,
          itemStyle: {
            color: {
              type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: '#36d1dc' },
                { offset: 0.5, color: '#5ff2ff' },
                { offset: 1, color: '#a78bfa' }
              ]
            },
            shadowColor: 'rgba(95, 242, 255, 0.6)',
            shadowBlur: 14
          }
        },
        // 背景轨道
        axisLine: {
          lineStyle: { width: 16, color: [[1, 'rgba(31, 58, 122, 0.35)']] }
        },
        pointer: {
          width: 5,
          length: '62%',
          icon: 'path://M2,0 L-2,0 L0,-2 Z',
          itemStyle: { color: '#5ff2ff', shadowColor: 'rgba(95, 242, 255, 0.85)', shadowBlur: 12 }
        },
        anchor: { show: true, size: 14, showAbove: true, itemStyle: { color: '#5ff2ff', shadowBlur: 10, shadowColor: 'rgba(95, 242, 255, 0.8)' } },
        axisTick: { show: false },
        splitLine: { length: 10, lineStyle: { color: '#36d1dc', width: 2 } },
        axisLabel: { color: '#8aa4d6', distance: 18, fontSize: 10 },
        detail: {
          valueAnimation: true,
          formatter: '{value}%',
          color: '#5ff2ff',
          fontSize: 26,
          fontWeight: 700,
          offsetCenter: [0, '70%']
        },
        data: [{ value: 78, name: '使用率' }],
        title: { color: '#6b85b8', offsetCenter: [0, '95%'], fontSize: 12 }
      }
    ]
  }
}

export const useAreaOption = (): EChartsOption => {
  return {
    ...anim,
    grid: { top: 40, right: 25, bottom: 30, left: 45 },
    tooltip,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      axisLine: { lineStyle: { color: '#1f3a7a' } },
      axisLabel: { color: '#8aa4d6' },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: '#8aa4d6' },
      splitLine: { lineStyle: { color: 'rgba(31, 58, 122, 0.25)', type: 'dashed' } }
    },
    series: [
      {
        name: '实时流量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        showSymbol: false,
        data: [120, 180, 320, 410, 360, 280, 150],
        lineStyle: { color: '#a78bfa', width: 2.5, shadowColor: 'rgba(167, 139, 250, 0.7)', shadowBlur: 12 },
        itemStyle: { color: '#c4adff', borderColor: '#fff', borderWidth: 1 },
        emphasis: { focus: 'series', scale: true },
        // 渐变填充 + 顶部光带
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(196, 173, 255, 0.6)' },
              { offset: 0.5, color: 'rgba(167, 139, 250, 0.25)' },
              { offset: 1, color: 'rgba(167, 139, 250, 0)' }
            ]
          }
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: 12,
          label: { color: '#0b1b3a', fontSize: 10, fontWeight: 700, formatter: '{c}' },
          itemStyle: { color: '#c4adff', shadowColor: 'rgba(196, 173, 255, 0.8)', shadowBlur: 12 },
          data: [{ type: 'max', name: '峰值' }]
        }
      }
    ]
  }
}

export const useStackBarOption = (): EChartsOption => {
  return {
    ...anim,
    grid: { top: 40, right: 20, bottom: 30, left: 45 },
    tooltip,
    legend: { data: ['在线', '离线'], right: 10, top: 6, textStyle: { color: '#8aa4d6' }, icon: 'roundRect' },
    xAxis: {
      type: 'category',
      data: ['北京', '上海', '广州', '深圳', '杭州', '成都'],
      axisLine: { lineStyle: { color: '#1f3a7a' } },
      axisLabel: { color: '#8aa4d6' },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: '#8aa4d6' },
      splitLine: { lineStyle: { color: 'rgba(31, 58, 122, 0.25)', type: 'dashed' } }
    },
    series: [
      {
        name: '在线',
        type: 'bar',
        stack: 'total',
        barWidth: '46%',
        data: [320, 302, 301, 334, 390, 330],
        itemStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: '#5ff2ff' }, { offset: 1, color: '#1a73c2' }]
          },
          shadowColor: 'rgba(54, 209, 220, 0.4)',
          shadowBlur: 8
        },
        emphasis: { itemStyle: { shadowBlur: 18, shadowColor: 'rgba(95, 242, 255, 0.8)' } }
      },
      {
        name: '离线',
        type: 'bar',
        stack: 'total',
        barWidth: '46%',
        data: [120, 132, 101, 134, 90, 230],
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{ offset: 0, color: '#7fb0ff' }, { offset: 1, color: '#3a5a9c' }]
          },
          shadowColor: 'rgba(91, 141, 239, 0.4)',
          shadowBlur: 8
        },
        emphasis: { itemStyle: { shadowBlur: 18, shadowColor: 'rgba(127, 176, 255, 0.8)' } }
      }
    ]
  }
}

const linearColor = (from: string, to: string) => ({
  type: 'linear' as const,
  x: 0, y: 0, x2: 1, y2: 0,
  colorStops: [
    { offset: 0, color: from },
    { offset: 1, color: to }
  ]
})

export const useProgressOption = (): EChartsOption => {
  const rows: Array<{ name: string; value: number; from: string; to: string }> = [
    { name: 'CPU', value: 72, from: '#36d1dc', to: '#1a73c2' },
    { name: '内存', value: 58, from: '#5b8def', to: '#36d1dc' },
    { name: '磁盘', value: 85, from: '#f7b733', to: '#ff8a5b' },
    { name: '网络', value: 41, from: '#a78bfa', to: '#5b8def' },
    { name: 'GPU', value: 63, from: '#36d1dc', to: '#a78bfa' }
  ]
  return {
    ...anim,
    tooltip,
    grid: { top: 40, right: 45, bottom: 20, left: 60 },
    xAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      axisLabel: { color: '#8aa4d6', formatter: '{value}%' },
      splitLine: { lineStyle: { color: 'rgba(31, 58, 122, 0.2)', type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      data: rows.map((r) => r.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#8aa4d6', fontSize: 12 }
    },
    series: [
      {
        name: '使用率',
        type: 'bar',
        data: rows.map((r) => ({
          value: r.value,
          itemStyle: {
            color: linearColor(r.from, r.to),
            borderRadius: [0, 8, 8, 0],
            shadowColor: r.to,
            shadowBlur: 10
          }
        })),
        // 背景轨道
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(31, 58, 122, 0.25)',
          borderRadius: [0, 8, 8, 0]
        },
        barWidth: 14,
        label: { show: true, position: 'right', formatter: '{c}%', color: '#c9d8ff', fontWeight: 700 }
      }
    ]
  }
}

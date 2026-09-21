<template>
  <div class="map-chart">
    <div ref="elRef" class="map-chart__canvas"></div>
    <div class="map-chart__legend">
      <span v-for="(item, i) in legend" :key="i" class="legend-item">
        <i class="dot" :style="{ background: item.color }"></i>{{ item.label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GeoJSON = any

const elRef = ref<HTMLDivElement | null>(null)
const chart = shallowRef<echarts.ECharts | null>(null)
const loading = ref(true)
const failed = ref(false)

const legend = [
  { label: '高活跃', color: '#ff4d6d' },
  { label: '中活跃', color: '#f7b733' },
  { label: '常规', color: '#36d1dc' }
]

const scatterData = [
  { name: '北京', value: [116.4, 39.9, 95] },
  { name: '上海', value: [121.5, 31.2, 88] },
  { name: '广州', value: [113.3, 23.1, 76] },
  { name: '深圳', value: [114.1, 22.5, 82] },
  { name: '杭州', value: [120.2, 30.3, 70] },
  { name: '成都', value: [104.1, 30.7, 65] },
  { name: '武汉', value: [114.3, 30.6, 60] },
  { name: '西安', value: [108.9, 34.3, 55] }
]

// 中心枢纽（飞线起点 / 终点）
const hub = { name: '北京', coord: [116.4, 39.9] }
// 飞线目标城市（从北京出发 -> 各城市）
const flyLines = scatterData
  .filter((d) => d.name !== hub.name)
  .map((d) => ({
    fromName: hub.name,
    toName: d.name,
    coords: [hub.coord, [d.value[0], d.value[1]]]
  }))

const buildOption = (): EChartsOption => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(8, 20, 50, 0.92)',
    borderColor: '#36d1dc',
    borderWidth: 1,
    textStyle: { color: '#c9d8ff' },
    extraCssText: 'box-shadow: 0 0 18px rgba(54, 209, 220, 0.35);',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (p: any) => {
      if (p.seriesName === '活跃城市' && Array.isArray(p.value)) {
        return `${p.name}<br/>活跃指数：${p.value[2]}`
      }
      if (p.seriesName === '用户流向' && p.data) {
        return `${p.data.fromName} → ${p.data.toName}`
      }
      return p.name ? `${p.name}` : ''
    }
  },
  geo: {
    map: 'china',
    roam: true,
    zoom: 1.2,
    scaleLimit: { min: 0.8, max: 5 },
    label: { show: false },
    // 区域渐变 + 边缘发光
    itemStyle: {
      areaColor: {
        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(31, 58, 122, 0.55)' },
          { offset: 1, color: 'rgba(13, 27, 70, 0.55)' }
        ]
      },
      borderColor: '#3a78d6',
      borderWidth: 1,
      shadowColor: 'rgba(54, 209, 220, 0.35)',
      shadowBlur: 18
    },
    emphasis: {
      label: { color: '#fff' },
      itemStyle: { areaColor: 'rgba(54, 209, 220, 0.45)', borderColor: '#5ff2ff' }
    }
  },
  series: [
    // 飞线（迁徙线）— 带尾迹动画
    {
      name: '用户流向',
      type: 'lines',
      coordinateSystem: 'geo',
      zlevel: 2,
      effect: {
        show: true,
        period: 4,
        trailLength: 0.4,
        symbol: 'arrow',
        symbolSize: 6,
        color: '#5ff2ff'
      },
      lineStyle: {
        color: '#36d1dc',
        width: 1.2,
        opacity: 0.5,
        curveness: 0.25
      },
      data: flyLines
    },
    // 城市散点（涟漪）
    {
      name: '活跃城市',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 3,
      symbolSize: (val: number[]) => Math.max(8, val[2] / 4),
      rippleEffect: { brushType: 'stroke', scale: 4, period: 3 },
      showEffectOn: 'render',
      data: scatterData,
      label: {
        show: true,
        formatter: '{b}',
        position: 'right',
        color: '#c9d8ff',
        fontSize: 11,
        textShadowColor: 'rgba(8, 18, 45, 0.8)',
        textShadowBlur: 4
      },
      itemStyle: {
        color: '#5ff2ff',
        shadowBlur: 14,
        shadowColor: 'rgba(95, 242, 255, 0.85)'
      }
    }
  ]
})

const resize = () => chart.value?.resize()

onMounted(async () => {
  if (elRef.value) {
    chart.value = echarts.init(elRef.value)
    try {
      const res = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      if (!res.ok) throw new Error('map load failed')
      const geo = (await res.json()) as GeoJSON
      echarts.registerMap('china', geo)
      chart.value.setOption(buildOption(), true)
    } catch (e) {
      failed.value = true
      // fallback: show basic chart without map registration
      chart.value.setOption(buildOption(), true)
    } finally {
      loading.value = false
    }
    window.addEventListener('resize', resize)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  chart.value?.dispose()
  chart.value = null
})
</script>

<style scoped>
.map-chart {
  position: relative;
  width: 100%;
  height: 100%;
}
.map-chart__canvas {
  width: 100%;
  height: 100%;
}
.map-chart__legend {
  position: absolute;
  bottom: 8px;
  right: 12px;
  display: flex;
  gap: 14px;
  font-size: 12px;
  color: #8aa4d6;
}
.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}
</style>

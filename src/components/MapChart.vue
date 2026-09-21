<template>
  <div class="map-chart">
    <div ref="elRef" class="map-chart__canvas"></div>
    <div v-if="loading" class="map-chart__mask">地图数据加载中…</div>
    <div v-else-if="failed" class="map-chart__mask">地图数据加载失败，请检查网络</div>
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
let observer: ResizeObserver | null = null
let disposed = false

/* ------------------------------------------------------------
   杭州市各区县消费风险等级指数（0-100）
   高风险 ≥ 60 / 中风险 40-59 / 低风险 < 40
   ------------------------------------------------------------ */
const riskData: Array<{ name: string; value: number }> = [
  { name: '拱墅区', value: 72 },
  { name: '西湖区', value: 68 },
  { name: '上城区', value: 55 },
  { name: '滨江区', value: 52 },
  { name: '余杭区', value: 48 },
  { name: '萧山区', value: 45 },
  { name: '富阳区', value: 32 },
  { name: '临安区', value: 28 },
  { name: '钱塘区', value: 26 },
  { name: '临平区', value: 24 },
  { name: '桐庐县', value: 18 },
  { name: '淳安县', value: 14 },
  { name: '建德市', value: 16 }
]

const buildOption = (): EChartsOption => ({
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(8, 20, 50, 0.92)',
    borderColor: '#36d1dc',
    borderWidth: 1,
    textStyle: { color: '#c9d8ff', fontSize: 12 },
    extraCssText: 'box-shadow: 0 0 18px rgba(54, 209, 220, 0.35); backdrop-filter: blur(4px);',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (p: any) => {
      const val = typeof p.value === 'number' ? p.value : 0
      const level = val >= 60 ? { text: '高风险', color: '#ff4d6d' }
                  : val >= 40 ? { text: '中风险', color: '#f7b733' }
                  : { text: '低风险', color: '#4ade80' }
      return `
        <div style="font-weight:700;margin-bottom:4px;color:#5ff2ff">${p.name}</div>
        <div>消费风险指数：<span style="color:${level.color};font-weight:700">${val}</span></div>
        <div>风险等级：<span style="color:${level.color};font-weight:700">${level.text}</span></div>
      `
    }
  },
  // 右下角风险等级图例（ECharts visualMap 自动渲染）
  visualMap: {
    show: true,
    orient: 'vertical',
    right: 14,
    bottom: 14,
    min: 0,
    max: 100,
    splitNumber: 3,
    text: ['高风险', '低风险'],
    textStyle: { color: '#8aa4d6', fontSize: 11 },
    // 分段显示：高/中/低
    pieces: [
      { gt: 60, label: '高风险 [60,100]', color: '#ff4d6d' },
      { gte: 40, lte: 60, label: '中风险 [40,60)', color: '#f7b733' },
      { lt: 40, label: '低风险 [0,40)', color: '#4ade80' }
    ],
    itemWidth: 12,
    itemHeight: 14,
    itemGap: 6
  },
  series: [
    {
      name: '消费风险等级',
      type: 'map',
      map: 'hangzhou',
      roam: true,
      zoom: 1.15,
      scaleLimit: { min: 0.8, max: 4 },
      label: {
        show: true,
        color: '#e6f1ff',
        fontSize: 11,
        fontWeight: 500,
        textBorderColor: 'rgba(8, 18, 45, 0.85)',
        textBorderWidth: 1,
        formatter: '{b}'
      },
      itemStyle: {
        borderColor: 'rgba(54, 209, 220, 0.6)',
        borderWidth: 1,
        shadowColor: 'rgba(54, 209, 220, 0.25)',
        shadowBlur: 10
      },
      emphasis: {
        label: { color: '#fff', fontWeight: 700, fontSize: 12 },
        itemStyle: {
          borderColor: '#5ff2ff',
          borderWidth: 2,
          shadowColor: 'rgba(95, 242, 255, 0.9)',
          shadowBlur: 18,
          areaColor: '#5ff2ff'
        }
      },
      select: {
        label: { color: '#fff' },
        itemStyle: { areaColor: '#36d1dc' }
      },
      data: riskData
    }
  ]
})

const resize = () => chart.value?.resize()

onMounted(() => {
  const el = elRef.value
  if (!el) return

  const initWhenReady = () => {
    const node = elRef.value
    if (!node || chart.value || disposed) return
    if (node.clientWidth === 0 || node.clientHeight === 0) return
    chart.value = echarts.init(node)
    void loadMap()
  }

  initWhenReady()

  observer = new ResizeObserver(() => {
    if (!chart.value) {
      initWhenReady()
    } else {
      resize()
    }
  })
  observer.observe(el)

  window.addEventListener('resize', resize)
})

const loadMap = async () => {
  try {
    // 杭州市 GeoJSON（330100 行政区划代码）
    const res = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/330100_full.json')
    if (!res.ok) throw new Error('map load failed')
    const geo = (await res.json()) as GeoJSON
    if (disposed || !chart.value) return
    echarts.registerMap('hangzhou', geo)
    chart.value.setOption(buildOption(), true)
  } catch {
    if (disposed) return
    failed.value = true
  } finally {
    if (!disposed) loading.value = false
  }
}

onBeforeUnmount(() => {
  disposed = true
  window.removeEventListener('resize', resize)
  observer?.disconnect()
  observer = null
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
.map-chart__mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #8aa4d6;
  letter-spacing: 1px;
  pointer-events: none;
}
</style>

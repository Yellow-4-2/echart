<template>
  <div ref="elRef" class="base-chart"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

const props = defineProps<{
  option: EChartsOption
}>()

const elRef = ref<HTMLDivElement | null>(null)
const chart = shallowRef<echarts.ECharts | null>(null)
let observer: ResizeObserver | null = null

const render = () => {
  chart.value?.setOption(props.option, true)
}

const resize = () => chart.value?.resize()

onMounted(() => {
  if (!elRef.value) return

  // 容器有尺寸后再初始化，避免 ECharts 0 尺寸告警
  const initWhenReady = () => {
    const el = elRef.value
    if (!el || chart.value) return
    if (el.clientWidth === 0 || el.clientHeight === 0) return
    chart.value = echarts.init(el)
    render()
  }

  initWhenReady()

  observer = new ResizeObserver(() => {
    if (!chart.value) {
      initWhenReady()
    } else {
      resize()
    }
  })
  observer.observe(elRef.value)

  window.addEventListener('resize', resize)
})

watch(() => props.option, render, { deep: true })

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  observer?.disconnect()
  observer = null
  chart.value?.dispose()
  chart.value = null
})
</script>

<style scoped>
.base-chart {
  width: 100%;
  height: 100%;
}
</style>

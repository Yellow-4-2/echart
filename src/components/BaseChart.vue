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

const render = () => {
  if (chart.value && props.option) {
    chart.value.setOption(props.option, true)
  }
}

const resize = () => chart.value?.resize()

onMounted(() => {
  if (elRef.value) {
    chart.value = echarts.init(elRef.value)
    render()
    window.addEventListener('resize', resize)
  }
})

watch(() => props.option, render, { deep: true })

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
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

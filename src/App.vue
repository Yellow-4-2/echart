<template>
  <div class="dashboard">
    <!-- 顶部标题栏 -->
    <header class="dashboard__header">
      <div class="header__side header__side--left">
        <span class="badge">实时</span>
        <span class="time-text">{{ dateText }}</span>
      </div>
      <h1 class="header__title">
        <span class="header__title-text">数据可视化分析平台</span>
      </h1>
      <div class="header__side header__side--right">
        <span class="time-text">{{ timeText }}</span>
      </div>
    </header>

    <!-- 主体三栏布局 -->
    <main class="dashboard__body">
      <!-- 左栏：3 个图表 上中下 -->
      <section class="col col--left">
        <Panel title="月度访问量趋势" sub="单位：万次" class="cell cell--1">
          <BaseChart :option="barOption" />
        </Panel>
        <Panel title="收入与支出对比" sub="近一周" class="cell cell--1">
          <BaseChart :option="lineOption" />
        </Panel>
        <Panel title="渠道来源占比" sub="单位：%" class="cell cell--1">
          <BaseChart :option="pieOption" />
        </Panel>
      </section>

      <!-- 中栏：上面地图，下面两个左右图表 -->
      <section class="col col--center">
        <Panel title="全国活跃用户分布" sub="实时热力" class="cell cell--map">
          <MapChart />
        </Panel>
        <div class="center-bottom">
          <Panel title="能力评估雷达" sub="本月 / 上月" class="cell cell--half">
            <BaseChart :option="radarOption" />
          </Panel>
          <Panel title="设备使用率" sub="实时" class="cell cell--half">
            <BaseChart :option="gaugeOption" />
          </Panel>
        </div>
      </section>

      <!-- 右栏：3 个图表 上中下 -->
      <section class="col col--right">
        <Panel title="24小时流量监控" sub="单位：k/s" class="cell cell--1">
          <BaseChart :option="areaOption" />
        </Panel>
        <Panel title="城市设备状态" sub="在线 / 离线" class="cell cell--1">
          <BaseChart :option="stackBarOption" />
        </Panel>
        <Panel title="资源使用率" sub="单位：%" class="cell cell--1">
          <BaseChart :option="progressOption" />
        </Panel>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import Panel from './components/Panel.vue'
import BaseChart from './components/BaseChart.vue'
import MapChart from './components/MapChart.vue'
import {
  useAreaOption,
  useBarOption,
  useGaugeOption,
  useLineOption,
  usePieOption,
  useProgressOption,
  useRadarOption,
  useStackBarOption
} from './components/chartOptions'

const barOption = useBarOption()
const lineOption = useLineOption()
const pieOption = usePieOption()
const radarOption = useRadarOption()
const gaugeOption = useGaugeOption()
const areaOption = useAreaOption()
const stackBarOption = useStackBarOption()
const progressOption = useProgressOption()

// 顶部时间
const now = ref(new Date())
let timer: number | undefined
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
const dateText = computed(() => {
  const d = now.value
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
})
const timeText = computed(() => {
  const d = now.value
  const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()]
  return `${week} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
})

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background:
    radial-gradient(circle at 50% 0%, rgba(31, 58, 122, 0.4) 0%, transparent 60%),
    #050a1f;
  color: #c9d8ff;
  overflow: hidden;
}

/* 顶部标题栏 */
.dashboard__header {
  position: relative;
  flex: 0 0 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  background:
    linear-gradient(180deg, rgba(54, 209, 220, 0.18) 0%, rgba(54, 209, 220, 0) 100%);
  border-bottom: 1px solid rgba(31, 58, 122, 0.6);
}
.dashboard__header::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 50%;
  height: 2px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, transparent 0%, #36d1dc 50%, transparent 100%);
}
.header__title {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 6px;
  color: #e6f1ff;
  text-shadow: 0 0 14px rgba(54, 209, 220, 0.6);
}
.header__side {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #8aa4d6;
  min-width: 200px;
}
.header__side--right { justify-content: flex-end; }
.badge {
  padding: 2px 8px;
  font-size: 12px;
  color: #fff;
  background: linear-gradient(90deg, #ff4d6d, #ff8a5b);
  border-radius: 3px;
}
.time-text {
  font-family: 'Consolas', 'Courier New', monospace;
  letter-spacing: 1px;
}

/* 主体三栏 */
.dashboard__body {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.6fr 1fr;
  gap: 12px;
  padding: 12px;
  min-height: 0;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}
.col--center {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.center-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  flex: 1;
  min-height: 0;
}

.cell {
  flex: 1;
  min-height: 0;
}
.cell--map {
  flex: 1.6;
}
.cell--half {
  height: 100%;
}
</style>

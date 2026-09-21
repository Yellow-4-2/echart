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
      <!-- 左栏：抽检情况 / 消费投诉 / 产品召回 -->
      <section class="col col--left">
        <Panel title="抽检情况" sub="2022年10月数据" class="cell cell--1 clickable" @click="go('/inspect')">
          <BaseChart :option="inspectOption" />
        </Panel>
        <Panel title="消费投诉" sub="单位：万件" class="cell cell--1 clickable" @click="go('/complaint')">
          <BaseChart :option="complaintOption" />
        </Panel>
        <Panel title="产品召回" sub="实时更新" class="cell cell--1 clickable" :body-pad="0" @click="go('/recall')">
          <ProductRecall />
        </Panel>
      </section>

      <!-- 中栏：上面地图，下面左侧排名列表 + 右侧四个行业小区域 -->
      <section class="col col--center">
        <Panel title="杭州消费风险等级分布" sub="实时监测" class="cell cell--map">
          <MapChart />
        </Panel>
        <div class="center-bottom">
          <Panel title="区域消费风险排名" sub="实时更新" class="cell cell--list" :body-pad="0">
            <RankingList />
          </Panel>
          <Panel title="重点行业风险" sub="当月监测" class="cell cell--industry">
            <IndustryGrid />
          </Panel>
        </div>
      </section>

      <!-- 右栏：舆情数据分布 / 行政处罚 / 违法信息 -->
      <section class="col col--right">
        <Panel title="舆情数据分布" sub="近五年" class="cell cell--1 clickable" @click="go('/opinion')">
          <BaseChart :option="opinionOption" />
        </Panel>
        <Panel title="行政处罚" sub="单位：件" class="cell cell--1 clickable" @click="go('/penalty')">
          <BaseChart :option="penaltyOption" />
        </Panel>
        <Panel title="违法信息" sub="累计数据" class="cell cell--1 clickable" @click="go('/crime')">
          <BaseChart :option="crimeOption" />
        </Panel>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Panel from '../components/Panel.vue'
import BaseChart from '../components/BaseChart.vue'
import MapChart from '../components/MapChart.vue'
import RankingList from '../components/RankingList.vue'
import IndustryGrid from '../components/IndustryGrid.vue'
import ProductRecall from '../components/ProductRecall.vue'
import {
  useComplaintOption,
  useCrimeOption,
  useInspectOption,
  useOpinionOption,
  usePenaltyOption
} from '../components/chartOptions'

const router = useRouter()
const go = (path: string) => router.push(path)

const inspectOption = useInspectOption()
const complaintOption = useComplaintOption()
const opinionOption = useOpinionOption()
const penaltyOption = usePenaltyOption()
const crimeOption = useCrimeOption()

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
  grid-template-columns: 1.15fr 1fr;
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
.cell--list,
.cell--industry {
  height: 100%;
}

/* 可点击面板 */
.clickable {
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.clickable:hover {
  transform: translateY(-2px);
}
.clickable:active {
  transform: translateY(0);
}
</style>

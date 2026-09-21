<template>
  <div class="detail">
    <!-- 顶部栏 -->
    <header class="detail__header">
      <button class="back-btn" @click="router.push('/')">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        返回首页
      </button>
      <h1 class="detail__title">{{ title }}</h1>
      <div class="detail__meta">
        <span class="meta-item">更新时间：{{ updateTime }}</span>
      </div>
    </header>

    <!-- 主体：左右分栏 -->
    <main class="detail__body">
      <!-- 左栏 -->
      <section class="detail__left">
        <!-- 顶部大图 -->
        <Panel :title="leftTop.title" :sub="leftTop.sub" class="detail__cell detail__cell--top">
          <component :is="leftTop.comp" v-if="leftTop.comp" :option="leftTop.option" />
          <BaseChart v-else-if="leftTop.option" :option="leftTop.option" />
          <slot name="left-top" v-else />
        </Panel>

        <!-- 底部：两个小图 或 列表 -->
        <div class="detail__bottom">
          <Panel v-if="leftBottom1" :title="leftBottom1.title" :sub="leftBottom1.sub" class="detail__cell">
            <BaseChart v-if="leftBottom1.option" :option="leftBottom1.option" />
            <component :is="leftBottom1.comp" v-else-if="leftBottom1.comp" />
          </Panel>
          <Panel v-if="leftBottom2" :title="leftBottom2.title" :sub="leftBottom2.sub" class="detail__cell">
            <BaseChart v-if="leftBottom2.option" :option="leftBottom2.option" />
            <component :is="leftBottom2.comp" v-else-if="leftBottom2.comp" />
            <slot name="left-bottom-2" v-else />
          </Panel>
          <!-- 如果只有一个底部区域，占满 -->
          <Panel v-if="leftBottomSingle" :title="leftBottomSingle.title" :sub="leftBottomSingle.sub" class="detail__cell detail__cell--full">
            <BaseChart v-if="leftBottomSingle.option" :option="leftBottomSingle.option" />
            <component :is="leftBottomSingle.comp" v-else-if="leftBottomSingle.comp" />
          </Panel>
        </div>
      </section>

      <!-- 右栏：四个图表 2x2 -->
      <section class="detail__right">
        <Panel
          v-for="(item, i) in rightPanels"
          :key="i"
          :title="item.title"
          :sub="item.sub"
          class="detail__cell"
        >
          <BaseChart v-if="item.option" :option="item.option" />
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyOption = any

interface PanelSlot {
  title: string
  sub?: string
  option?: AnyOption
  comp?: unknown
}

interface Props {
  title: string
  leftTop: PanelSlot
  leftBottom1?: PanelSlot
  leftBottom2?: PanelSlot
  leftBottomSingle?: PanelSlot
  rightPanels: PanelSlot[]
}

defineProps<Props>()

const router = useRouter()
const updateTime = ref('')

const now = ref(new Date())
let timer: number | undefined
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
const updateTimeText = computed(() => {
  const d = now.value
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
})

onMounted(() => {
  updateTime.value = updateTimeText.value
  timer = window.setInterval(() => {
    now.value = new Date()
    updateTime.value = updateTimeText.value
  }, 1000)
})
onBeforeUnmount(() => { if (timer) window.clearInterval(timer) })
</script>

<style scoped>
.detail {
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

.detail__header {
  position: relative;
  flex: 0 0 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: linear-gradient(180deg, rgba(54, 209, 220, 0.18) 0%, rgba(54, 209, 220, 0) 100%);
  border-bottom: 1px solid rgba(31, 58, 122, 0.6);
}
.detail__header::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 40%;
  height: 2px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, transparent 0%, #36d1dc 50%, transparent 100%);
}
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 13px;
  color: #5ff2ff;
  background: rgba(54, 209, 220, 0.1);
  border: 1px solid rgba(54, 209, 220, 0.4);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.back-btn:hover {
  background: rgba(54, 209, 220, 0.25);
  box-shadow: 0 0 12px rgba(54, 209, 220, 0.4);
}
.detail__title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 4px;
  color: #e6f1ff;
  text-shadow: 0 0 10px rgba(54, 209, 220, 0.5);
}
.detail__meta { font-size: 12px; color: #6b85b8; }

.detail__body {
  flex: 1;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 12px;
  padding: 12px;
  min-height: 0;
}

.detail__left {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}
.detail__bottom {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  min-height: 0;
}

.detail__right {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
  min-height: 0;
}

.detail__cell {
  min-height: 0;
}
.detail__cell--top {
  flex: 1.5;
}
.detail__cell--full {
  grid-column: 1 / -1;
}
</style>

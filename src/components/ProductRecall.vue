<template>
  <div class="product-recall">
    <div class="product-recall__viewport">
      <div class="product-recall__track">
        <div v-for="(item, i) in doubledRows" :key="i" class="recall-row">
          <span class="col col--no">{{ item.no }}</span>
          <span class="col col--name" :title="item.name">{{ item.name }}</span>
          <span class="col col--reason">{{ item.reason }}</span>
          <span class="col col--count">{{ item.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface RecallRow {
  no: string
  name: string
  reason: string
  count: number
}

const rows: RecallRow[] = [
  { no: '2024-001', name: 'XX 品牌电动自行车', reason: '电池过热', count: 1280 },
  { no: '2024-002', name: 'YY 牌智能门锁', reason: '锁芯故障', count: 860 },
  { no: '2024-003', name: 'ZZ 儿童学习桌', reason: '甲醛超标', count: 520 },
  { no: '2024-004', name: 'AA 牌保温杯', reason: '漏水隐患', count: 340 },
  { no: '2024-005', name: 'BB 豆浆机', reason: '电路短路', count: 210 },
  { no: '2024-006', name: 'CC 电动牙刷', reason: '毛刷脱落', count: 180 },
  { no: '2024-007', name: 'DD 婴儿推车', reason: '安全带失效', count: 150 },
  { no: '2024-008', name: 'EE 牌充电宝', reason: '鼓包风险', count: 120 },
  { no: '2024-009', name: 'FF 空气净化器', reason: '滤网漏装', count: 90 },
  { no: '2024-010', name: 'GG 运动水壶', reason: '材质不达标', count: 75 }
]

const doubledRows = computed(() => [...rows, ...rows])

const paused = ref(false)
let raf = 0
let offset = 0
let lastTs = 0
const SPEED = 22 // px per second

const startScroll = (ts: number) => {
  if (!lastTs) lastTs = ts
  const dt = ts - lastTs
  lastTs = ts
  if (!paused.value) {
    offset += (dt / 1000) * SPEED
    const rowHeight = 34
    const total = rows.length * rowHeight
    if (offset >= total) offset -= total
    const track = document.querySelector('.product-recall__track') as HTMLElement | null
    if (track) track.style.transform = `translateY(-${offset}px)`
  }
  raf = requestAnimationFrame(startScroll)
}

onMounted(() => { raf = requestAnimationFrame(startScroll) })
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
.product-recall {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.product-recall__viewport {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  cursor: default;
}
.product-recall__viewport:hover .product-recall__track {
  animation-play-state: paused;
}

/* 上下渐隐遮罩 */
.product-recall__viewport::before,
.product-recall__viewport::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 14px;
  z-index: 2;
  pointer-events: none;
}
.product-recall__viewport::before {
  top: 0;
  background: linear-gradient(180deg, rgba(8, 18, 45, 0.95) 0%, transparent 100%);
}
.product-recall__viewport::after {
  bottom: 0;
  background: linear-gradient(0deg, rgba(8, 18, 45, 0.95) 0%, transparent 100%);
}

.product-recall__track {
  display: flex;
  flex-direction: column;
}

.recall-row {
  flex: 0 0 34px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 12px;
  color: #c9d8ff;
  border-bottom: 1px dashed rgba(31, 58, 122, 0.4);
  transition: background 0.25s ease;
}
.recall-row:hover {
  background: rgba(255, 77, 109, 0.08);
  color: #ffb3c1;
}

.col--no {
  flex: 0 0 62px;
  color: #6b85b8;
  font-family: 'Consolas', monospace;
}
.col--name {
  flex: 1;
  color: #c9d8ff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 6px;
}
.col--reason {
  flex: 0 0 70px;
  text-align: center;
  color: #ffb38e;
}
.col--count {
  flex: 0 0 52px;
  text-align: right;
  font-weight: 700;
  color: #ff4d6d;
  font-family: 'Consolas', monospace;
}
</style>

<template>
  <div class="ranking-list">
    <!-- 表头 -->
    <div class="ranking-list__header">
      <span class="col col--rank">排名</span>
      <span class="col col--name">区域名称</span>
      <span class="col col--level">风险等级</span>
    </div>

    <!-- 表体：内容双份实现无缝滚动 -->
    <div class="ranking-list__viewport" @mouseenter="paused = true" @mouseleave="paused = false">
      <div class="ranking-list__track" :class="{ 'is-paused': paused }">
        <div v-for="(item, i) in doubledRows" :key="i" class="ranking-row">
          <span class="col col--rank">
            <i class="rank-badge" :class="`rank-badge--${item.rank <= 3 ? item.rank : 'normal'}`">{{ item.rank }}</i>
          </span>
          <span class="col col--name">{{ item.name }}</span>
          <span class="col col--level">
            <i class="level-dot" :style="{ background: item.color, boxShadow: `0 0 6px ${item.color}` }"></i>
            {{ item.level }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type RiskLevel = 'high' | 'mid' | 'low'

interface RankRow {
  rank: number
  name: string
  level: string
  color: string
}

const levelMap: Record<RiskLevel, { text: string; color: string }> = {
  high: { text: '高风险/红色', color: '#ff4d6d' },
  mid: { text: '中风险/黄色', color: '#f7b733' },
  low: { text: '低风险/绿色', color: '#4ade80' }
}

const rows: RankRow[] = [
  { rank: 1, name: '拱墅区', level: levelMap.high.text, color: levelMap.high.color },
  { rank: 2, name: '西湖区', level: levelMap.mid.text, color: levelMap.mid.color },
  { rank: 3, name: '上城区', level: levelMap.mid.text, color: levelMap.mid.color },
  { rank: 4, name: '余杭区', level: levelMap.low.text, color: levelMap.low.color },
  { rank: 5, name: '滨江区', level: levelMap.low.text, color: levelMap.low.color },
  { rank: 6, name: '萧山区', level: levelMap.low.text, color: levelMap.low.color },
  { rank: 7, name: '富阳区', level: levelMap.low.text, color: levelMap.low.color },
  { rank: 8, name: '临平区', level: levelMap.low.text, color: levelMap.low.color },
  { rank: 9, name: '钱塘区', level: levelMap.low.text, color: levelMap.low.color }
]

// 复制一份用于无缝滚动
const doubledRows = computed(() => [...rows, ...rows])

const paused = ref(false)
</script>

<style scoped>
.ranking-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* 表头 */
.ranking-list__header {
  flex: 0 0 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 700;
  color: #5ff2ff;
  letter-spacing: 1px;
  background: linear-gradient(90deg, rgba(54, 209, 220, 0.25) 0%, rgba(54, 209, 220, 0) 100%);
  border-bottom: 1px solid rgba(54, 209, 220, 0.35);
}

/* 滚动区域 */
.ranking-list__viewport {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
}
/* 上下渐隐遮罩 */
.ranking-list__viewport::before,
.ranking-list__viewport::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 14px;
  z-index: 2;
  pointer-events: none;
}
.ranking-list__viewport::before {
  top: 0;
  background: linear-gradient(180deg, rgba(8, 18, 45, 0.95) 0%, transparent 100%);
}
.ranking-list__viewport::after {
  bottom: 0;
  background: linear-gradient(0deg, rgba(8, 18, 45, 0.95) 0%, transparent 100%);
}

.ranking-list__track {
  display: flex;
  flex-direction: column;
  animation: rowScroll 22s linear infinite;
}
.ranking-list__track.is-paused {
  animation-play-state: paused;
}
@keyframes rowScroll {
  0% { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

/* 数据行 */
.ranking-row {
  flex: 0 0 32px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-size: 13px;
  color: #c9d8ff;
  border-bottom: 1px dashed rgba(31, 58, 122, 0.45);
  transition: background 0.25s ease;
}
.ranking-row:hover {
  background: rgba(54, 209, 220, 0.1);
}

.col {
  display: inline-flex;
  align-items: center;
}
.col--rank { flex: 0 0 52px; justify-content: center; }
.col--name { flex: 1; color: #a8e6e6; }
.col--level { flex: 0 0 110px; justify-content: flex-start; gap: 6px; }

/* 排名徽标 */
.rank-badge {
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-style: normal;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  color: #8aa4d6;
  background: rgba(31, 58, 122, 0.55);
}
.rank-badge--1 {
  color: #1a1a1a;
  background: linear-gradient(135deg, #ffe08a, #ff9d2e);
  box-shadow: 0 0 8px rgba(255, 200, 80, 0.7);
}
.rank-badge--2 {
  color: #1a1a1a;
  background: linear-gradient(135deg, #e8f0ff, #9fb8e8);
  box-shadow: 0 0 8px rgba(180, 210, 255, 0.7);
}
.rank-badge--3 {
  color: #1a1a1a;
  background: linear-gradient(135deg, #ffc8a0, #d97a4a);
  box-shadow: 0 0 8px rgba(255, 150, 90, 0.7);
}

/* 等级圆点 */
.level-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex: 0 0 8px;
}
</style>

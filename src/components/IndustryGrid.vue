<template>
  <div class="industry-grid">
    <div
      v-for="(item, i) in industries"
      :key="item.name"
      class="industry-card"
      :style="{ animationDelay: `${i * 0.15}s` }"
    >
      <!-- 行业名 -->
      <div class="industry-card__name">{{ item.name }}</div>

      <!-- 风险等级 -->
      <div class="industry-card__level">
        <span class="level-label">当月风险等级</span>
        <i class="level-dot" :style="{ background: item.color, boxShadow: `0 0 8px ${item.color}` }"></i>
        <span class="level-text" :style="{ color: item.color }">{{ item.level }}</span>
      </div>

      <!-- 环比趋势 -->
      <div class="industry-card__trend">
        <span class="trend-label">与上月度对比</span>
        <span class="trend-value" :class="`trend-value--${item.trend}`">
          <svg class="trend-icon" viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
            <path
              v-if="item.trend === 'down'"
              d="M4 14l6-6 4 4 6-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              v-else
              d="M4 8l6 6 4-4 6 6"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {{ item.trend === 'down' ? '指数呈下降趋势' : '指数呈上升趋势' }}
        </span>
      </div>

      <!-- 卡片四角微光 -->
      <i class="card-corner card-corner--tl"></i>
      <i class="card-corner card-corner--br"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Industry {
  name: string
  level: string
  color: string
  trend: 'down' | 'up'
}

const industries: Industry[] = [
  { name: '丝绸', level: '低风险', color: '#4ade80', trend: 'down' },
  { name: '女装', level: '低风险', color: '#4ade80', trend: 'down' },
  { name: '童装', level: '低风险', color: '#4ade80', trend: 'down' },
  { name: '休闲', level: '低风险', color: '#4ade80', trend: 'down' }
]
</script>

<style scoped>
.industry-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 8px;
  width: 100%;
  height: 100%;
}

.industry-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 6px;
  background: linear-gradient(160deg, rgba(54, 209, 220, 0.12) 0%, rgba(13, 27, 70, 0.55) 100%);
  border: 1px solid rgba(54, 209, 220, 0.3);
  border-radius: 4px;
  overflow: hidden;
  opacity: 0;
  animation: cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}
.industry-card:hover {
  border-color: rgba(95, 242, 255, 0.9);
  box-shadow: inset 0 0 18px rgba(54, 209, 220, 0.2), 0 0 14px rgba(54, 209, 220, 0.3);
  transform: translateY(-2px);
}

@keyframes cardIn {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}

.industry-card__name {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #e6f1ff;
  text-shadow: 0 0 10px rgba(95, 242, 255, 0.55);
}

.industry-card__level {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
}
.level-label {
  color: #6b85b8;
}
.level-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.level-text {
  font-weight: 700;
}

.industry-card__trend {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 12px;
}
.trend-label {
  color: #6b85b8;
}
.trend-value {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-weight: 600;
}
.trend-value--down {
  color: #4ade80;
}
.trend-value--up {
  color: #ff4d6d;
}
.trend-icon {
  animation: arrowMove 1.8s ease-in-out infinite;
}
.trend-value--up .trend-icon {
  animation-name: arrowMoveUp;
}
@keyframes arrowMove {
  0%, 100% { transform: translateY(-1px); }
  50% { transform: translateY(2px); }
}
@keyframes arrowMoveUp {
  0%, 100% { transform: translateY(1px); }
  50% { transform: translateY(-2px); }
}

/* 卡片对角微光 */
.card-corner {
  position: absolute;
  width: 8px;
  height: 8px;
  border-color: #5ff2ff;
  border-style: solid;
  opacity: 0.7;
}
.card-corner--tl {
  top: 2px;
  left: 2px;
  border-width: 1px 0 0 1px;
}
.card-corner--br {
  bottom: 2px;
  right: 2px;
  border-width: 0 1px 1px 0;
}
</style>

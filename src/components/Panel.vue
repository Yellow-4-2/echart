<template>
  <div class="panel">
    <!-- 顶部扫描线（从左到右循环移动） -->
    <div class="panel__scan"></div>
    <div class="panel__header">
      <div class="panel__title">
        <i class="panel__bar"></i>
        <span>{{ title }}</span>
      </div>
      <div class="panel__sub" v-if="sub">{{ sub }}</div>
    </div>
    <div class="panel__body" :style="{ padding: (bodyPad ?? 8) + 'px' }">
      <slot />
    </div>
    <span class="corner corner--tl"></span>
    <span class="corner corner--tr"></span>
    <span class="corner corner--bl"></span>
    <span class="corner corner--br"></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  sub?: string
  bodyPad?: number
}>()
</script>

<style scoped>
.panel {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(13, 27, 70, 0.65) 0%, rgba(8, 18, 45, 0.85) 100%);
  border: 1px solid rgba(31, 58, 122, 0.6);
  border-radius: 4px;
  box-shadow: inset 0 0 30px rgba(31, 58, 122, 0.25);
  overflow: hidden;
  transition: border-color 0.4s ease, box-shadow 0.4s ease;
}
.panel:hover {
  border-color: rgba(54, 209, 220, 0.85);
  box-shadow:
    inset 0 0 30px rgba(54, 209, 220, 0.18),
    0 0 22px rgba(54, 209, 220, 0.25);
}

/* 顶部扫描线 */
.panel__scan {
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #5ff2ff 50%, transparent 100%);
  box-shadow: 0 0 8px rgba(95, 242, 255, 0.9);
  animation: scan 5s linear infinite;
  z-index: 4;
  pointer-events: none;
}
@keyframes scan {
  0% { transform: translateX(-30%); }
  100% { transform: translateX(330%); }
}

.panel__header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: linear-gradient(90deg, rgba(54, 209, 220, 0.22) 0%, rgba(54, 209, 220, 0) 100%);
  border-bottom: 1px solid rgba(31, 58, 122, 0.6);
}
/* 标题栏下方荧光线 */
.panel__header::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 35%;
  height: 1px;
  background: linear-gradient(90deg, #5ff2ff 0%, transparent 100%);
  box-shadow: 0 0 6px rgba(95, 242, 255, 0.8);
  animation: headerGlow 4s ease-in-out infinite;
}
@keyframes headerGlow {
  0%, 100% { width: 35%; opacity: 0.8; }
  50% { width: 60%; opacity: 1; }
}

.panel__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #e6f1ff;
  letter-spacing: 0.5px;
  text-shadow: 0 0 8px rgba(95, 242, 255, 0.35);
}
.panel__bar {
  width: 3px;
  height: 14px;
  background: linear-gradient(180deg, #5ff2ff, #1a73c2);
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(95, 242, 255, 0.8);
  animation: barPulse 2.4s ease-in-out infinite;
}
@keyframes barPulse {
  0%, 100% { box-shadow: 0 0 8px rgba(95, 242, 255, 0.6); }
  50% { box-shadow: 0 0 14px rgba(95, 242, 255, 1); }
}

.panel__sub {
  font-size: 12px;
  color: #6b85b8;
}
.panel__body {
  flex: 1;
  min-height: 0;
  padding: 8px;
}

/* 四角装饰 + 呼吸动画 */
.corner {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: #5ff2ff;
  border-style: solid;
  pointer-events: none;
  z-index: 3;
  filter: drop-shadow(0 0 4px rgba(95, 242, 255, 0.8));
  animation: cornerBlink 3s ease-in-out infinite;
}
.corner--tl { top: 0; left: 0; border-width: 1px 0 0 1px; }
.corner--tr { top: 0; right: 0; border-width: 1px 1px 0 0; animation-delay: 0.75s; }
.corner--bl { bottom: 0; left: 0; border-width: 0 0 1px 1px; animation-delay: 1.5s; }
.corner--br { bottom: 0; right: 0; border-width: 0 1px 1px 0; animation-delay: 2.25s; }
@keyframes cornerBlink {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}
</style>

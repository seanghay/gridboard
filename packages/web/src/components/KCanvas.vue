<script setup lang="ts">
import { computed, onMounted, reactive, ref, unref, watch, toRefs, toRef, watchEffect } from 'vue';
import type { Ref } from 'vue'
import debounce from 'lodash/debounce';
import { createCanvas } from '../canvas';
import type { DrawState, GridBoardCanvasState } from '../types';
import { renderGrid } from '@gridboard/core';
import { drawBackgroundColor, drawImageCell } from '../canvas';
import { randomHSLColor } from '../color';

const wrapperRef: Ref<HTMLDivElement | undefined> = ref()
const canvasRef: Ref<HTMLCanvasElement | undefined> = ref();

interface KCanvasProps {
  width: number;
  height: number;
  state: GridBoardCanvasState;
}

const emits = defineEmits(['canvasReady'])
const props = defineProps<KCanvasProps>();
const stateRef = reactive(props.state);

const width = computed(() => props.width || 0);
const height = computed(() => props.height || 0);
const wrapperStyle = computed(() => ({
  width: `${props.width || 1}px`,
  height: `${props.height || 1}px`,
}));

function onDraw({ ctx, width, height }: DrawState) {
  const state = unref(stateRef)!;

  if (state.backgroundColor === '$random') {
    drawBackgroundColor(ctx, randomHSLColor());
  } else {
    drawBackgroundColor(ctx, state.backgroundColor);
  }

  
  const imageAt = (position: number) =>
    state.images[position % state.images.length]
  
  ctx.save();

  renderGrid({
    width,
    height,
    gapSize: state.gridGap,
    gapEdge: state.gridGapEdge,
    spans: state.spans,
    rowSize: state.gridRowSize,
    columnSize: state.gridColumnSize,
    render({ cellHeight, cellWidth, position, x, y }) {
      const image = imageAt(position);

      if (!image) {
        ctx.save();
        ctx.fillStyle = '#eee';
        ctx.fillRect(
          x,
          y,
          cellWidth,
          cellHeight
        );

        ctx.restore();
        return;
      };

      // draw image cell if exists
      drawImageCell(ctx, image, cellWidth, cellHeight, x, y);
    }
  });

  ctx.restore();
}

function invalidate() {
  const w = unref(width);
  if (!w) return;

  const h = unref(height);
  if (!h) return;

  const canvas = unref(canvasRef);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;
  onDraw({ ctx, width: w, height: h });
}

function configureCanvas() {
  const w = unref(width)!;
  const h = unref(height)!;
  const canvas = createCanvas(w, h);
  const wrapper = unref(wrapperRef)!;
  wrapper.innerHTML = '';
  wrapper.appendChild(canvas);
  canvasRef.value = canvas;
  emits('canvasReady', canvas);
  invalidate();
}


const updateCanvasSize = debounce(configureCanvas, 300);
watch([width, height], () => updateCanvasSize());
watch(stateRef, () => invalidate())

onMounted(() => {
  configureCanvas();
})
</script>

<template>
  <div class="canvas shadow" ref="wrapperRef" :style="wrapperStyle"></div>
</template>

<style>
.canvas {
  transition: 0.1s ease;
  overflow: hidden;
}
</style>
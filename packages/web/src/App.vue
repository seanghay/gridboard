<script setup lang="ts">
import { reactive, Ref, ref, unref } from 'vue';
import KCanvas from "./components/KCanvas.vue";
import KSidebar from "./components/KSidebar.vue";
import { exportCanvasAsFile } from './file';
import type { GridBoardCanvasState } from './types';

const size: Ref<number[]> = ref([512, 512]);

const state = reactive<GridBoardCanvasState>({
  backgroundColor: 'white',
  gridRowSize: 2,
  gridColumnSize: 2,
  gridGap: 2,
  spans: '',
  images: [],
  gridGapEdge: false,
});

const canvasRef = ref<HTMLCanvasElement>();

function exportImage(type: 'image/png' | 'image/jpeg', quality?: number) {
  const canvas = unref(canvasRef);
  
  if (!canvas) {
    console.error('canvas is not ready');
    return;
  };
  
  console.log(quality);
  exportCanvasAsFile(canvas, { 
    type,
    quality,
  });
}

function onCanvasReady(canvas: HTMLCanvasElement) {
  canvasRef.value = canvas;
}

</script>
<template>
  <div class="flex h-screen bg-light-600">
    <k-sidebar @export-image="exportImage" v-model:size="size" v-model:state="state"></k-sidebar>
    <div class="flex-1 overflow-hidden flex justify-center items-center">
      <k-canvas @canvas-ready="onCanvasReady" :state="state" :width="size[0]" :height="size[1]"></k-canvas>
    </div>
  </div>
</template>

<style>
</style>

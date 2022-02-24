<script setup lang="ts">
import KSidebar from "./components/KSidebar.vue";
import KCanvas from "./components/KCanvas.vue";
import { reactive, computed, Ref, ref, watch } from 'vue'
import type { GridBoardCanvasState } from './types';

const size: Ref<number[]> = ref([512, 512]);

const state = reactive<GridBoardCanvasState>({
  backgroundColor: 'white',
  gridRowSize: 2,
  gridColumnSize: 2,
  gridGap: 2,
  spans: '',
  images: [],
});

</script>
<template>
  <div class="flex h-screen bg-light-600">
    <k-sidebar v-model:size="size" v-model:state="state"></k-sidebar>
    <div class="flex-1 overflow-hidden flex justify-center items-center">
      <k-canvas :state="state" :width="size[0]" :height="size[1]"></k-canvas>
    </div>
  </div>
</template>

<style>
</style>

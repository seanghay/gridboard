<script setup lang="ts">
import { rearg, size } from 'lodash';
import { ComputedRef, Ref, watchEffect } from 'vue';
import { computed, ref, unref, watch, reactive } from 'vue';
import type { VueUploadItem } from 'vue-upload-component';
import { filesToImages } from '../image';
import KUploadButton from './KUploadButton.vue';
import KButton from './KButton.vue';
import KTextField from './KTextField.vue';
import { GridBoardCanvasState } from '../types'

const props = defineProps<{ state: GridBoardCanvasState, size: number[] }>();
const emit = defineEmits(['update:state', 'update:size']);

const loading: Ref<boolean> = ref(false);
const uploadItems: Ref<VueUploadItem[]> = ref([]);

const files: ComputedRef<File[]> = computed(() =>
  unref(uploadItems)!.map(item => item.file! as File)
);

const canvasSize = reactive({ 
  width: props.size[0],
  height: props.size[1],
});

const state = reactive<GridBoardCanvasState>(props.state);

const exportSettings = reactive({
  quality: 100,
});


function importConfig() {

}

function exportConfig() {

}

function saveAsJPG() {

}

function saveAsPNG() {

}

watch(files, async () => {
  loading.value = true;

  Object.assign(state, { 
    ...state,
    images: await filesToImages(files.value)
  });
  loading.value = false;
});

watch(state, () => {
  emit('update:state', unref(state)!);
});


watch(canvasSize, () => {
  const size = unref(canvasSize)!;
  emit('update:size', [size.width, size.height]);
})

</script>

<template>
  <div class="bg-white w-96 overflow-y-scroll pb-8 m-4 border rounded">
    <h3 class="px-6 py-4 text-gray-800 text-lg mb-2 border-b bg-gray-50">Grid Board</h3>

    <div class="px-6 pt-3 flex items-center">
      <k-upload-button
        v-model="uploadItems"
        accept="image/png, image/gif, image/jpeg, image/webp"
        :multiple="true"
        extensions="gif,jpg,jpeg,png,webp"
      >
        <span v-if="loading">Loading...</span>
        <span v-else>Select files</span>
      </k-upload-button>

      <h3
        class="text-sm text-gray-600 mx-3"
        v-if="state.images.length"
      >You've selected {{ state.images.length }} file(s)</h3>

    </div>
    <h1 class="px-6 mt-4 text-sm text-gray-700">Configuration / Settings</h1>
    <div class="flex gap-3 px-6 pt-4">
      <k-button @click="importConfig()" class="flex-1">Import JSON</k-button>
      <k-button @click="exportConfig()" class="flex-1">Export JSON</k-button>
    </div>
    <h1 class="px-6 mt-4 text-sm text-gray-700">Canvas Size </h1>
    <div class="flex gap-4 px-6 pt-2">
      <k-text-field type="number" v-model="canvasSize.width" placeholder="Width(px)"></k-text-field>
      <k-text-field type="number" v-model="canvasSize.height" placeholder="Height(px)"></k-text-field>
    </div>
    <h1 class="px-6 mt-4 text-sm text-gray-700">Background Color</h1>
    <div class="flex gap-4 px-6 pt-2">
      <k-text-field v-model="state.backgroundColor" class="flex-1" type="text" placeholder="Color"></k-text-field>
    </div>
    <h1 class="px-6 mt-4 text-sm text-gray-700">Grid Size (Column, Row)</h1>
    <div class="flex gap-4 px-6 pt-2">
      <k-text-field
        v-model="state.gridColumnSize"
        class="flex-1"
        type="number"
        placeholder="Grid Column Size"
      ></k-text-field>
      <k-text-field
        v-model="state.gridRowSize"
        class="flex-1"
        type="number"
        placeholder="Grid Row Size"
      ></k-text-field>
    </div>
    <h1 class="px-6 mt-4 text-sm text-gray-700">Grid Gap</h1>
    <div class="flex gap-4 px-6 pt-2">
      <k-text-field
        v-model="state.gridGap"
        class="flex-1"
        type="number"
        placeholder="Grid Gap"
      ></k-text-field>
    </div>
    <h1 class="px-6 mt-4 text-sm text-gray-700">Grid Spans</h1>
    <div class="flex gap-4 px-6 pt-2">
      <k-text-field
        v-model="state.spans"
        class="flex-1"
        type="string"
        placeholder="Grid Spans"
      ></k-text-field>
    </div>
    <h1 class="px-6 mt-4 text-sm text-gray-700">Image Exports</h1>
    <div class="flex gap-3 px-6 pt-4">
      <k-text-field
        class="flex-auto"
        type="number"
        v-model="exportSettings.quality"
        placeholder="Quality"
      ></k-text-field>
      <k-button @click="saveAsJPG()" class="flex-auto">Save as JPG</k-button>
    </div>
    <div class="flex gap-3 px-6 pt-4">
      <k-button @click="saveAsPNG()" class="flex-auto">Save as PNG (uncompressed)</k-button>
    </div>
  </div>
</template>
<style>
</style>
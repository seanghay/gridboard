<script setup lang="ts">
import KButton from './KButton.vue';
import { ref } from 'vue'
import { extractFilesFromInputElement } from '../file';

interface KUploadButtonProps {
  modelValue: File[];
  accept: string;
  multiple: boolean;
}

const props = defineProps<KUploadButtonProps>()
const emit = defineEmits(['update:modelValue']);
const filesRef = ref<File[]>(props.modelValue);
const fileRef = ref();

function fileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const files = extractFilesFromInputElement(target);
  filesRef.value = files;
  emit('update:modelValue', files);
}
</script>

<template>
  <input 
  :multiple="props.multiple" 
  :accept="props.accept" @change="fileChange" ref="fileRef" type="file" hidden />
  <k-button v-bind="$attrs" @click="fileRef.value = null; fileRef.click();">
    <slot></slot>
  </k-button>
</template>

<script setup lang="ts">
import FileUpload, { VueUploadItem } from 'vue-upload-component'

interface KUploadButtonProps {
  modelValue: VueUploadItem[];
}

const props = defineProps<KUploadButtonProps>()
defineEmits(['update:modelValue']);
</script>


<template>
  <file-upload 
    class="rounded-sm bg-white text-gray-700 text-sm border px-4 py-1 hover:bg-gray-100 active:bg-gray-200 transition"    
    v-bind="$attrs"
    :model-value="props.modelValue"
    @update:model-value="$emit('update:modelValue', $event)"    
  >
  <slot></slot>
  </file-upload>  
</template>

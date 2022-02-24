<script setup lang="ts">
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
});
const emit = defineEmits(["update:modelValue"]);
const val = computed(() => props.modelValue);
const handleInput = (e: Event) => {
  const el = e.target as HTMLInputElement;
  
  if (el.type === 'number') {
    emit("update:modelValue", parseInt(el.value) || 0);
    return;
  }
  emit("update:modelValue", el.value);
};
</script>

<template>
  <input
    v-bind="$attrs"
    @input="handleInput"
    :value='val'
    class="bg-gray-50 border px-2 py-1 rounded-sm text-sm min-w-0"
  />
</template>
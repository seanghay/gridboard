<script setup lang="ts">
const props = defineProps({
  modelValue: Boolean,
});

const emits = defineEmits(['update:modelValue']);

function change(e: Event) {
  const element = e.currentTarget! as HTMLInputElement;
  emits('update:modelValue', element.checked);
}

</script>

<template>
  <label class="text-sm inline-flex text-gray-700 items-center">
    <input
      class="mr-2"
      :checked="props.modelValue"
      type="checkbox"
      name="checkbox"
      @change="change"
    />
    <slot></slot>
  </label>
</template> 

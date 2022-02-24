<script lang="ts" setup>
import KTextField from "./components/KTextField.vue";
import KButton from "./components/KButton.vue";
import debounce from "lodash/debounce";
import {
  computed,
  ref,
  onMounted,
  onBeforeUnmount,
  unref,
  watch,
  reactive,
} from "vue";
import type { Ref, ComputedRef } from "vue";
</script>

<template>
  <k-text-field class="m-4" placeholder="Grid"></k-text-field>
</template>


<style>
.canvas {
  transition: 0.1s ease;
  overflow: hidden;
}
</style>
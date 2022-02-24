<template>
  <button
    v-bind="$attrs"
    class="rounded-sm bg-white text-gray-700 text-sm border px-4 py-1 hover:bg-gray-100 active:bg-gray-200 transition"
  >
    <slot></slot>
  </button>
</template>
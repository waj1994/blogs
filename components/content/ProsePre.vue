<!-- 重写代码块 -->
<script setup lang="ts">
const props = defineProps<{
  filename?: string
  language?: string
  code: string
}>()

const registryTabs = inject('registryCodeTabs', (tab: string) => { })
const activeTab = inject('activeCodeTab', ref(props.filename))

onMounted(() => {
  props.filename && registryTabs?.(props.filename)
})

const isActive = computed(() => {
  return activeTab && activeTab.value === props.filename
})
</script>

<template>
  <pre v-if="isActive" class="relative block">
    <slot />
    <div class="transition-all duration-300 absolute right-6 top-6 w-7 h-7 rounded-md hover:bg-gray-700 cursor-pointer flex justify-center items-center">
      <span 
        class="copy-icon w-4 h-4"
      />
    </div>
  </pre>
</template>

<style lang="less" scoped>
.copy-icon {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' %3E%3Cpath d=' M28 10v18H10V10h18m0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z' fill=' currentColor' %3E%3C/path%3E%3Cpath d=' M4 18H2V4a2 2 0 0 1 2-2h14v2H4z' fill='currentColor' %3E%3C/path%3E%3C/svg%3E");
  mask: var(--icon) no-repeat;
  mask-size: 100% 100%;
  @apply !bg-gray-400;
}
</style>
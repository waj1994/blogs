<!-- 代码分组 -->

<script setup lang="ts">
const tabs = ref<string[]>([])
const active = ref<string | undefined>(undefined)

provide('registryCodeTabs', (tab: string) => {
  tabs.value.push(tab)
  active.value = tabs.value[0]
})
provide('activeCodeTab', active)
</script>

<template>
  <div>
    <div>
      <button v-for="(tab, i) in tabs" :key="i" @click="active = tab">{{ tab }}</button>
    </div>
    <slot />
  </div>
</template>

<style lang="less" scoped></style>
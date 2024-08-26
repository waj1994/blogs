<!-- 移动端菜单 -->
<script
  setup
  lang="ts"
>
const showMenu = useShowMenu()

watch(showMenu, (show) => {
  document.documentElement.style.setProperty('overflow-y', show ? 'hidden' : 'auto')
})

watch(() => useRoute().path, () => showMenu.value = false)
</script>

<template>
  <div
    v-if="showMenu"
    class="fixed z-[100] inset-0 top-[var(--header-height)] right-0 bottom-0 left-0 bg-white dark:bg-gray-950"
  >
    <div class="overflow-y-auto overflow-x-hidden px-4 py-8">
      <Nav />
    </div>
  </div>
</template>

<style
  lang="less"
  scoped
></style>

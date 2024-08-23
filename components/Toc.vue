<!-- 目录 -->
<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  depth: number
  children?: TocItem[]
}
interface Toc {
  links: TocItem[]
}
const { toc } = useContent() as {
  toc: Ref<Toc>
}

onMounted(() => {
  if (!toc.value.links.length) {
    return
  }
  const targets = toc.value.links.map(item => document.getElementById(item.id))
  console.log(targets)
})
</script>

<template>
  <nav v-if="toc.links.length">
    <div
      class="py-3 lg:py-8 border-b border-dashed border-gray-200 dark:border-gray-800 lg:border-0 space-y-3"
    >
      <button
        class="flex items-center gap-1.5 lg:cursor-text lg:select-text w-full group"
        tabindex="-1"
      >
        <span class="font-semibold text-sm/6 truncate">页面导航</span>
        <span
          class="i-ph-caret-down lg:!hidden ms-auto transform transition-transform duration-200 flex-shrink-0 mr-1.5 w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 -rotate-90"
        />
      </button>

      <ul class="mt-1 hidden lg:block">
        <li
          v-for="item in toc.links"
          :key="item.id"
        >
          <NuxtLink
            class="toc-item"
            :to="'#' + item.id"
          >{{ item.text }}</NuxtLink>
          <ul
            v-if="item?.children"
            class="mt-1"
          >
            <li
              v-for="el in item.children"
              :key="el.id"
              class="ml-3 mt-1"
            >
              <NuxtLink
                class="toc-item"
                :to="'#' + el.id"
              >{{ el.text }}</NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="less" scoped>
.toc-item {
  @apply block text-sm/6 truncate text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200;
}
</style>

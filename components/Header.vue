<!-- 头部 -->
<script setup lang="ts">
const menu = useMenu()
</script>

<template>
  <header
    class="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 lg:mb-0 lg:border-0 mr-[calc(100vw-100%)]"
  >
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[var(--header-height)]"
    >
      <div class="flex flex-1 items-center gap-x-20">
        <NuxtLink
          to="/"
          class="flex items-center gap-x-[10px]"
          active-class="text-black dark:text-white"
        >
          <Icon
            name="icon:logo"
            class="text-green-500 text-3xl"
          />
          <span class="text-8 font-bold">WAJ</span>
        </NuxtLink>
      </div>
      <ul
        class="flex justify-center gap-x-8 text-sm font-semibold"
      >
        <NuxtLink
          v-for="item in menu"
          :key="item._path"
          :to="item._path"
        >{{ item.title }}</NuxtLink>
      </ul>
      <div class="flex flex-1 justify-end items-center gap-x-4">
        <div id="search-container" />
        <a
          href="https://github.com/waj1994/blogs"
          target="_blank"
          class="flex items-center"
        >
          <Icon
            name="icon:github"
            class="text-2xl"
          />
        </a>
        <a
          href="mailto:waj2024@126.com"
          class="flex items-center"
        >
          <Icon
            name="icon:email"
            class="text-2xl"
          />
        </a>
        <ThemeToggle />
        <!-- <a
          href="javascript:void(0)"
          class="lg:hidden flex items-center"
        >
          <Icon
            :name="!showNav ? 'icon:menu' : 'icon:close'"
            class="text-2xl"
            @click="showNav = !showNav"
          />
        </a> -->
      </div>
    </div>
  </header>
</template>

<style lang="less" scoped>
.router-link-active {
  @apply text-primary;
}
</style>

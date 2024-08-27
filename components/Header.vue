<!-- 头部 -->
<script
  setup
  lang="ts"
>
const showMenu = useShowMenu()
</script>

<template>
  <header
    class="bg-white/75 dark:bg-gray-950/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 lg:mb-0 lg:border-0 mr-[calc(100vw-100%)]"
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
        <a
          href="javascript:void(0)"
          class="lg:hidden flex items-center"
          @click="showMenu = !showMenu"
        >
          <Icon
            v-show="!showMenu"
            name="icon:menu"
            class="text-2xl"
          />
          <Icon
            v-show="showMenu"
            name="icon:close"
            class="text-2xl dark:text-white"
          />
        </a>
      </div>
    </div>
  </header>
</template>

<style
  lang="less"
  scoped
>
.router-link-active {
  @apply text-primary;
}
</style>

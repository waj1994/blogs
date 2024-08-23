<!-- 左侧菜单 -->
<script setup lang="ts">
const menu = useMenu().value?.find(item => item._path === '/blog')?.children
</script>

<template>
  <aside
    class="hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--header-height))] lg:sticky lg:top-[var(--header-height)] py-8 lg:px-4 lg:-mx-4"
  >
    <div class="relative">
      <div
        v-for="item in menu"
        :key="item._path"
        class="py-8 first:pt-0 border-b last:border-0 border-gray-200 dark:border-gray-800"
      >
        <p class="text-sm/6 truncate">
          {{ item.title }}
        </p>
        <ul>
          <li
            v-for="el in item.children"
            :key="el._path"
            class="mt-[0.375rem]"
          >
            <NuxtLink
              class="text-gray-500 dark:text-gray-300 flex items-center gap-1.5 group text-sm/6 truncate"
              exact-active-class="text-primary"
              :to="el._path"
            >
              {{ el.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style lang="less" scoped></style>

<!-- 导航 -->
<script
  setup
  lang="ts"
>
const { navDirFromPath } = useContentHelpers()
const { navigation } = useContent()
const route = useRoute()

const path = computed(() => route.path)

const tree = computed(() => {
  const route = useRoute()
  const path = route.path.split('/')
  const leveledPath = path.splice(0, 2).join('/')
  const dir = navDirFromPath(leveledPath, navigation.value)
  return dir ?? []
})
</script>

<template>
  <div class="relative">
    <div class="mb-3 lg:mb-6 -mx-1 lg:mx-0">
      <NuxtLink
        v-for="item in navigation"
        :key="item._path"
        class="my-2.5 first:mt-0 text-gray-500 dark:text-gray-300 flex items-center gap-1.5 group text-sm/6 truncate"
        :class="[path.startsWith(item._path) && 'font-semibold !text-primary']"
        :to="item._path"
      >
        {{ item.title }}
      </NuxtLink>
    </div>
    <div class="flex items-center align-center text-center w-full flex-row mb-6">
      <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-dashed" />
    </div>
    <div
      v-for="item in tree"
      :key="item._path"
      class="w-full flex flex-col my-2.5"
    >
      <div class="flex items-center gap-1.5 text-sm/6 font-semibold">
        <span
          class="truncate"
          :title="item.title"
        >
          {{ item.title }}
        </span>
        <Icon
          name="icon:arrow-down"
          class="ms-auto flex-shrink-0 mr-1.5 w-5 h-5 text-gray-700 dark:text-gray-200"
        />
      </div>
      <ul class="border-s border-gray-200 dark:border-gray-800 my-2.5 text-sm ml-2.5">
        <li
          v-for="el in item.children"
          :key="el._path"
          class="group block border-s -ms-px leading-6 before:hidden mt-1.5 pl-4 relative"
        >
          <NuxtLink
            :to="el._path"
            class="truncate text-gray-700 group-hover:text-gray-900 dark:text-gray-400 group-dark:hover:text-gray-300 before:w-0 before:h-full before:bg-gray-400 before:absolute before:top-0 before:-left-px group-hover:before:w-px"
            active-class="!text-primary font-semibold"
          >
            {{ el.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style
  lang="less"
  scoped
>
.router-link-exact-active {
  &::before {
    @apply w-px bg-primary;
  }
}
</style>

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
    <ul class="mb-3 lg:mb-6 -mx-1 lg:mx-0">
      <NuxtLink
        v-for="item in navigation"
        :key="item._path"
        class="my-2.5 first:mt-0 text-gray-500 dark:text-gray-300 flex items-center gap-1.5 group text-sm/6 truncate"
        :class="[path.startsWith(item._path) && 'font-semibold !text-primary']"
        :to="item._path"
      >
        {{ item.title }}
      </NuxtLink>
    </ul>
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
      <UVerticalNavigation
        :links="item.children?.map(item => ({
          to: item._path,
          label: item.title,
        }))"
        :ui="{
          wrapper: 'border-s border-gray-200 dark:border-gray-800 my-2.5 text-sm ml-2.5',
          base: 'group block border-s -ms-px leading-6 before:hidden text-left outline-none mt-1.5',
          padding: 'p-0 ps-4',
          rounded: '',
          font: '',
          ring: '',
          active: 'text-primary-500 dark:text-primary-400 border-current font-semibold',
          inactive: 'border-transparent hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300',
        }"
      />
    </div>
  </div>
</template>

<style
  lang="less"
  scoped
></style>

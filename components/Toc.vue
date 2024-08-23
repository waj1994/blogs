<!-- 目录 -->
<script setup lang="ts">
import { debounce } from 'lodash-es'

interface TocItem {
  id: string
  text: string
  depth: number
  children?: TocItem[]
}
interface Toc {
  links: TocItem[]
}

interface ElementType extends Omit<TocItem, 'children'> {
  el: HTMLElement
  y: number
}

const { toc } = useContent() as {
  toc: Ref<Toc>
}

function fall(arr: TocItem[]) {
  if (!arr.length) {
    return []
  }
  const res: TocItem[] = []
  arr.forEach((element) => {
    const { children, ...obj } = element
    const child = fall(children || [])
    res.push(obj, ...child)
  })
  return res
}

/**
 * 目录列表
 */
const tocList = fall(toc.value.links)
/**
 * 锚点元素
 */
const elements = ref<ElementType[]>([])
/**
 * 当前激活的锚点id
 */
const active = ref('')

/**
 * 滚动函数
 */
const handleScroll = debounce(() => {
  const { scrollTop } = document.documentElement
  const current = elements.value.find(item => item.y >= scrollTop)
  active.value = current?.id || ''
}, 100)

onMounted(() => {
  if (!toc.value.links.length) {
    return
  }
  const { scrollTop } = document.documentElement
  tocList.forEach((el) => {
    const target = document.getElementById(el.id)!
    /**
     * 创建一个空标签  并偏移位置  使得锚点跳转到想要的位置  不然是跳转到顶部被遮挡
     */
    const anchor = document.createElement('span')
    anchor.setAttribute('id', `${el.id}-anchor`)
    anchor.setAttribute('class', `anchor`)
    target.appendChild(anchor)
    elements.value.push({
      el: target,
      ...el,
      y: target.getBoundingClientRect().y + scrollTop,
    })
  })
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const router = useRouter()

/**
 * 点击目录
 */
const handleClick = (item: TocItem, event: Event) => {
  event.preventDefault()
  router.push({ hash: `#${item.id}-anchor` })
  active.value = item.id
}
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
          v-for="item in tocList"
          :key="item.id"
        >
          <a
            class="toc-item mt-1 first:mt-0 cursor-pointer"
            :class="{ 'active': active === item.id, 'ml-3': item.depth > 2 }"
            @click="handleClick(item, $event)"
          >
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="less" scoped>
.toc-item {
  @apply block text-sm/6 truncate text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200;

  &.active {
    @apply text-primary;
  }
}
</style>

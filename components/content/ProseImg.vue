<!-- 重写markdown中的img组件 -->
<script
  setup
  lang="ts"
>
withDefaults(defineProps<{
  src: string
  alt?: string
  width?: number | string
  height?: number | string
}>(), {
  src: '',
  width: '100%',
  height: 'auto',
})
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    format="webp"
    class="rounded-md [&:not(:first-child)]:mt-8 [&:not(:last-child)]:mb-8 mx-auto"
  />
</template>

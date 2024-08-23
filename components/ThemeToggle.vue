<!-- 主题切换 -->
<script setup lang="ts">
type ThemeMode = 'light' | 'dark'
const theme = ref<ThemeMode>('light')
const mediaQueryList = ref<MediaQueryList | null>(null)

const mediaChange = (evt: MediaQueryListEvent) => {
  // evt.matches - true: dark, false: light
  handleChange(evt.matches ? 'light' : 'dark')
}
onMounted(() => {
  const mode = document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light'
  theme.value = mode

  mediaQueryList.value = matchMedia('(prefers-color-scheme: dark)')
  mediaQueryList.value.addEventListener('change', mediaChange)
})
onUnmounted(() => {
  mediaQueryList.value?.removeEventListener('change', mediaChange)
})

const handleChange = (value: ThemeMode) => {
  const inverseMode = value === 'light' ? 'dark' : 'light'
  document.documentElement.classList.add(inverseMode)
  document.documentElement.classList.remove(value)
  document.documentElement.setAttribute('data-theme', inverseMode)
  theme.value = inverseMode
  localStorage.setItem('nuxt-color-mode', inverseMode)
}
</script>

<template>
  <div>
    <button
      type="button"
      class="theme-toggle relative rounded-[11px] block w-[40px] h-[22px] border-[1px] border-[#c2c2c4] dark:border-[#3c3f44] bg-[#8e96aa24] dark:bg-[#65758529]"
      @click="handleChange(theme)"
    >
      <span
        class="absolute w-[18px] h-[18px] top-[1px] left-[1px] rounded-full bg-white dark:bg-black shadow-[var(--shadow)] dark:translate-x-[18px]"
      >
        <span
          class="relative block w-[18px] h-[18px] overflow-hidden rounded-full"
        >
          <span
            class="sun icon"
            :class="{ 'active-sun': theme === 'light' }"
          />
          <span
            class="moon icon"
            :class="{ 'active-moon': theme === 'dark' }"
          />
        </span>
      </span>
    </button>
  </div>
</template>

<style scoped>
.theme-toggle {
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.theme-toggle span {
  @apply transition duration-300 ease-in-out;
}

.sun {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Cpath d='M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41'/%3E%3C/svg%3E");
}

.moon {
  --icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'/%3E%3C/svg%3E");
}

.icon {
  mask: var(--icon) no-repeat;
  mask-size: 100% 100%;
  background-color: currentColor;
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  color: #3c3c43c7;
  opacity: 0;
}

.active-sun {
  opacity: 1;
}

.active-moon {
  opacity: 1;
  color: #fffff5db;
}
</style>

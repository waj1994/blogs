import type { NavItem } from '@nuxt/content'

export const useMenu = () => useState<NavItem[] | null>('menu', () => [])

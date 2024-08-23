import type { RouterConfig } from '@nuxt/schema'

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (_routes) => {
    return [
      {
        path: '/',
        redirect: '/blog',
        children: [
          {
            path: 'blog',
            children: [
              {
                path: '',
                redirect: '/blog/js/gc',
              },
              {
                path: ':group/:id',
                name: 'detail',
                component: () =>
                  import('~/pages/detail.vue').then(r => r.default || r),
              },
            ],
          },
          {
            name: 'about',
            path: 'about',
            component: () =>
              import('~/pages/about.vue').then(r => r.default || r),
          },
        ],
      },
    ]
  },
} satisfies RouterConfig
